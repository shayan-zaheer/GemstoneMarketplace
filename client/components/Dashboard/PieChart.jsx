"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#00E8FC", // Cyan (matches from-[#00E8FC])
  "#D400A5", // Hot Pink (matches via-[#D400A5])
  "#6A00F4", // Deep Purple (matches to-[#6A00F4])
  "#5A00C5", // Indigo
  "#007CF0", // Electric Blue
  "#FF00C8", // Fuchsia
  "#B300FF", // Neon Purple
  "#00FFC3", // Teal
  "#FF0099", // Magenta
];

const DonutChart = () => {
  const data = [
    { name: "Emerald", value: 2400 },
    { name: "Diamond", value: 4000 },
    { name: "Ruby", value: 1800 },
    { name: "Sapphire", value: 2200 },
    { name: "Opal", value: 3000 },
  ];
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };
  
  return (
    <div>
      <h2 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text lg:text-3xl text-xl font-semibold mb-4 text-center">
        Revenue Per Category
      </h2>
      <div className="w-full flex justify-center">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={130}
            fill="#8884d8"
            paddingAngle={3}
            label={renderCustomLabel}
            labelLine={false}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "#ccc" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{
              paddingLeft: 20,
              lineHeight: "24px",
              fontSize: "16px", // 👈 Controls text size
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};
export default DonutChart;
