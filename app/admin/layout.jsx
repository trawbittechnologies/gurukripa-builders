"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  MessageSquareText,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Loader2,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(0);

  // If on login page, render children directly without admin layout frame
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    (async () => {
      if (isLoginPage) {
        setAuthChecked(true);
        return;
      }

      // Check authentication
      try {
        const res = await fetch("/api/auth/check");
        const data = await res.json();
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setAuthChecked(true);
        }
      } catch {
        router.push("/admin/login");
      }

      // Fetch unread inquiries count
      try {
        const res = await fetch("/api/inquiries");
        const items = res.ok ? await res.json() : [];
        if (Array.isArray(items)) {
          const newOnes = items.filter((i) => i.status === "New").length;
          setInquiryCount(newOnes);
        }
      } catch {
        // silently ignore
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (!authChecked && !isLoginPage) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
          color: "var(--admin-primary)",
          gap: "12px",
          fontFamily: "var(--font-body)",
        }}
      >
        <Loader2 className="spin" size={28} />
        <span style={{ fontWeight: 600, color: "var(--admin-text)" }}>Authenticating Admin Portal...</span>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Projects & Gallery", href: "/admin/projects", icon: <FolderKanban size={18} /> },
    { name: "Services", href: "/admin/services", icon: <Wrench size={18} /> },
    {
      name: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: <MessageSquareText size={18} />,
      badge: inquiryCount > 0 ? inquiryCount : null,
    },
    { name: "Testimonials", href: "/admin/testimonials", icon: <Star size={18} /> },
    { name: "Site Settings", href: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo-badge">G</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--admin-text)", letterSpacing: "0.01em" }}>
              GURUKRIPA
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--admin-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
              ADMIN CMS
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "var(--admin-text-muted)",
              cursor: "pointer",
              display: "none",
            }}
            className="mobile-sidebar-close"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link
            href="/"
            target="_blank"
            className="admin-btn admin-btn-secondary"
            style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
          >
            <ExternalLink size={15} /> View Public Website
          </Link>
          <button
            onClick={handleLogout}
            className="admin-btn admin-btn-danger"
            style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "#F1F5F9",
                border: "1px solid var(--admin-border)",
                borderRadius: "8px",
                padding: "8px",
                color: "var(--admin-text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--admin-text)", letterSpacing: "0.01em" }}>
              Management Console
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "#DCFCE7",
                borderRadius: "20px",
                border: "1px solid #BBF7D0",
                color: "#15803D",
                fontSize: "0.78rem",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                }}
              />
              System Live
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--admin-text-secondary)", fontWeight: 600 }}>
              Administrator
            </div>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
