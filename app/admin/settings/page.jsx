"use client";

import { useState, useEffect } from "react";
import { useData } from "@/context/DataContext";
import {
  Save,
  CheckCircle,
  Building,
  Phone,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { data, setData } = useData();
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [company, setCompany] = useState({
    name: "Gurukripa Builders",
    tagline: "Building Visions, Constructing Reality",
    established: "2020",
    location: "Kerala, India",
    description: "",
    aboutHeadline: "Reliable Construction Partners",
    aboutQuote: "",
    aboutBio: "",
  });

  const [contact, setContact] = useState({
    phone: "+91 7558988689",
    phoneClean: "917558988689",
    email: "gurukripa9070@gmail.com",
    address: "City Center, Cheemeni, Cheruvathur, Kerala 671313",
    instagram: "https://instagram.com/gurukripa_builders_chmni",
    instagramHandle: "@gurukripa_builders_chmni",
    mapEmbedUrl: "",
    whatsappMessage: "Hi, I'm interested in your construction services.",
  });

  const [hero, setHero] = useState({
    eyebrow: "Est. 2020 · Kerala, India · Premium Construction",
    line1: "WE CREATE",
    line2: "REALITY",
    line3: "FROM YOUR VISION",
    description: "",
  });

  useEffect(() => {
    if (!data) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    if (data.company) setCompany((prev) => ({ ...prev, ...data.company }));
    if (data.contact) setContact((prev) => ({ ...prev, ...data.contact }));
    if (data.hero) {
      setHero({
        eyebrow: data.hero.eyebrow || "Est. 2020 · Kerala, India · Premium Construction",
        line1: data.hero.lines?.[0] || "WE CREATE",
        line2: data.hero.lines?.[1] || "REALITY",
        line3: data.hero.lines?.[2] || "FROM YOUR VISION",
        description: data.hero.description || "",
      });
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [data]);

  const handleSaveAll = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage("");

    const updatedData = {
      ...data,
      company,
      contact: {
        ...contact,
        phoneClean: contact.phone.replace(/[^0-9]/g, ""),
      },
      hero: {
        eyebrow: hero.eyebrow,
        lines: [hero.line1, hero.line2, hero.line3].filter(Boolean),
        description: hero.description,
      },
    };

    try {
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setData(updatedData);
        setSuccessMessage("Settings updated successfully! Changes are live across the website.");
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        alert("Failed to save settings");
      }
    } catch (err) {
      alert("Error saving settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
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
            Site & Company Settings
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)" }}>
            Update global brand identity, contact numbers, map links, and hero copy
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="admin-btn admin-btn-primary"
        >
          {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />}
          Save All Changes
        </button>
      </div>

      {successMessage && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background: "#DCFCE7",
            border: "1px solid #BBF7D0",
            color: "#15803D",
            fontSize: "0.9rem",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: 500,
          }}
        >
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Section 1: Brand & Company Identity */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Building size={20} style={{ color: "var(--admin-primary)" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)" }}>
              Company & Brand Profile
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label className="admin-label">Company Name</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Tagline / Sub-badge</label>
              <input
                type="text"
                value={company.tagline}
                onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "18px" }}>
            <div>
              <label className="admin-label">Established Year</label>
              <input
                type="text"
                value={company.established}
                onChange={(e) => setCompany({ ...company, established: e.target.value })}
                className="admin-input"
                placeholder="2020"
              />
            </div>
            <div>
              <label className="admin-label">Location / Base</label>
              <input
                type="text"
                value={company.location}
                onChange={(e) => setCompany({ ...company, location: e.target.value })}
                className="admin-input"
                placeholder="Kerala, India"
              />
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">Company Mission Statement / Meta Description</label>
            <textarea
              rows={3}
              value={company.description}
              onChange={(e) => setCompany({ ...company, description: e.target.value })}
              className="admin-textarea"
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">About Section Quote</label>
            <input
              type="text"
              value={company.aboutQuote}
              onChange={(e) => setCompany({ ...company, aboutQuote: e.target.value })}
              className="admin-input"
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">About Section Detailed Biography</label>
            <textarea
              rows={4}
              value={company.aboutBio}
              onChange={(e) => setCompany({ ...company, aboutBio: e.target.value })}
              className="admin-textarea"
            />
          </div>
        </div>

        {/* Section 2: Contact & Location Settings */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Phone size={20} style={{ color: "var(--admin-primary)" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)" }}>
              Contact & Social Channels
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label className="admin-label">Primary Phone Number</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="admin-input"
                placeholder="+91 7558988689"
              />
            </div>
            <div>
              <label className="admin-label">Primary Email Address</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="admin-input"
                placeholder="gurukripa9070@gmail.com"
              />
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">Physical Office / Showroom Address</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="admin-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "18px" }}>
            <div>
              <label className="admin-label">Instagram Profile URL</label>
              <input
                type="text"
                value={contact.instagram}
                onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Instagram Handle Display</label>
              <input
                type="text"
                value={contact.instagramHandle}
                onChange={(e) => setContact({ ...contact, instagramHandle: e.target.value })}
                className="admin-input"
                placeholder="@gurukripa_builders_chmni"
              />
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">WhatsApp Pre-filled Greeting Message</label>
            <input
              type="text"
              value={contact.whatsappMessage}
              onChange={(e) => setContact({ ...contact, whatsappMessage: e.target.value })}
              className="admin-input"
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">Google Maps Embed URL (iframe src)</label>
            <input
              type="text"
              value={contact.mapEmbedUrl}
              onChange={(e) => setContact({ ...contact, mapEmbedUrl: e.target.value })}
              className="admin-input"
            />
          </div>
        </div>

        {/* Section 3: Hero Section Copy */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Sparkles size={20} style={{ color: "var(--admin-primary)" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)" }}>
              Hero Showcase Headlines
            </h3>
          </div>

          <div>
            <label className="admin-label">Eyebrow Subtitle</label>
            <input
              type="text"
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
              className="admin-input"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginTop: "18px" }}>
            <div>
              <label className="admin-label">Hero Line 1</label>
              <input
                type="text"
                value={hero.line1}
                onChange={(e) => setHero({ ...hero, line1: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Hero Line 2 (Highlighted)</label>
              <input
                type="text"
                value={hero.line2}
                onChange={(e) => setHero({ ...hero, line2: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Hero Line 3</label>
              <input
                type="text"
                value={hero.line3}
                onChange={(e) => setHero({ ...hero, line3: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>

          <div style={{ marginTop: "18px" }}>
            <label className="admin-label">Hero Description</label>
            <textarea
              rows={2}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="admin-textarea"
            />
          </div>
        </div>

        {/* Save button at bottom */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
          <button
            type="submit"
            disabled={saving}
            className="admin-btn admin-btn-primary"
            style={{ padding: "12px 26px", fontSize: "0.95rem" }}
          >
            {saving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
            Save & Publish All Changes
          </button>
        </div>
      </form>
    </div>
  );
}
