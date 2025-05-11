import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const BarGraph = ({ data }) => {
  console.log(data);
  return (
    <>
      <h2 className="relative bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text lg:text-2xl text-xl font-semibold mb-4 text-center">
        Top 10 Selling Gems
      </h2>
      <ResponsiveContainer width="100%" height="83%">
        <BarChart width={150} height={40} data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00E8FC" stopOpacity={1} />
              <stop offset="50%" stopColor="#D400A5" stopOpacity={1} />
              <stop offset="100%" stopColor="#6A00F4" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#fff" }}
            cursor={{ fill: "transparent"}}
          />
          <Bar
            dataKey="salesCount"
            fill="url(#colorGradient)"
            radius={[5, 5, 0, 0]}
            activeBar={{stroke: "url(#colorGradient)" }}
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarGraph;
