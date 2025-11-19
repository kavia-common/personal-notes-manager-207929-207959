import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import "./App.css";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import EmptyState from "./components/EmptyState";
import { NotesService } from "./services/NotesService";
import { getFeatureFlags } from "./utils/featureFlags";
import { applyCSSVariables } from "./theme";

// PUBLIC_INTERFACE
export default function App() {
  // Apply theme variables once
  useEffect(() => {
    applyCSSVariables();
    document.body.style.background = "var(--ocean-bg)";
    document.body.style.color = "var(--ocean-text)";
  }, []);

  const flags = useMemo(() => getFeatureFlags(), []);
  const [service] = useState(() => new NotesService());
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // Initial load
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await service.list();
        if (!alive) return;
        setNotes(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [service]);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  async function refresh(selectId = null) {
    const data = await service.list();
    setNotes(data);
    if (selectId) setSelectedId(selectId);
  }

  async function handleCreate() {
    const created = await service.create({ title: "Untitled", body: "" });
    await refresh(created.id);
  }

  async function handleDelete(id) {
    const target = notes.find(n => n.id === id);
    const name = target?.title || "this note";
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await service.remove(id);
    await refresh(
      id === selectedId
        ? notes.find((n) => n.id !== id)?.id || null
        : selectedId
    );
  }

  async function handleUpdateBody(body) {
    if (!selected) return;
    const updated = await service.update(selected.id, { body });
    setNotes(prev => prev.map(n => (n.id === updated.id ? updated : n)));
  }

  async function handleUpdateTitle(title) {
    if (!selected) return;
    const updated = await service.update(selected.id, { title });
    setNotes(prev => prev.map(n => (n.id === updated.id ? updated : n)));
  }

  return (
    <div className="app-wrap">
      <Header />
      <main className="main-layout">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={handleCreate}
          onDelete={handleDelete}
          searchEnabled={flags.search}
          query={query}
          setQuery={setQuery}
          loading={loading}
        />
        <div className="editor-wrap">
          {notes.length === 0 && !loading ? (
            <EmptyState onCreate={handleCreate} />
          ) : (
            <NoteEditor
              note={selected}
              onChange={handleUpdateBody}
              onTitleChange={handleUpdateTitle}
              autosave={flags.autosave}
            />
          )}
        </div>
      </main>
      <footer className="footer">
        <span>
          Data layer: {service.useApi ? "Remote API" : "LocalStorage"}
        </span>
      </footer>
    </div>
  );
}
