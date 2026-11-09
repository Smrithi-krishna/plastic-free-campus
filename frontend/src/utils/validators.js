export const PATTERNS = {
  student: /^PFC-STU-\d{4,}$/i,
  container: /^PFC-(CUP|SBX|LBX)-\d{4}$/i,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/, // Indian mobile numbers
};

export const required = (v, label = 'This field') => (String(v ?? '').trim() ? '' : `${label} is required.`);
export const isEmail = (v) => (PATTERNS.email.test(String(v).trim()) ? '' : 'Enter a valid email address, like name@college.edu.');
export const isPhone = (v) => (PATTERNS.phone.test(String(v).replace(/\s/g, '')) ? '' : 'Enter a 10-digit mobile number.');
export const minLength = (v, n, label = 'This field') => (String(v ?? '').length >= n ? '' : `${label} must be at least ${n} characters.`);
export const isPositiveAmount = (v) => (Number(v) > 0 ? '' : 'Enter an amount greater than ₹0.');

/** Run several checks; returns the first error message or ''. */
export const firstError = (...results) => results.find(Boolean) ?? '';
