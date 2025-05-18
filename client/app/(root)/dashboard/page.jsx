"use client";
import React, { useState, useEffect } from "react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardLine from "@/components/Dashboard/DashboardLine";
import PieChart from "@/components/Dashboard/PieChart";
import { MdSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import BarGraph from "@/components/Dashboard/BarGraph";
import Unauthorized from "@/components/Unauthorized";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const page = () => {
  const loggedinUser = useSelector((store) => store?.user?.user);
  const [loading, setLoading] = useState(true);
  console.log(loggedinUser);
  const cardDetailsTemp = [
    {
      title: "Total Users",
      value: 0,
    },
    {
      title: "Current Month Users",
      value: 0,
    },
    {
      title: "Total Gemstones",
      value: 0,
    },
    {
      title: "Gemstones Listed",
      value: 0,
    },
    {
      title: "Total Orders",
      value: 0,
    },
    {
      title: "Sold Gemstones",
      value: 0,
    },
    {
      title: "Average Order Value",
      value: 0,
    },
    {
      title: "Total Revenue",
      value: 0,
    },
    {
      title: "Pending Orders",
      value: 0,
    },
    {
      title: "Current Month Revenue",
      value: 0,
    },
  ];
  const [cardDetails, setCardDetails] = useState(cardDetailsTemp);
  const [barGraphData, setBarGraphData] = useState([
    { name: "1", salesCount: 10 },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/stats`
        );
        setBarGraphData((prev) => {
          const newBarGraphData = [];
          res.data?.data?.topSellingGems.map((item) => {
            newBarGraphData.push({
              name: String(item.gemId),
              salesCount: +item.salesCount,
            });
          });
          return newBarGraphData;
        });
        setCardDetails((prev) => {
          const newCardDetails = [...prev];
          newCardDetails[0].value = res.data?.data?.totalUsers;
          newCardDetails[1].value = res.data?.data?.newUsersThisMonth;
          newCardDetails[2].value = res.data?.data?.totalGems;
          newCardDetails[3].value = res.data?.data?.gemsListed;
          newCardDetails[4].value = res.data?.data?.totalOrders;
          newCardDetails[5].value = res.data?.data?.completedOrders;
          newCardDetails[6].value = Number(
            res.data?.data?.averageOrderValue
          ).toFixed(2);
          newCardDetails[7].value = res.data?.data?.totalRevenue;
          newCardDetails[8].value = res.data?.data?.pendingOrders;
          newCardDetails[9].value = res.data?.data?.revenueThisMonth;
          return newCardDetails;
        });
      } catch (err) {
        toast.error("Failed to fetch data");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loggedinUser?.role !== "admin" ? (
        <Unauthorized />
      ) : (
        <div className="relative top-20 mb-20 bg-main text-white min-h-screen p-8">
          <div className="flex justify-center items-center h-20 w-full flex-col mb-4 ">
            <MdSpaceDashboard className="text-primary w-10 h-10 lg:w-20 lg:h-20" />
            <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12 md:w-10/12  gap-x-2 mt-2">
              <div className="flex-grow border-t-4 border-primary"></div>
              <span className="font-bold max-sm:text-3xl sm:text-3xl text-primary">
                Dashboard
              </span> 
              <div className="flex-grow border-t-4 border-primary"></div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 auto-rows-auto gap-4 ">
              {cardDetails.map((card, index) => (
                <div key={index} className="md:h-40 h-32">
                  <DashboardCard card={card} />
                </div>
              ))}
              <div className="md:row-span-2 col-span-2 md:col-span-3 rounded-lg">
                <DashboardLine />
              </div>
              <div className="bg-card !border-purple-700 col-span-2 md:col-span-2 row-span-1 rounded-lg p-4">
                <BarGraph data={barGraphData} />
              </div>
              <div className="bg-card !border-purple-700 col-span-2 md:col-span-2 row-span-1 rounded-lg p-4">
                <PieChart />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default page;
