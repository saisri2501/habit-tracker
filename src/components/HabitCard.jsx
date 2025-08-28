import { useMemo } from "react";

export default function HabitCard({ habit, onToggleToday, onDelete }) {
  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = useMemo(
    () => habit.completedDates?.includes(today),
    [habit.completedDates, today]
  );

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{habit.name}</h3>
        {habit.description && (
          <p className="text-sm text-gray-500">{habit.description}</p>
        )}
      </div>
      <div className="flex gap-2">
        {/* ✅ Toggle button */}
        <button
          onClick={() => onToggleToday(habit.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium shadow transition
            ${
              isDoneToday
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          {isDoneToday ? "✅ Done" : "Mark Done"}
        </button>

        {/* 🗑️ Delete button */}
        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
