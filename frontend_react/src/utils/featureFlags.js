const DEFAULT_FLAGS = {
  autosave: true,
  search: true,
};

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  const raw = process.env.REACT_APP_FEATURE_FLAGS;
  if (!raw) return { ...DEFAULT_FLAGS };

  // Support JSON or comma-separated "key" or "key=true/false"
  try {
    if (raw.trim().startsWith("{")) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_FLAGS, ...normalize(parsed) };
    }
  } catch (_e) {
    // fallthrough to CSV parsing
  }
  const result = { ...DEFAULT_FLAGS };
  raw.split(",").map(s => s.trim()).filter(Boolean).forEach(item => {
    const [k, v] = item.split("=").map(x => x && x.trim());
    if (!k) return;
    if (typeof v === "undefined" || v === "") {
      result[k] = true;
    } else {
      const lv = v.toLowerCase();
      result[k] = lv === "true" || lv === "1" || lv === "yes" || lv === "on";
    }
  });
  return result;
}

function normalize(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string") {
      const lv = v.toLowerCase();
      out[k] = lv === "true" || lv === "1" || lv === "yes" || lv === "on";
    } else {
      out[k] = Boolean(v);
    }
  }
  return out;
}
