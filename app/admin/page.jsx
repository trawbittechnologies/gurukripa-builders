"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Wrench,
  MessageSquareText,
  Star,
  Plus,
  ArrowUpRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useData } from "@/context/DataContext";

export default function AdminDashboardPage() {
  const { data } = useData();
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  const projectsCount = data?.projects?.length || 0;
  const servicesCount = data?.services?.length || 0;
  const testimonialsCount = data?.testimonials?.length || 0;

  useEffect(() => {
    fetch("/api/inquiries")
      .then((res) => (res.ok ? res.json() : []))
      .then((items) => {
        setInquiries(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingInquiries(false));
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFF5F2 0%, #FFFFFF 100%)",
          border: "1px solid #FED7D0",
          borderRadius: "18px",
          padding: "30px",
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "0 2px 10px rgba(254, 34, 1, 0.04)",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--admin-primary)",
              marginBottom: "6px",
              display: "block",
            }}
          >
            Live Control Room
          </span>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--admin-text)", marginBottom: "6px" }}>
            Welcome to <span style={{ color: "var(--admin-primary)" }}>Gurukripa Builders</span> CMS
          </h2>
          <p style={{ color: "var(--admin-text-secondary)", fontSize: "0.9rem", maxWidth: "600px" }}>
            Manage your projects, services, real-time client inquiries, and company settings with instant live preview.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/admin/projects" className="admin-btn admin-btn-primary">
            <Plus size={16} /> Add New Project
          </Link>
          <Link href="/admin/settings" className="admin-btn admin-btn-secondary">
            Edit Site Settings
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="admin-grid-4">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FolderKanban size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--admin-text)" }}>
              {projectsCount}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--admin-text-secondary)", fontWeight: 500 }}>
              Total Projects
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "#FEF3C7", color: "#B45309" }}>
            <MessageSquareText size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--admin-text)" }}>
              {inquiries.length}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--admin-text-secondary)", fontWeight: 500 }}>
              Total Leads ({newInquiriesCount} New)
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "#EFF6FF", color: "#2563EB" }}>
            <Wrench size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--admin-text)" }}>
              {servicesCount}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--admin-text-secondary)", fontWeight: 500 }}>
              Active Services
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "#DCFCE7", color: "#16A34A" }}>
            <Star size={22} />
          </div>
          <div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--admin-text)" }}>
              {testimonialsCount}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--admin-text-secondary)", fontWeight: 500 }}>
              Client Reviews
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="admin-card" style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)" }}>
              Recent Client Inquiries & Leads
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--admin-text-secondary)" }}>
              Direct submissions from the public website consultation form
            </p>
          </div>
          <Link href="/admin/inquiries" className="admin-btn admin-btn-secondary" style={{ fontSize: "0.82rem" }}>
            View All Inquiries <ArrowUpRight size={14} />
          </Link>
        </div>

        {loadingInquiries ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--admin-text-muted)" }}>
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--admin-text-muted)" }}>
            No inquiries received yet.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service Requested</th>
                  <th>Location & Budget</th>
                  <th>Status</th>
                  <th>Direct Contact</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => {
                  const phoneClean = inq.phone.replace(/[^0-9]/g, "");
                  const isNew = inq.status === "New";
                  const isProgress = inq.status === "In Progress";
                  return (
                    <tr key={inq.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--admin-text)" }}>{inq.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--admin-text-secondary)" }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, color: "var(--admin-text)" }}>{inq.service || "General"}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--admin-text-muted)" }}>
                          {inq.message ? `"${inq.message.substring(0, 40)}..."` : ""}
                        </div>
                      </td>
                      <td>
                        <div style={{ color: "var(--admin-text)" }}>{inq.location || "Kerala"}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--admin-primary)", fontWeight: 600 }}>
                          {inq.budget || "Not specified"}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`admin-badge ${
                            isNew
                              ? "admin-badge-new"
                              : isProgress
                              ? "admin-badge-progress"
                              : "admin-badge-completed"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <a
                            href={`https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(
                              inq.name
                            )}%2C%20thank%20you%20for%20contacting%20Gurukripa%20Builders.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn"
                            style={{
                              padding: "6px 10px",
                              backgroundColor: "#25D366",
                              color: "#fff",
                              fontSize: "0.75rem",
                            }}
                          >
                            <MessageCircle size={14} /> WhatsApp
                          </a>
                          <a
                            href={`tel:${phoneClean}`}
                            className="admin-btn admin-btn-secondary"
                            style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                          >
                            <Phone size={14} /> Call
                          </a>
                        </div>
                      </td>
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => updateStatus(inq.id, e.target.value)}
                          className="admin-select"
                          style={{ padding: "5px 8px", fontSize: "0.78rem", width: "auto" }}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launchpad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div className="admin-card">
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "10px", color: "var(--admin-text)" }}>
            🎨 Portfolio Management
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", marginBottom: "18px" }}>
            Easily upload project images, update descriptions, tags, and categorize into Residential, Commercial, or Interiors.
          </p>
          <Link href="/admin/projects" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Manage Gallery Projects
          </Link>
        </div>

        <div className="admin-card">
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "10px", color: "var(--admin-text)" }}>
            ⚙️ Company & Contact Info
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", marginBottom: "18px" }}>
            Update phone numbers, WhatsApp auto-message, office address, Google Maps link, Instagram handle, and hero headlines.
          </p>
          <Link href="/admin/settings" className="admin-btn admin-btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
            Update Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
