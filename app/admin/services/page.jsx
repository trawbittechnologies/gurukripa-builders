"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
  ClipboardList,
  Ruler,
  Hammer,
  Home,
  Trees,
  Sparkles,
  HardHat,
} from "lucide-react";

export default function AdminServicesPage() {
  const { data, setData } = useData();
  const services = data?.services || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    slug: "",
    desc: "",
    icon: "Hammer",
    featured: true,
    bulletsText: "",
  });

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case "ClipboardList":
        return <ClipboardList size={22} />;
      case "Ruler":
        return <Ruler size={22} />;
      case "Hammer":
        return <Hammer size={22} />;
      case "Home":
        return <Home size={22} />;
      case "Trees":
        return <Trees size={22} />;
      case "Sparkles":
        return <Sparkles size={22} />;
      default:
        return <HardHat size={22} />;
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      id: `srv-${Date.now()}`,
      title: "",
      slug: "",
      desc: "",
      icon: "Hammer",
      featured: true,
      bulletsText: "Premium Materials\nPrecision Engineering\nOn-time Delivery",
    });
    setModalOpen(true);
  };

  const openEditModal = (srv) => {
    setEditingService(srv);
    setFormData({
      ...srv,
      bulletsText: Array.isArray(srv.bullets) ? srv.bullets.join("\n") : "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) {
      alert("Please provide at least a service title and description");
      return;
    }

    setSaving(true);

    const bulletsArray = formData.bulletsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    const srvObject = {
      id: formData.id,
      title: formData.title,
      slug:
        formData.slug ||
        formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      desc: formData.desc,
      icon: formData.icon,
      featured: formData.featured,
      bullets: bulletsArray,
    };

    let updatedServices = [...services];
    if (editingService) {
      updatedServices = updatedServices.map((s) =>
        s.id === formData.id ? srvObject : s
      );
    } else {
      updatedServices.push(srvObject);
    }

    const updatedData = { ...data, services: updatedServices };

    try {
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
        setModalOpen(false);
      } else {
        alert("Failed to save service");
      }
    } catch (err) {
      alert("Error saving service: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const updatedServices = services.filter((s) => s.id !== id);
    const updatedData = { ...data, services: updatedServices };

    try {
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
      }
    } catch (err) {
      alert("Error deleting service: " + err.message);
    }
  };

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
            Construction Services & Expertise
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            Manage the service offerings and technical specialties displayed across the site
          </p>
        </div>

        <button onClick={openAddModal} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      {/* Services Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {services.map((srv, index) => (
          <div
            key={srv.id || index}
            className="admin-card"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div className="admin-stat-icon">{getServiceIcon(srv.icon)}</div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--admin-primary)",
                    background: "rgba(254, 34, 1, 0.08)",
                    padding: "4px 10px",
                    borderRadius: "12px",
                  }}
                >
                  #{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)", marginBottom: "8px" }}>
                {srv.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
                {srv.desc}
              </p>

              {srv.bullets && srv.bullets.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                  {srv.bullets.map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "0.74rem",
                        padding: "4px 10px",
                        background: "#F8FAFC",
                        borderRadius: "8px",
                        color: "var(--admin-text)",
                        border: "1px solid var(--admin-border)",
                        fontWeight: 500,
                      }}
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", borderTop: "1px solid var(--admin-border)", paddingTop: "16px" }}>
              <button
                onClick={() => openEditModal(srv)}
                className="admin-btn admin-btn-secondary"
                style={{ flex: 1, justifyContent: "center", fontSize: "0.82rem" }}
              >
                <Edit2 size={14} /> Edit Service
              </button>
              <button
                onClick={() => handleDelete(srv.id)}
                className="admin-btn admin-btn-danger"
                style={{ padding: "8px 12px" }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--admin-text)" }}>
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--admin-text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="admin-label">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PLANNING & ESTIMATION"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="admin-select"
                >
                  <option value="ClipboardList">ClipboardList (Planning)</option>
                  <option value="Ruler">Ruler (Supervision)</option>
                  <option value="Hammer">Hammer (Construction)</option>
                  <option value="Home">Home (Interior Design)</option>
                  <option value="Trees">Trees (Landscaping)</option>
                  <option value="Sparkles">Sparkles (Luxury Finishing)</option>
                  <option value="HardHat">HardHat (Engineering)</option>
                </select>
              </div>

              <div>
                <label className="admin-label">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of what this service delivers..."
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div>
                <label className="admin-label">Key Highlights / Features (1 per line)</label>
                <textarea
                  rows={4}
                  placeholder="3D BIM Modeling&#10;Quantity Surveying&#10;Material Cost Breakdown"
                  value={formData.bulletsText}
                  onChange={(e) => setFormData({ ...formData, bulletsText: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? <Loader2 className="spin" size={16} /> : <Check size={16} />}
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
