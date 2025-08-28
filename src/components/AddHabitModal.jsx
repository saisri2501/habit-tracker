/* eslint-disable react/prop-types */
import { useState } from "react";

export default function AddHabitModal({ open, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name, description });
    setName("");
    setDescription("");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        {/* Header */}
        <h2 className="text-xl font-bold text-indigo-600 mb-4">
          Add New Habit
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. Drink Water"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. Drink 8 glasses daily"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
            >
              Save Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
