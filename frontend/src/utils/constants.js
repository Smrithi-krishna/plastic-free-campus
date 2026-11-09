export const APP_NAME = 'Plastic-Free Campus';

export const STORAGE_KEYS = {
  theme: 'pfc.theme',
  config: 'pfc.config',
};

// Deposit amounts live in utils/config.js so they stay configurable.
export const CONTAINER_TYPES = {
  cup: { id: 'cup', label: 'Reusable cup', short: 'Cup', capacity: '350 ml', prefix: 'CUP' },
  small_box: { id: 'small_box', label: 'Small food box', short: 'Small box', capacity: '600 ml', prefix: 'SBX' },
  large_box: { id: 'large_box', label: 'Large food box', short: 'Large box', capacity: '1 litre', prefix: 'LBX' },
};

// One place that decides how every status looks, in both portals.
export const STATUS = {
  available: { label: 'Available', tone: 'ok' },
  borrowed: { label: 'Borrowed', tone: 'info' },
  overdue: { label: 'Overdue', tone: 'danger' },
  awaiting_check: { label: 'Awaiting check', tone: 'warn' },
  cleaning: { label: 'In cleaning', tone: 'warn' },
  damaged: { label: 'Damaged', tone: 'danger' },
  deposit_held: { label: 'Deposit held', tone: 'info' },
  refund_pending: { label: 'Refund pending', tone: 'warn' },
  refunded: { label: 'Refunded', tone: 'ok' },
  forfeited: { label: 'Deposit forfeited', tone: 'danger' },
  completed: { label: 'Completed', tone: 'ok' },
};

export const ROLES = { student: 'student', staff: 'staff' };

export const DEMO_NOTE =
  'All numbers, people and transactions in this app are simulated demo data. Impact figures are illustrative and are not verified real-world results.';
