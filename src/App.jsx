import { useEffect, useState } from "react";
import AddHabitModal from "./components/AddHabitModal";
import HabitCard from "./components/HabitCard";
import { listHabits, addHabit, deleteHabit, toggleToday } from "./db";
import ProgressChart from "./components/ProgressChart";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Load habits from DB
  async function refresh() {
    setLoading(true);
    const data = await listHabits();
    // Sort newest first
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setHabits(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate({ name, description }) {
    await addHabit({ name, description });
    setOpenModal(false);
    await refresh();
  }

  async function handleToggleToday(id) {
    await toggleToday(id);
    await refresh();
  }

  async function handleDelete(id) {
    if (confirm("Delete this habit?")) {
      await deleteHabit(id);
      await refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100">
      {/* App Container */}
      <div className="w-full max-w-3xl h-[90vh] rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-indigo-600 text-white px-6 py-4 rounded-t-2xl shadow">
          <h1 className="text-3xl font-bold tracking-wide">Habit Tracker</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-lg bg-white text-indigo-600 px-4 py-2 text-sm font-semibold shadow hover:bg-indigo-50 transition"
          >
            + Add Habit
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              Loading…
            </div>
          ) : habits.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-900 text-lg font-medium">No habits yet</p>
              <p className="mt-2 text-sm text-gray-500">
                Click “Add Habit” to create your first one 🚀
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {habits.map((h) => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  onToggleToday={handleToggleToday}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Chart */}
          {habits.length > 0 && (
            <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Progress Overview
              </h2>
              <ProgressChart habits={habits} />
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AddHabitModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
