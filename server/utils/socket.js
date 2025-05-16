const { Server } = require("socket.io");
const sharedSession = require("express-socket.io-session");
const sessionMiddleware = require("../middlewares/session");

let clients = new Map();
let io = null;

function initializeSocket(server) {
    console.log("Initializing Socket.io...");
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            credentials: true,
        },
    });

    io.use(
        sharedSession(sessionMiddleware, {
            autoSave: true,
        })
    );

    io.on("connection", (socket) => {
        const userId = socket.handshake.session?.passport?.user;

        console.log("Session:", socket.handshake.session);
        console.log("Connected userId:", userId);

        if (userId) {
            clients.set(userId.toString(), socket.id);
        }

        socket.on("disconnect", () => {
            for (const [key, value] of clients.entries()) {
                if (value === socket.id) {
                    clients.delete(key);
                    break;
                }
            }
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error(
            "Socket.io not initialized. Call initializeSocket(server)."
        );
    }
    return io;
}

function getClients() {
    return clients;
}

module.exports = { initializeSocket, getIO, getClients };
