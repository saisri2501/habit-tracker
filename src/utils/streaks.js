import { todayKey } from "./date";

// key for "n days ago" in local time
function keyNDaysAgo(n) {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // start of today (local)
  now.setDate(now.getDate() - n);
  return todayKey(now);
}

// parse YYYY-MM-DD into a local Date (00:00)
function dateFromKey(key) {
  return new Date(`${key}T00:00:00`);
}

// absolute difference in whole days between two keys
function dayDiff(k1, k2) {
  const d1 = dateFromKey(k1);
  const d2 = dateFromKey(k2);
  return Math.round((d2 - d1) / 86400000);
}

// Calculate current & longest streaks for a habit.checkins object
export function calcStreaks(checkins = {}) {
  // ---- current streak (count back from today) ----
  let current = 0;
  for (let i = 0; ; i++) {
    const key = keyNDaysAgo(i);
    if (checkins[key]) current++;
    else break;
  }

  // ---- longest streak (scan all days, count consecutive runs) ----
  const keys = Object.keys(checkins);
  if (keys.length === 0) return { current, longest: 0 };

  // sort ascending
  keys.sort((a, b) => dateFromKey(a) - dateFromKey(b));

  let longest = 1;
  let run = 1;

  for (let i = 1; i < keys.length; i++) {
    const diff = dayDiff(keys[i - 1], keys[i]);
    if (diff === 1) {
      run += 1;
      if (run > longest) longest = run;
    } else if (diff >= 2) {
      run = 1; // gap breaks the streak
    } // if diff==0 (duplicate key), ignore; data model shouldn't have it
  }

  return { current, longest };
}
