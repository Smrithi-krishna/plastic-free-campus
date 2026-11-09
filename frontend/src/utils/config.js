// Configurable demo settings. Deposits, borrow period and points are all demo values, not confirmed policy.
// Order of precedence: localStorage override > VITE_* env var > default below.
// Later phases will expose these in a staff settings form (see DesignSystem page for a working example).
const STORAGE_KEY = 'pfc.config';
const env = import.meta.env ?? {};

const num = (value, fallback) => {
  const n = Number(value);
  return value !== undefined && value !== '' && Number.isFinite(n) ? n : fallback;
};

export const DEFAULT_CONFIG = {
  // Refundable deposits in rupees
  deposits: {
    cup: num(env.VITE_DEPOSIT_CUP, 20),
    small_box: num(env.VITE_DEPOSIT_SMALL_BOX, 50),
    large_box: num(env.VITE_DEPOSIT_LARGE_BOX, 100),
  },
  // DEMO VALUES, NOT CONFIRMED POLICY. The 48-hour borrow period and the points below are placeholders
  // so the prototype has something to show. Change them here, with VITE_BORROW_HOURS, or in the demo settings form.
  borrowHours: num(env.VITE_BORROW_HOURS, 48),
  points: {
    onTimeReturn: { cup: 10, small_box: 15, large_box: 20 },
  },
};

function merge(base, patch = {}) {
  return {
    ...base,
    ...patch,
    deposits: { ...base.deposits, ...patch.deposits },
    points: { onTimeReturn: { ...base.points.onTimeReturn, ...patch.points?.onTimeReturn } },
  };
}

export function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? merge(DEFAULT_CONFIG, JSON.parse(raw)) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(patch) {
  const next = merge(loadConfig(), patch);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the in-memory result is still returned */
  }
  return next;
}

export function resetConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return DEFAULT_CONFIG;
}

export const getDeposit = (type) => loadConfig().deposits[type] ?? 0;
export const getPointsForReturn = (type) => loadConfig().points.onTimeReturn[type] ?? 0;
