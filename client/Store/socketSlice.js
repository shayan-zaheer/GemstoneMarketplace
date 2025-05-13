import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socketInstance = null;

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
        isConnected: false,
    },
    reducers: {
        initSocket: (state, action) => {
            if (!socketInstance) {
                socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
                    transports: ["websocket"],
                    withCredentials: true,
                });

                socketInstance.on("connect", () => {
                    console.log("Socket connected:", socketInstance.id);
                });
            }

            state.socket = socketInstance;
            state.isConnected = true;
        },

        disconnectSocket: (state) => {
            if (socketInstance) {
                socketInstance.disconnect();
                socketInstance = null;
            }

            state.socket = null;
            state.isConnected = false;
        },
    },
});

export const { initSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice;
