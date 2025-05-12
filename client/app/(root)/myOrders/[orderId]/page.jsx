"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Link from "next/link";
import { FaBoxOpen, FaStar } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { orderly } from "viem/chains";

const OrderDetailsPage = ({ params }) => {
    const { orderId } = use(params);
    const loggedinUser = useSelector((store) => store.user.user);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(null);
    const [isMarkingReceived, setIsMarkingReceived] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                if (!loggedinUser?.userId) {
                    toast.error("You need to log in first!");
                    return;
                }

                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/order/${orderId}`,
                    { withCredentials: true }
                );

                if (data.status === "success") {
                    setOrder(data.data);
                } else {
                    throw new Error(
                        data.message || "Failed to fetch order details"
                    );
                }
            } catch (err) {
                setError(err.message || "Failed to fetch order details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId, loggedinUser]);

    const handleMarkAsReceived = async () => {
        try {
            setIsMarkingReceived(true);
            const { data } = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/verify/${orderId}`,
                {},
                { withCredentials: true }
            );

            if (data.status === "success") {
                console.log(data)
                toast.success("Order marked as received!");
                setOrder(data.data);
            } else {
                throw new Error(
                    data.message || "Failed to update order status"
                );
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to mark as received.");
        } finally {
            setIsMarkingReceived(false);
        }
    };

    const handleReviewSubmit = async () => {
        try {
            if (!rating) {
                toast.error("Please select a rating");
                return;
            }

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/buy/review/${orderId}`,
                { rating, comment: reviewText },
                { withCredentials: true }
            );
            console.log(data)
            if (data.status === "success") {
                toast.success("Review submitted successfully!");
                setOrder((prev) => ({
                    ...prev,
                    Review: data.data.review || data.data,
                }));
                console.log(order)
                setShowReviewForm(false);
                setReviewText("");
                setRating(null);
            }

        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Error submitting review"
            );
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)] bg-[#1a1c1ff8]">
                <Loader loading={loading} />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)] text-red-500 text-xl">
                {error || "Order not found"}
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen pb-20 bg-[#1a1c1ff8]">
            <div className="grid md:grid-cols-[1fr_2fr] gap-0 min-h-[calc(100vh-8rem)]">
                {/* Left Panel - Order Details */}
                <motion.div
                    initial={{ x: -600 }}
                    animate={{ x: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto p-5 md:pl-12 md:pr-8"
                >
                    <h1 className="bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] text-transparent bg-clip-text text-4xl md:text-6xl font-bold">
                        Order Details
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-white text-xl font-semibold">
                            Order ID:
                        </span>
                        <span className="text-gray-300 text-lg">
                            {order.orderId}
                        </span>
                    </div>

                    {/* Buyer & Seller Information */}
                    <div className="mt-6 bg-[#2a2c2f9f] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                            <FaUserCircle className="text-purple-400 text-xl" />
                            <h2 className="text-purple-400 font-semibold text-2xl">
                                Buyer & Seller Information
                            </h2>
                        </div>
                        <div className="pl-2">
                            <div className="mb-3">
                                <span className="text-white font-medium">
                                    Buyer:
                                </span>
                                <Link href={`/user/${order?.buyerId}`}>
                                    <div className="flex items-center mt-1">
                                        <span className="text-blue-400 hover:underline">
                                            {order.Buyer?.name ||
                                                loggedinUser?.name ||
                                                "N/A"}
                                        </span>
                                        {order?.buyerId ===
                                            loggedinUser?.userId && (
                                            <span className="ml-2 text-xs bg-blue-500 px-2 py-0.5 rounded-full text-white">
                                                You
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-3">
                                <span className="text-white font-medium">
                                    Seller:
                                </span>
                                <Link href={`/user/${order?.sellerId}`}>
                                    <div className="flex items-center mt-1">
                                        <span className="bg-gradient-to-r to-[#00E8FC] via-[#D400A5] from-[#6A00F4] text-transparent bg-clip-text hover:underline">
                                            {order?.Seller?.name || "N/A"}
                                        </span>
                                        {order?.sellerId ===
                                            loggedinUser?.userId && (
                                            <span className="ml-2 text-xs bg-purple-500 px-2 py-0.5 rounded-full text-white">
                                                You
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Purchased Item */}
                    <div className="mt-6 bg-[#2a2c2f9f] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                            <FaBoxOpen className="text-blue-400 text-xl" />
                            <h2 className="text-blue-400 font-semibold text-2xl">
                                Purchased Item
                            </h2>
                        </div>
                        <div className="pl-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-white font-medium">
                                    Gem:
                                </span>
                                <Link href={`/product/${order.Gem?.id}`}>
                                    <span className="text-blue-400 hover:underline">
                                        {order.Gem?.name || "N/A"}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-white font-medium">
                                    Price:
                                </span>
                                <span className="text-white">
                                    {order.Gem?.price || "N/A"} PKR
                                </span>
                            </div>
                            {order.Gem?.description && (
                                <div className="mt-3">
                                    <span className="text-white font-medium">
                                        Description:
                                    </span>
                                    <p className="text-slate-300 text-sm italic mt-1">
                                        {order.Gem.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="mt-6 bg-[#2a2c2f9f] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                            <MdPayment className="text-green-400 text-xl" />
                            <h2 className="text-green-400 font-semibold text-2xl">
                                Payment Information
                            </h2>
                        </div>
                        <div className="pl-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-white font-medium">
                                    Status:
                                </span>
                                <span
                                    className={`font-semibold ${
                                        order.paymentStatus === "completed"
                                            ? "text-green-400"
                                            : order.paymentStatus === "pending"
                                            ? "text-yellow-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    {order.paymentStatus}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-white font-medium">
                                    Transaction ID:
                                </span>
                                <span className="text-gray-300">
                                    {order.transactionId || "Pending"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Action Section */}
                    {<div className="mt-5">
                        {!order.isReceived ? (
                            <button
                                onClick={handleMarkAsReceived}
                                disabled={isMarkingReceived}
                                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                                    isMarkingReceived
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {isMarkingReceived
                                    ? "Processing..."
                                    : "Mark as Received"}
                            </button>
                        ) : (
                            <>
                                {!order.Review ? (
                                    <>
                                        {!showReviewForm ? (
                                            <button
                                                onClick={() =>
                                                    setShowReviewForm(true)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Give Review
                                            </button>
                                        ) : (
                                            <div className="mt-4">
                                                <div className="flex flex-col items-center mb-4">
                                                    <label className="text-white text-lg mb-2">
                                                        How would you rate this
                                                        purchase?
                                                    </label>
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (
                                                                <FaStar
                                                                    key={star}
                                                                    size={28}
                                                                    className={`cursor-pointer mx-1 ${
                                                                        star <=
                                                                        rating
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-400"
                                                                    }`}
                                                                    onClick={() =>
                                                                        setRating(
                                                                            star
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={reviewText}
                                                    onChange={(e) =>
                                                        setReviewText(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Share your experience with this purchase..."
                                                    className="w-full p-3 rounded bg-[#2a2c2f9f] text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                                                    rows={5}
                                                />
                                                <div className="flex gap-3 mt-3">
                                                    <button
                                                        onClick={
                                                            handleReviewSubmit
                                                        }
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Submit Review
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowReviewForm(
                                                                false
                                                            );
                                                            setRating(null);
                                                            setReviewText("");
                                                        }}
                                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="mt-4 bg-[#2a2c2f9f] p-4 rounded-lg border border-gray-700">
                                        <h3 className="text-lg font-semibold text-purple-400 mb-2">
                                            Your Review
                                        </h3>
                                        <div className="flex items-center mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    size={20}
                                                    className={
                                                        star <=
                                                        order.Review.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-400"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mb-2">
                                            {order.Review.comment}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Reviewed on{" "}
                                            {formatDate(order.Review.createdAt)}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>}

                    {/* Order Dates */}
                    <div className="mt-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-white font-medium">
                                Ordered On:
                            </span>
                            <span className="text-blue-400 italic">
                                {formatDate(order.createdAt)}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-white font-medium">
                                Last Updated:
                            </span>
                            <span className="text-gray-300 italic">
                                {formatDate(order.updatedAt)}
                            </span>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-6 mb-10">
                        <Link href="/myOrders">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Back to Orders
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right Panel - Product Image */}
                <motion.div
                    initial={{ x: 600 }}
                    animate={{ x: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="hidden md:block md:relative min-h-[calc(100vh-8rem)]"
                >
                    <div className="sticky top-20 h-[calc(100vh-5rem)] w-full">
                        {order.Gem?.coverImage ? (
                            <img
                                src={order.Gem.coverImage}
                                alt="Gem Image"
                                className="w-full h-full object-cover mask-gradient"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <span className="text-gray-500 text-2xl">
                                    No image available
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;