import { PATTERNS } from './validators';

// What is encoded in a QR code. Kept human-readable so demo codes can also be typed in.
export const buildStudentQR = (studentId) => `PFC:STU:${studentId}`;
export const buildContainerQR = (code) => `PFC:CTN:${code}`;

/**
 * Accepts a scanned payload ("PFC:STU:PFC-STU-1042") or a typed code ("PFC-CUP-0142").
 * Returns { kind: 'student' | 'container', id } or null.
 */
export function parseQR(raw) {
  const value = String(raw ?? '').trim();
  const body = value.startsWith('PFC:') ? value.split(':').slice(2).join(':') : value;
  if (PATTERNS.student.test(body)) return { kind: 'student', id: body.toUpperCase() };
  if (PATTERNS.container.test(body)) return { kind: 'container', id: body.toUpperCase() };
  return null;
}
