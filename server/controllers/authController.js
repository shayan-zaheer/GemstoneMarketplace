const passport = require("passport");
const User = require("../models/User");
const { upload } = require("../utils/multer");

exports.signUp = async (request, response) => {
    try {
        await new Promise((resolve, reject) => {
            upload.single("profileImage")(request, response, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const { email, ...rest } = request.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return response.status(400).json({ message: "Email already in use" });
        }

        const profileImage = request.file ? request.file.path : null;
        const user = await User.create({ ...rest, email, profileImage });

        return response.status(201).json({
            status: "success",
            user
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return response.status(500).json({
            status: "failure",
            message: err.message || "Internal Server Error"
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
                user
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