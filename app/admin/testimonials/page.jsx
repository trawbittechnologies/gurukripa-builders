"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import {
  Plus,
  Trash2,
  Edit2,
  Star,
  Check,
  X,
  Loader2,
} from "lucide-react";

export default function AdminTestimonialsPage() {
  const { data, setData } = useData();
  const testimonials = data?.testimonials || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "Villa Owner · Kasaragod",
    initials: "RK",
    stars: 5,
    project: "3BHK Villa",
    text: "",
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      id: `test-${Date.now()}`,
      name: "",
      role: "Homeowner · Kerala",
      initials: "",
      stars: 5,
      project: "Residential Home",
      text: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      alert("Please provide the client name and testimonial text");
      return;
    }

    setSaving(true);

    const initials =
      formData.initials ||
      formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);

    const testObject = {
      ...formData,
      initials,
      stars: Number(formData.stars) || 5,
    };

    let updatedList = [...testimonials];
    if (editingItem) {
      updatedList = updatedList.map((t) =>
        t.id === formData.id ? testObject : t
      );
    } else {
      updatedList.unshift(testObject);
    }

    const updatedData = { ...data, testimonials: updatedList };

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
        alert("Failed to save testimonial");
      }
    } catch (err) {
      alert("Error saving testimonial: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const updatedList = testimonials.filter((t) => t.id !== id);
    const updatedData = { ...data, testimonials: updatedList };

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
      alert("Error deleting testimonial: " + err.message);
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
            Client Reviews & Testimonials
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            Showcase authentic client feedback and star endorsements
          </p>
        </div>

        <button onClick={openAddModal} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add Review
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {testimonials.map((t, idx) => (
          <div
            key={t.id || idx}
            className="admin-card"
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px",
                }}
              >
                <div style={{ display: "flex", color: "#EAB308", gap: "2px" }}>
                  {Array.from({ length: t.stars || 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--admin-primary)",
                    background: "rgba(254, 34, 1, 0.08)",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontWeight: 600,
                  }}
                >
                  {t.project || "Project"}
                </span>
              </div>

              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--admin-text)",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                {'"'}{t.text}{'"'}
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderTop: "1px solid var(--admin-border)",
                  paddingTop: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #FE2201 0%, #D81E00 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                  }}
                >
                  {t.initials || t.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--admin-text)", fontSize: "0.92rem" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--admin-text-secondary)" }}>
                    {t.role}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => openEditModal(t)}
                  className="admin-btn admin-btn-secondary"
                  style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "8px" }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "8px 12px" }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
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
                {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="admin-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Role / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Villa Owner · Kasaragod"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="admin-label">Project Type</label>
                  <input
                    type="text"
                    placeholder="e.g. 3BHK Luxury Villa"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Rating (Stars)</label>
                  <select
                    value={formData.stars}
                    onChange={(e) => setFormData({ ...formData, stars: Number(e.target.value) })}
                    className="admin-select"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Testimonial Review *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="What the client said about Gurukripa Builders' craftsmanship, delivery, and service..."
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
                  {editingItem ? "Save Changes" : "Create Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
