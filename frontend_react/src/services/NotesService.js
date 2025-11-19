const STORAGE_KEY = "notes_app_items_v1";
const SEED_DONE_KEY = "notes_app_seed_done_v1";

// PUBLIC_INTERFACE
export class NotesService {
  /**
   * NotesService abstracts data operations. Uses LocalStorage by default.
   * If REACT_APP_API_BASE or REACT_APP_BACKEND_URL is set, it will attempt to use REST endpoints at `${base}/notes`.
   */
  constructor() {
    this.base =
      process.env.REACT_APP_API_BASE ||
      process.env.REACT_APP_BACKEND_URL ||
      "";
    this.useApi = Boolean(this.base);
    this.endpoint = this.useApi ? `${this.base.replace(/\/+$/, "")}/notes` : null;
    // Ensure seed only for local storage mode
    if (!this.useApi) this.ensureSeedData();
  }

  ensureSeedData() {
    try {
      const seeded = localStorage.getItem(SEED_DONE_KEY);
      if (seeded) return;
      const has = this._lsRead().length > 0;
      if (!has) {
        const now = Date.now();
        const seed = [
          {
            id: `seed-${now}`,
            title: "Welcome to Ocean Notes",
            body:
              "This is your personal notes manager.\n\n- Use the search to filter notes.\n- Click a note to edit.\n- Changes are autosaved.\n- Delete with the trash icon.\n\nEnjoy the Ocean Professional theme!",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: `seed-quick-${now}`,
            title: "Quick ideas",
            body: "• Explore feature flags\n• Try API backend later\n• Keep UI clean and responsive",
            createdAt: now,
            updatedAt: now,
          },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      }
      localStorage.setItem(SEED_DONE_KEY, "1");
    } catch {
      // ignore
    }
  }

  // PUBLIC_INTERFACE
  async list() {
    if (this.useApi) {
      const res = await fetch(this.endpoint, { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to load notes: ${res.status}`);
      return await res.json();
    }
    return this._lsRead();
  }

  // PUBLIC_INTERFACE
  async get(id) {
    if (this.useApi) {
      const res = await fetch(`${this.endpoint}/${encodeURIComponent(id)}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to get note: ${res.status}`);
      return await res.json();
    }
    return this._lsRead().find(n => n.id === id) || null;
  }

  // PUBLIC_INTERFACE
  async create(data) {
    const now = Date.now();
    if (this.useApi) {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Failed to create note: ${res.status}`);
      return await res.json();
    }
    const note = {
      id: cryptoRandomId(),
      title: data.title || "Untitled",
      body: data.body || "",
      createdAt: now,
      updatedAt: now,
    };
    const all = this._lsRead();
    all.unshift(note);
    this._lsWrite(all);
    return note;
  }

  // PUBLIC_INTERFACE
  async update(id, patch) {
    const now = Date.now();
    if (this.useApi) {
      const res = await fetch(`${this.endpoint}/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error(`Failed to update note: ${res.status}`);
      return await res.json();
    }
    const all = this._lsRead();
    const idx = all.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const updated = { ...all[idx], ...patch, updatedAt: now };
    all[idx] = updated;
    this._lsWrite(all);
    return updated;
  }

  // PUBLIC_INTERFACE
  async remove(id) {
    if (this.useApi) {
      const res = await fetch(`${this.endpoint}/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to delete note: ${res.status}`);
      return true;
    }
    const all = this._lsRead();
    const next = all.filter(n => n.id !== id);
    this._lsWrite(next);
    return true;
  }

  _lsRead() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      return arr.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    } catch {
      return [];
    }
  }

  _lsWrite(arr) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {
      // ignore
    }
  }
}

function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
