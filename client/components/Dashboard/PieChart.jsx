"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { DropdownMenuRadioGroupDemo } from "../Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";

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
  
  const [revenue,setRevenue] = useState([])
  
  const data = revenue;
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null;
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
  const [finalValue, setFinalValue] = useState("Total");

  const fetchData = async ()=>{
    try{
      const res = await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/revByName`)
      console.log(res.data)
      setRevenue(res.data)
    }
    catch(e){
    }
  }
  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div>
      <h2 className="relative bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text lg:text-2xl text-xl font-semibold mb-4 text-center">
        Revenue Per Category
      </h2>
      <div className="top-0 left-8 flex md:justify-center  justify-center mt-4">
              <DropdownMenuRadioGroupDemo
                ddText={finalValue}
                valuesText={["Total", "Average"]}
                values={["Total", "Average"]}
                stateValue={finalValue}
                setStateValue={setFinalValue}
              />
            </div>
      <div className="w-full flex justify-start items-center mt-4">
        <PieChart width={470} height={180}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={0}
            label={renderCustomLabel}
            labelLine={false}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke=""
                strokeWidth={2}
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
            layout="vertical"
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{
              lineHeight: "24px",
              fontSize: "16px", // 👈 Controls text size
              display: "flex",
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};
export default DonutChart;
