"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function page() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    const loggedinUser = useSelector((store) => store.user.user);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          if (!loggedinUser || !loggedinUser.userId) return;
  
          const res = await axios.get(
            `http://localhost:8000/buy/order/bId/${loggedinUser.userId}`,
            {
              withCredentials: true,
            }
          );
          console.log(res.data)
          setOrders(res.data.data);
        } catch (err) {
            if(+err.status ==404){
                return
            }
          setError("Failed to fetch orders.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, [loggedinUser]);
  
    return (
      <div className="min-h-screen px-4 py-6 text-white flex flex-col items-center bg-[#1a1a1a]">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
  
        {loading ? (
          <p className="text-lg">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders?.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="w-full max-w-4xl grid gap-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-[#2a2c2f9f] p-4 rounded-lg shadow-md border border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order ID:</span>
                  <span className="text-sm text-gray-400">{order.orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Gem:</span>
                  <span>{order.Gem?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Price:</span>
                  <span>${order.Gem?.price || "N/A"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Payment Status:</span>
                  <span>{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Transaction ID:</span>
                  <span>{order.transactionId || "Pending"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Transaction Timestamp:</span>
                  <span>{order.createdAt || ""}</span>
                  
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Last Updated At:</span>
                  <span>{order.updatedAt || ""}</span>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default page