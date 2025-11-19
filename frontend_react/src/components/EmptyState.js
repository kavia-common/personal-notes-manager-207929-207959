import React from "react";
import "./EmptyState.css";

// PUBLIC_INTERFACE
export default function EmptyState({ onCreate }) {
  return (
    <div className="empty-wrap">
      <div className="empty-card">
        <div className="empty-badge">📝</div>
        <h2>Welcome to Ocean Notes</h2>
        <p>Create your first note to get started.</p>
        <button className="btn-primary" onClick={onCreate}>Create note</button>
      </div>
    </div>
  );
}
