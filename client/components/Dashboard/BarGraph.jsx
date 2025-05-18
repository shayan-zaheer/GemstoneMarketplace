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
      <h2 className="relative text-primary lg:text-2xl text-xl font-semibold mb-4 text-center">
        Top 10 Selling Gems
      </h2>
      <ResponsiveContainer width="100%" height="83%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" />
         <Tooltip
            contentStyle={{
              backgroundColor: "#d6d4f7",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "gray" }}
            cursor={{fill: "transparent"}}
          />
          <Bar
            dataKey="salesCount"
            fill="#7c3aed"
            radius={[5, 5, 0, 0]}
            activeBar={{stroke: "#7c3aed" }}
            strokeWidth={3}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarGraph;
