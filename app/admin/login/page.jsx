"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%)",
        padding: "24px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#FFFFFF",
          border: "1px solid var(--admin-border)",
          borderRadius: "20px",
          padding: "36px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              margin: "0 auto 14px auto",
              background: "linear-gradient(135deg, #FE2201 0%, #D81E00 100%)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 6px 18px rgba(254, 34, 1, 0.3)",
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h1 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--admin-text)", letterSpacing: "0.01em" }}>
            Gurukripa Admin
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", marginTop: "4px" }}>
            Sign in to manage website content & leads
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#FEE2E2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              fontSize: "0.85rem",
              marginBottom: "18px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label className="admin-label">Username</label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-muted)",
                }}
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: "42px" }}
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="admin-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--admin-text-muted)",
                }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                style={{ paddingLeft: "42px" }}
                placeholder="••••••••••••"
              />
            </div>
          </div>



          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px",
              fontSize: "0.95rem",
              marginTop: "6px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="spin" size={18} /> Authenticating...
              </>
            ) : (
              <>
                Sign In to Console <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: "22px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "var(--admin-text-secondary)",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
