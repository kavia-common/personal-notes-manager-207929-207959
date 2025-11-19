import React, { useEffect, useRef, useState } from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onTitleChange, autosave }) {
  const [localTitle, setLocalTitle] = useState(note?.title || "");
  const [localBody, setLocalBody] = useState(note?.body || "");
  const [savedAt, setSavedAt] = useState(null);
  const saveTimer = useRef(null);

  useEffect(() => {
    setLocalTitle(note?.title || "");
    setLocalBody(note?.body || "");
  }, [note?.id]);

  useEffect(() => {
    if (!autosave || !note) return;
    // Debounced autosave when fields change
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (localTitle !== note.title) onTitleChange(localTitle);
      if (localBody !== note.body) onChange(localBody);
      setSavedAt(Date.now());
    }, 400);
    return () => clearTimeout(saveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTitle, localBody, autosave, note?.id]);

  function handleManualSave() {
    if (!note) return;
    if (localTitle !== note.title) onTitleChange(localTitle);
    if (localBody !== note.body) onChange(localBody);
    setSavedAt(Date.now());
  }

  if (!note) {
    return (
      <div className="note-editor empty-state" role="region" aria-live="polite">
        <h2>No note selected</h2>
        <p>Create a note or select one from the list.</p>
      </div>
    );
  }

  return (
    <section className="note-editor" aria-label="Note editor">
      <input
        type="text"
        className="note-title-input"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        placeholder="Title"
        aria-label="Note title"
      />
      <textarea
        className="note-body-input"
        value={localBody}
        onChange={(e) => setLocalBody(e.target.value)}
        placeholder="Start typing your note..."
        aria-label="Note body"
      />
      <div className="note-editor-footer">
        {!autosave && (
          <button className="btn-primary" onClick={handleManualSave}>
            Save
          </button>
        )}
        <div className="muted">
          {savedAt
            ? `Saved ${new Date(savedAt).toLocaleTimeString()}`
            : autosave
            ? "Autosave ON"
            : "Autosave OFF"}
        </div>
      </div>
    </section>
  );
}
