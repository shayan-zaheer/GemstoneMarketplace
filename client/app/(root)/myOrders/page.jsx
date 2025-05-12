"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import socket from "@/services/socket";
import { cartActions } from "@/Store/cartSlice";
import Loader from "@/components/Loader";
import Link from "next/link";
import { IoBag } from "react-icons/io5";

function page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loggedinUser = useSelector((store) => store.user.user);

  const fetchOrders = async () => {
    try {
      if (!loggedinUser || !loggedinUser.userId) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/order/bId/${loggedinUser.userId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setOrders(res.data.data);
    } catch (err) {
      if (+err.status == 404) {
        return;
      }
      setError("Failed to fetch orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [loggedinUser]);

  useEffect(() => {
    if (!loggedinUser || !loggedinUser.userId) return;

    const handlePaymentSuccess = () => {
      fetchOrders();
      dispatch(cartActions.clearCart());
    };

    socket.on("paymentSuccess", handlePaymentSuccess);

    return () => {
      socket.off("paymentSuccess", handlePaymentSuccess);
    };
  }, [loggedinUser]);

  return (
    <div className="relative top-20 min-h-screen px-4 py-6 text-white flex flex-col items-center bg-[#1a1a1a]">
      <div className="flex justify-center items-center h-20 w-full flex-col mb-4 ">
        <IoBag className="text-white w-10 h-10 lg:w-20 lg:h-20" />
        <div className=" flex items-center justify-center max-sm:w-11/12 sm:w-9/12 md:w-10/12  gap-x-2 mt-2">
          <div className="flex-grow border-t-4 border-gray-300"></div>
          <span className="font-bold max-sm:text-3xl sm:text-3xl text-white">
            My Orders
          </span>
          <div className="flex-grow border-t-4 border-gray-300"></div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <Loader loading={loading} />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders?.length === 0 ? (
        <p className="text-gray-400">No orders found.</p>
      ) : (
        <div className="w-full max-w-4xl grid gap-4">
          {orders.map((order) => (
            <Link key={order.orderId} href={`/myOrders/${order.orderId}`}>
              <div className="bg-[#2a2c2f9f] p-4 rounded-lg shadow-md border border-gray-700">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
