import React, { useState, useEffect } from "react";
import {
  createWorkout,
  getWorkoutsByDate,
} from "../../services/workoutService";
import dayjs from "dayjs";

export default function Tracker() {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchDay();
  }, [date]);

  const fetchDay = async () => {
    try {
      const res = await getWorkoutsByDate(date);
      setItems(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await createWorkout({
        date,
        exerciseName: exercise,
        durationMinutes: Number(duration),
      });
      setExercise("");
      setDuration("");
      fetchDay();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tracker</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input w-44"
          />
          <input
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            placeholder="Exercise"
            className="input"
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
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Log
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium mb-2">Workouts on {date}</h3>
        {items.length === 0 && (
          <div className="text-sm text-slate-500">No workouts logged</div>
        )}
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <div className="font-medium">{item.exerciseName}</div>
                <div className="text-sm text-slate-600">
                  {item.durationMinutes} minutes
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
