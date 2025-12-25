import React, { useState, useEffect } from "react";
import { createGoal, getGoals, deleteGoal } from "../../services/goalsService";

export default function Goals() {
  const [type, setType] = useState("weight");
  const [value, setValue] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const r = await getGoals();
    setList(r.data);
  };

  const add = async (e) => {
    e.preventDefault();
    await createGoal({
      type,
      targetValue: Number(value),
      startDate: start,
      endDate: end,
    });
    setValue("");
    setStart("");
    setEnd("");
    fetch();
  };

  const remove = async (id) => {
    await deleteGoal(id);
    fetch();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Goals</h2>
      <form
        onSubmit={add}
        className="bg-white p-4 rounded shadow mb-6 flex gap-2"
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option value="weight">Weight (kg)</option>
          <option value="minutes">Minutes</option>
          <option value="calories">Calories</option>
        </select>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Target value"
          className="input w-40"
        />
        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="input"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Set
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <ul className="space-y-2">
          {list.map((g) => (
            <li
              key={g._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                {g.type} — {g.targetValue} (
                {new Date(g.startDate).toLocaleDateString()} →{" "}
                {new Date(g.endDate).toLocaleDateString()})
              </div>
              <button className="text-red-600" onClick={() => remove(g._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
