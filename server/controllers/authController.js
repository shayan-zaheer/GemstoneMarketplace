const passport = require("passport");
const User = require("../models/User");
const { upload } = require("../utils/multer");
const { Sequelize } = require("sequelize");

exports.signUp = async (request, response) => {
    try {
        await new Promise((resolve, reject) => {
            upload.single("profileImage")(request, response, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const { email, ...rest } = request.body;

        const profileImage = request.file ? request.file.path : null;
        const user = await User.create({ ...rest, email, profileImage });

        return response.status(201).json({
            status: "success",
            user,
        });
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            const messages = error.errors.map((err) => {
                const field = err.path;
                return `A user with this ${field} already exists.`;
            });
            return response.status(400).json({ message: messages.join(" ") });
        }
        console.error("Signup Error:", error);
        return response.status(500).json({
            status: "failure",
            message: error.message || "Internal Server Error",
        });
    }
};

exports.login = (request, response, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err)
            return response
                .status(500)
                .json({ status: "fail", message: "Server error" });

        if (!user)
            return response
                .status(401)
                .json({ status: "fail", message: "Invalid credentials" });

        request.logIn(user, (err) => {
            if (err)
                return response
                    .status(500)
                    .json({ status: "fail", message: "Login failed" });

            response.status(200).json({
                status: "success",
                message: "Login successful",
                user,
            });
        });
    })(request, response, next);
};

exports.logout = (request, response) => {
    request.logout(() => {
        response
            .status(200)
            .json({ status: "success", message: "Logged out!" });
    });
};
