import React, { useMemo } from "react";
import "./NotesList.css";

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onCreate,
  onDelete,
  searchEnabled,
  query,
  setQuery,
  loading,
}) {
  const filtered = useMemo(() => {
    const q = (query || "").toLowerCase();
    if (!q) return notes;
    return notes.filter(n => {
      return (
        (n.title || "").toLowerCase().includes(q) ||
        (n.body || "").toLowerCase().includes(q)
      );
    });
  }, [notes, query]);

  return (
    <aside className="notes-list" aria-label="Notes list">
      <div className="notes-list-header">
        <button className="btn-primary" onClick={onCreate} aria-label="Create note">
          + New
        </button>
        {searchEnabled && (
          <input
            className="search-input"
            type="search"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search notes"
          />
        )}
      </div>

      {loading ? (
        <div className="empty">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="empty">No notes found</div>
      ) : (
        <ul className="notes-ul">
          {filtered.map((n) => (
            <li key={n.id}>
              <button
                className={`note-item ${selectedId === n.id ? "active" : ""}`}
                onClick={() => onSelect(n.id)}
                title={n.title}
              >
                <div className="note-title">{n.title || "Untitled"}</div>
                <div className="note-snippet">
                  {(n.body || "").slice(0, 90) || "No content"}
                </div>
              </button>
              <button
                className="icon-btn"
                onClick={() => onDelete(n.id)}
                aria-label={`Delete note ${n.title || ""}`}
                title="Delete note"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
