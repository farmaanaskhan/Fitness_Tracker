import React, { useState } from "react";

export default function Planner() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const add = () => {
    if (!name || !duration) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name, duration: parseInt(duration, 10) },
    ]);
    setName("");
    setDuration("");
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Planner - create today's routine
      </h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Exercise name"
            className="flex-1 input"
          />
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Minutes"
            type="number"
            className="w-28 input"
          />
          <button
            onClick={add}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">Today's plan</h3>
        {items.length === 0 && (
          <div className="text-sm text-slate-500">No items yet</div>
        )}
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                {it.name} — {it.duration} min
              </div>
              <div className="flex gap-2">
                <button onClick={() => remove(it.id)} className="text-red-600">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
