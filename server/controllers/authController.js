const { verifyMessage } = require("ethers");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getNonce = async (request, response) => {
    try {
        const nonce = Math.random().toString(36).substring(2);
        const { address } = request.query;

        if (address) {
            await User.upsert({ address, nonce });
        }

        return response.status(200).json({ nonce });
    } catch (err) {
        return response.status(500).json({ status: "error", message: err.message });
    }
};

exports.verifySIWE = async (request, response) => {
    try {
        const { message, signature } = request.body;

        if (!message || !signature) {
            return response.status(400).json({
                status: "fail",
                message: "Missing data",
            });
        }

        const addressMatch = message.match(/Ethereum account:\s*(0x[^\s]+)/);
        const nonceMatch = message.match(/Nonce:\s*(\w+)/);

        const [, address] = addressMatch;
        const [, nonce] = nonceMatch;

        const recoveredAddress = verifyMessage(message, signature);

        if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
            return response.status(401).json({
                status: "fail",
                message: "Invalid signature",
            });
        }

        const user = await User.findOne({ where: { address }, raw: true });
        if (!user || user.nonce !== nonce) {
            return response.status(401).json({
                status: "fail",
                message: "Invalid nonce",
            });
        }

        const token = jwt.sign({ address }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        await User.update({ jwtToken: token }, { where: { address } });

        return response.status(200).json({
            status: "success",
            token,
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.logout = async (request, response) => {
    try {
        const { address } = request.body;
        console.log(address);

        if (!address) {
            return response.status(400).json({
                status: "fail",
                message: "Address required",
            });
        }

        await User.update({ jwtToken: null }, { where: { address } });

        return response.status(200).json({
            status: "success",
            message: "Logged out",
        });
    } catch (err) {
        return response.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};
