"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Upload,
  Check,
  X,
  Loader2,
} from "lucide-react";

export default function AdminProjectsPage() {
  const { data, setData } = useData();
  const projects = data?.projects || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "residential",
    categoryLabel: "Residential Project",
    location: "Cheruvathur, Kerala",
    src: "",
    featured: false,
    description: "",
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      title: "",
      category: "residential",
      categoryLabel: "Residential Project",
      location: "Kerala",
      src: "/hero-new.png",
      featured: false,
      description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({ ...proj });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const result = await res.json();
      if (res.ok && result.url) {
        setFormData((prev) => ({ ...prev, src: result.url }));
      } else {
        alert("Upload failed: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.src) {
      alert("Please provide at least a project title and image");
      return;
    }

    setSaving(true);

    let updatedProjects = [...projects];
    if (editingProject) {
      updatedProjects = updatedProjects.map((p) =>
        p.id === formData.id ? formData : p
      );
    } else {
      updatedProjects.unshift(formData);
    }

    const updatedData = { ...data, projects: updatedProjects };

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
        alert("Failed to save changes");
      }
    } catch (err) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const updatedProjects = projects.filter((p) => p.id !== id);
    const updatedData = { ...data, projects: updatedProjects };

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
      alert("Failed to delete project: " + err.message);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Top action bar */}
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
            Portfolio & Gallery Projects
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            Showing {filtered.length} of {projects.length} total projects
          </p>
        </div>

        <button onClick={openAddModal} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add Project
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
          {["all", "residential", "commercial", "interiors"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border:
                  selectedCategory === cat
                    ? "1px solid var(--admin-primary)"
                    : "1px solid var(--admin-border)",
                background:
                  selectedCategory === cat
                    ? "rgba(254, 34, 1, 0.08)"
                    : "transparent",
                color: selectedCategory === cat ? "var(--admin-primary)" : "var(--admin-text-secondary)",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {cat}
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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
            style={{ paddingLeft: "36px", padding: "8px 12px 8px 36px", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="admin-card"
            style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            {/* Image Preview */}
            <div style={{ position: "relative", height: "180px", background: "#F1F5F9" }}>
              <img
                src={proj.src}
                alt={proj.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--admin-primary)",
                  border: "1px solid rgba(254, 34, 1, 0.2)",
                  textTransform: "capitalize",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
              >
                {proj.category}
              </span>
              {proj.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "var(--admin-primary)",
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: "10px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                  }}
                >
                  FEATURED
                </span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--admin-text)", marginBottom: "4px" }}>
                {proj.title}
              </h4>
              <div style={{ fontSize: "0.78rem", color: "var(--admin-text-secondary)", marginBottom: "10px" }}>
                📍 {proj.location || "Kerala, India"}
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--admin-text-secondary)",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                  flex: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {proj.description || "No description provided."}
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "8px", borderTop: "1px solid var(--admin-border)", paddingTop: "14px" }}>
                <button
                  onClick={() => openEditModal(proj)}
                  className="admin-btn admin-btn-secondary"
                  style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "8px" }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
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
                {editingProject ? "Edit Project" : "Add New Project"}
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
                <label className="admin-label">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Hillside Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="admin-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const label =
                        cat === "residential"
                          ? "Residential Project"
                          : cat === "commercial"
                          ? "Commercial Complex"
                          : "Interior & Living";
                      setFormData({ ...formData, category: cat, categoryLabel: label });
                    }}
                    className="admin-select"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="interiors">Interiors</option>
                  </select>
                </div>

                <div>
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Cheruvathur, Kerala"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Project Image *</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    required
                    placeholder="/gallery/filename.jpg or https://..."
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    className="admin-input"
                    style={{ flex: 1 }}
                  />
                  <label
                    className="admin-btn admin-btn-secondary"
                    style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    {uploading ? (
                      <Loader2 className="spin" size={16} />
                    ) : (
                      <Upload size={16} />
                    )}
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {formData.src && (
                  <div
                    style={{
                      marginTop: "10px",
                      height: "100px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid var(--admin-border)",
                    }}
                  >
                    <img
                      src={formData.src}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  rows={3}
                  placeholder="Architectural highlights, specifications, or key features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: "18px", height: "18px", accentColor: "var(--admin-primary)" }}
                />
                <label htmlFor="featured" style={{ fontSize: "0.88rem", color: "var(--admin-text)" }}>
                  Feature on Homepage Showcase
                </label>
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
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
