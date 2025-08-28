export function todayKey(date = new Date()) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - tzOffset);
  return local.toISOString().slice(0, 10); // YYYY-MM-DD
}
