// October 2026 in Africa/Lagos (UTC+01:00), with an exclusive end.
export const ANNIVERSARY_START = Date.parse('2026-10-01T00:00:00+01:00');
export const ANNIVERSARY_END = Date.parse('2026-11-01T00:00:00+01:00');

export function isAnniversaryActive(now = Date.now()) {
  return now >= ANNIVERSARY_START && now < ANNIVERSARY_END;
}
