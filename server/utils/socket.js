const { Server } = require("socket.io");
const sharedSession = require("express-socket.io-session");
const { sessionMiddleware } = require("../utils/passport");

let clients = new Map();
let io = null;

function initializeSocket(server) {
    console.log("Initializing Socket.io...");
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
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
        const user = socket.handshake.session?.passport?.user;

        if (user) {
            console.log("Authenticated user:", user);
            clients.set(user.toString(), socket.id);
        } else {
            console.log("Unauthenticated socket attempt", socket.id);
        }

        socket.on("disconnect", () => {
            for (const [key, value] of clients.entries()) {
                if (value === socket.id) {
                    clients.delete(key);
                    console.log(`User with ID ${key} has disconnected`);
                    break;
                }
            }
        });
    });
}

function getIO() {
    if (!io) {
        throw new Error(
            "Socket.io is not initialized. Call initializeSocket(server) first."
        );
    }
    return io;
}

function getClients() {
    if (!clients) {
        throw new Error(
            "Clients map is not initialized. Ensure the server has called initializeSocket(server)."
        );
    }
    return clients;
}

module.exports = { initializeSocket, getIO, getClients };
