//
// Ocean Professional Theme Tokens and helpers
//

// PUBLIC_INTERFACE
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // blue-600
    secondary: "#F59E0B", // amber-500
    success: "#10B981", // emerald-500 (slight enhancement)
    error: "#EF4444", // red-500
    background: "#f9fafb", // gray-50
    surface: "#ffffff",
    text: "#111827", // gray-900
    textSecondary: "#4B5563", // gray-600
    border: "#E5E7EB", // gray-200
    muted: "#F3F4F6", // gray-100
  },
  // Gradient utility: subtle ocean to light gray
  gradient: {
    start: "rgba(59,130,246,0.10)", // blue-500/10
    end: "#F9FAFB", // gray-50
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 10px 24px rgba(0,0,0,0.10)",
  },
  focus: {
    ring: "0 0 0 3px rgba(37, 99, 235, 0.35)" // primary glow
  },
  transition: "all 160ms ease"
};

// PUBLIC_INTERFACE
export const applyCSSVariables = () => {
  const r = document.documentElement;
  const c = theme.colors;
  r.style.setProperty("--ocean-primary", c.primary);
  r.style.setProperty("--ocean-secondary", c.secondary);
  r.style.setProperty("--ocean-success", c.success);
  r.style.setProperty("--ocean-error", c.error);
  r.style.setProperty("--ocean-bg", c.background);
  r.style.setProperty("--ocean-surface", c.surface);
  r.style.setProperty("--ocean-text", c.text);
  r.style.setProperty("--ocean-text-secondary", c.textSecondary);
  r.style.setProperty("--ocean-border", c.border);
  r.style.setProperty("--ocean-muted", c.muted);
  r.style.setProperty("--ocean-gradient-start", theme.gradient.start);
  r.style.setProperty("--ocean-gradient-end", theme.gradient.end);
  r.style.setProperty("--ocean-radius-sm", theme.radius.sm);
  r.style.setProperty("--ocean-radius-md", theme.radius.md);
  r.style.setProperty("--ocean-radius-lg", theme.radius.lg);
  r.style.setProperty("--ocean-shadow-sm", theme.shadow.sm);
  r.style.setProperty("--ocean-shadow-md", theme.shadow.md);
  r.style.setProperty("--ocean-shadow-lg", theme.shadow.lg);
  r.style.setProperty("--ocean-transition", theme.transition);
  r.style.setProperty("--ocean-focus-ring", theme.focus.ring);
};
