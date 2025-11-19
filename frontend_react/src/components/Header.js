import React from "react";
import "./Header.css";

// PUBLIC_INTERFACE
export default function Header() {
  return (
    <header className="ocean-header" role="banner">
      <div className="ocean-header-inner">
        <div className="ocean-brand">
          <span className="ocean-dot" aria-hidden="true"></span>
          <h1 className="ocean-title">Ocean Notes</h1>
        </div>
        <div className="ocean-actions" aria-label="Header actions">
          <a
            className="ocean-help"
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
          >
            Help
          </a>
        </div>
      </div>
    </header>
  );
}
