const passport = require("passport");
const User = require("../models/User");
const {upload} = require("../utils/multer");

exports.signUp = async (request, response) => {
    try {
        // const existingUser = await User.findOne({where: { email: request.body?.email }});
        // if (existingUser) return response.status(400).json({ message: "Email already in use" });
        console.log(request.body);

        await new Promise((resolve, reject) => {
            upload.single("profileImage")(request, response, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        const profileImage = request.file ? request.file.path : null;
        const payload = { ...request.body, profileImage };
        const user = await User.create(payload);

        return response.status(201).json({
            status: "success",
            user,
        });
    } catch (err) {
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message,
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
                user: {
                    id: user.userId,
                    email: user.email,
                },
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
