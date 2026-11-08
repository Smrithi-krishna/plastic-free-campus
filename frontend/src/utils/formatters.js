const inr0 = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const inr2 = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const count = new Intl.NumberFormat('en-IN');

/** 20 -> "₹20", 1250.5 -> "₹1,250.50", 123456 -> "₹1,23,456" */
export const formatINR = (amount) => {
  const n = Number(amount) || 0;
  return Number.isInteger(n) ? inr0.format(n) : inr2.format(n);
};

export const formatNumber = (n) => count.format(Number(n) || 0);
export const formatPoints = (n) => `${count.format(Number(n) || 0)} pts`;

const dateFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const timeFmt = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });

export const formatDate = (iso) => dateFmt.format(new Date(iso));
export const formatDateTime = (iso) => `${dateFmt.format(new Date(iso))}, ${timeFmt.format(new Date(iso))}`;

/** Returns { text, overdue } e.g. { text: 'Due in 5 h', overdue: false } */
export function formatDue(iso, now = Date.now()) {
  const diff = new Date(iso).getTime() - now;
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  const hours = Math.round(abs / 3600000);
  const days = Math.floor(abs / 86400000);
  const span = mins < 60 ? `${Math.max(mins, 1)} min` : hours < 48 ? `${hours} h` : `${days} d`;
  return diff >= 0 ? { text: `Due in ${span}`, overdue: false } : { text: `Overdue by ${span}`, overdue: true };
}

export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
