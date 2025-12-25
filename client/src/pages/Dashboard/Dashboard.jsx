import React, { useEffect, useState } from "react";
import { getSummary } from "../../services/analysisService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState({
    last30: [],
    longest: null,
    mostActiveDay: null,
  });

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const res = await getSummary();
      // res.data.last30: [{ _id: 'YYYY-MM-DD', totalMinutes, totalCalories }]
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const barData = data.last30.map((d) => ({
    date: d._id,
    minutes: d.totalMinutes,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Minutes (last 30 days)</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium mb-2">Top stats</h3>
          <div className="text-sm text-slate-700">
            <div>
              Longest workout:{" "}
              {data.longest
                ? `${data.longest.durationMinutes} min (${data.longest.exerciseName})`
                : "N/A"}
            </div>
            <div>
              Most active day:{" "}
              {data.mostActiveDay
                ? `${data.mostActiveDay._id} (${data.mostActiveDay.totalMinutes} min)`
                : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* simple pie showing distribution by exercise could be added by fetching per-exercise aggregation from backend */}
    </div>
  );
}
