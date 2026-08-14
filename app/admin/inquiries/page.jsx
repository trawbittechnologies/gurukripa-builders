"use client";

import { useState, useEffect } from "react";
import {
  MessageSquareText,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trash2,
  CheckCircle,
  Clock,
  MessageCircle,
  Loader2,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await fetchInquiries(); })();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--admin-text)" }}>
            Client Leads & Inquiries Inbox
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            Review, track, and directly connect with customers looking for construction services
          </p>
        </div>

        <button onClick={fetchInquiries} className="admin-btn admin-btn-secondary">
          Refresh Inbox
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--admin-border)",
          borderRadius: "14px",
          padding: "16px 20px",
          marginBottom: "28px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
          boxShadow: "var(--admin-shadow-sm)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["all", "New", "In Progress", "Contacted", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border:
                  statusFilter === st
                    ? "1px solid var(--admin-primary)"
                    : "1px solid var(--admin-border)",
                background:
                  statusFilter === st ? "rgba(254, 34, 1, 0.08)" : "transparent",
                color: statusFilter === st ? "var(--admin-primary)" : "var(--admin-text-secondary)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ position: "relative", minWidth: "260px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--admin-text-muted)",
            }}
          />
          <input
            type="text"
            placeholder="Search by client, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
            style={{ paddingLeft: "36px", padding: "8px 12px 8px 36px", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      {/* Inquiries Grid */}
      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "var(--admin-text-muted)" }}>
          <Loader2 className="spin" size={28} style={{ margin: "0 auto 12px auto" }} />
          Loading leads...
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "60px" }}>
          <MessageSquareText size={36} style={{ color: "var(--admin-text-muted)", margin: "0 auto 16px auto" }} />
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--admin-text)", marginBottom: "6px" }}>
            No Inquiries Found
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            New submissions from the public website consultation form will appear here in real-time.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
          {filtered.map((inq) => {
            const phoneClean = inq.phone.replace(/[^0-9]/g, "");
            const isNew = inq.status === "New";
            const isProgress = inq.status === "In Progress";

            return (
              <div
                key={inq.id}
                className="admin-card"
                style={{
                  borderLeft: isNew
                    ? "4px solid var(--admin-primary)"
                    : isProgress
                    ? "4px solid #D97706"
                    : "1px solid var(--admin-border)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)", marginBottom: "4px" }}>
                      {inq.name}
                    </h3>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.78rem", color: "var(--admin-text-secondary)" }}>
                      <Calendar size={13} />
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className="admin-select"
                    style={{
                      padding: "4px 8px",
                      fontSize: "0.78rem",
                      width: "auto",
                      background: isNew
                        ? "rgba(254, 34, 1, 0.08)"
                        : isProgress
                        ? "#FEF3C7"
                        : "#F1F5F9",
                      color: isNew ? "#D81E00" : isProgress ? "#B45309" : "var(--admin-text)",
                      borderColor: isNew ? "rgba(254, 34, 1, 0.3)" : isProgress ? "#FDE68A" : "var(--admin-border)",
                      fontWeight: 600,
                    }}
                  >
                    <option value="New">New Lead</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Details Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    background: "#F8FAFC",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--admin-border)",
                    marginBottom: "16px",
                    fontSize: "0.82rem",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--admin-text-muted)", display: "block", fontSize: "0.75rem" }}>Phone</span>
                    <a href={`tel:${phoneClean}`} style={{ color: "var(--admin-primary)", fontWeight: 600 }}>
                      {inq.phone}
                    </a>
                  </div>
                  <div>
                    <span style={{ color: "var(--admin-text-muted)", display: "block", fontSize: "0.75rem" }}>Email</span>
                    <a href={`mailto:${inq.email}`} style={{ color: "var(--admin-text)" }}>
                      {inq.email || "—"}
                    </a>
                  </div>
                  <div>
                    <span style={{ color: "var(--admin-text-muted)", display: "block", fontSize: "0.75rem" }}>Service</span>
                    <span style={{ fontWeight: 600, color: "var(--admin-text)" }}>{inq.service || "General"}</span>
                  </div>
                  <div>
                    <span style={{ color: "var(--admin-text-muted)", display: "block", fontSize: "0.75rem" }}>Location</span>
                    <span style={{ color: "var(--admin-text)" }}>{inq.location || "Kerala"}</span>
                  </div>
                  {inq.budget && (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <span style={{ color: "var(--admin-text-muted)", display: "block", fontSize: "0.75rem" }}>Estimated Budget</span>
                      <span style={{ color: "var(--admin-primary)", fontWeight: 700 }}>{inq.budget}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                {inq.message && (
                  <div
                    style={{
                      background: "#F1F5F9",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      color: "var(--admin-text)",
                      lineHeight: "1.5",
                      marginBottom: "16px",
                      borderLeft: "3px solid var(--admin-primary)",
                    }}
                  >
                    {'"'}{inq.message}{'"'}
                  </div>
                )}

                {/* Admin Internal Notes */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "0.76rem", color: "var(--admin-text-muted)", display: "block", marginBottom: "4px" }}>
                    Internal Engineering Notes:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add follow-up notes, site visit schedule..."
                    defaultValue={inq.notes || ""}
                    onBlur={(e) => {
                      fetch("/api/inquiries", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: inq.id, notes: e.target.value }),
                      });
                    }}
                    className="admin-textarea"
                    style={{ fontSize: "0.8rem", padding: "8px 10px" }}
                  />
                </div>

                {/* Direct Action Bar */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <a
                    href={`https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(
                      inq.name
                    )}%2C%20this%20is%20Gurukripa%20Builders%20following%20up%20on%20your%20inquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "#25D366",
                      color: "#fff",
                      fontSize: "0.8rem",
                      padding: "8px 12px",
                    }}
                  >
                    <MessageCircle size={15} /> WhatsApp Reply
                  </a>

                  <a
                    href={`tel:${phoneClean}`}
                    className="admin-btn admin-btn-secondary"
                    style={{ padding: "8px 14px", fontSize: "0.8rem" }}
                  >
                    <Phone size={15} /> Call
                  </a>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "8px 12px" }}
                    title="Delete inquiry"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
