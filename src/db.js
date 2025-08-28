import { openDB } from "idb";

const DB_NAME = "habit-tracker";
const STORE_NAME = "habits";

// Open DB (create if not exists)
async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

// List all habits
export async function listHabits() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

// Add new habit
export async function addHabit(habit) {
  const db = await getDB();
  const newHabit = {
    ...habit,
    createdAt: new Date().toISOString(),
    completedDates: [], // track daily completions
  };
  await db.add(STORE_NAME, newHabit);
}

// Delete habit
export async function deleteHabit(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

// Toggle completion for today
export async function toggleToday(id) {
  const db = await getDB();
  const habit = await db.get(STORE_NAME, id);

  if (!habit) return;

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  if (!habit.completedDates) habit.completedDates = [];

  if (habit.completedDates.includes(today)) {
    // Already marked -> unmark
    habit.completedDates = habit.completedDates.filter((d) => d !== today);
  } else {
    // Not marked -> mark as done
    habit.completedDates.push(today);
  }

  // Save back
  await db.put(STORE_NAME, habit);
}
