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
import { DropdownMenuRadioGroupDemo } from "../Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";


const RevenueTrendChart = () => {
  const [finalValue, setFinalValue] = useState("Sales");
  const [ revByDay,setRevByDay] = useState([])
  const data = revByDay;
  const [month, setMonth] = useState("4");



 const fetchData = async ()=>{
   try{
      console.log(month)
      const res = await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/revByDay?month=${month}&year=2025`)
      console.log(res.data)
      
      setRevByDay(res.data)
    }
    catch(e){

    }
  }
  

  useEffect(()=>{
    fetchData()
  },[month])

const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <div className="bg-transparent pb-12 pt-4 px-4 rounded-xl w-full  md:h-[29rem] relative">
      <div className="absolute top-0 left-8 flex md:justify-end  justify-center mt-4">
        <DropdownMenuRadioGroupDemo
          ddText={allMonths[+month-1]}
          valuesText={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
          values={allMonths}
          stateValue={month}
          setStateValue={setMonth}
        />
      </div>
      <h2 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4]  animate-gradient text-transparent bg-clip-text lg:text-3xl text-xl font-semibold mb-4 text-center">
        {finalValue == "Revenue" ? "Revenue Trend" : "Sales Trend"}
      </h2>
      <div className="absolute top-0 right-4 flex md:justify-end  justify-center mt-4">
        <DropdownMenuRadioGroupDemo
          ddText={finalValue}
          valuesText={["Sales", "Revenue"]}
          values={["Sales", "Revenue"]}
          stateValue={finalValue}
          setStateValue={setFinalValue}
        />
      </div>
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
