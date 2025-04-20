"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "1", revenue: 120 },
  { day: "2", revenue: 200 },
  { day: "3", revenue: 150 },
  { day: "4", revenue: 180 },
  { day: "5", revenue: 300 },
  { day: "6", revenue: 250 },
  { day: "7", revenue: 400 },
  { day: "8", revenue: 350 },
  { day: "9", revenue: 300 },
  { day: "10", revenue: 200 },
  { day: "11", revenue: 150 },
  { day: "12", revenue: 100 },
  { day: "13", revenue: 50 },
  { day: "14", revenue: 80 },
  { day: "15", revenue: 120 },
  { day: "16", revenue: 200 },
  { day: "17", revenue: 150 },
  { day: "18", revenue: 180 },
  { day: "19", revenue: 300 },
  { day: "20", revenue: 250 },
  { day: "21", revenue: 400 },
  { day: "22", revenue: 350 },
  { day: "23", revenue: 300 },
  { day: "24", revenue: 200 },
  { day: "25", revenue: 150 },
  { day: "26", revenue: 100 },
  { day: "27", revenue: 50 },
  { day: "28", revenue: 80 },
  { day: "29", revenue: 120 },
  { day: "30", revenue: 240 },
];

const RevenueTrendChart = () => {
  return (
    <div className="bg-transparent pb-12 pt-4 px-4 rounded-xl w-full  md:h-[29rem]">
      <h2 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text lg:text-3xl text-xl font-semibold mb-4 text-center">
        Revenue Trend
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00E8FC" />
              <stop offset="50%" stopColor="#D400A5" />
              <stop offset="100%" stopColor="#6A00F4" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={{ r: 4, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueTrendChart;
