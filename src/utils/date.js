/**
 * Format a "YYYY-MM-DD" string as e.g. "18 Oct 2026".
 * We parse the parts manually so the date never shifts because of time zones
 * (new Date('2026-10-18') is parsed as UTC midnight and can show the previous day).
 */
export function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Today's date as "YYYY-MM-DD" in local time (used as default in admin form) */
export function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
