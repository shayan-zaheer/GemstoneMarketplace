const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let publicIdPrefix = `user_${req.user?.userId || Date.now()}`;

        return {
            folder: "gemvault",
            allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
            resource_type: "auto",
            public_id: `${publicIdPrefix}_${Date.now()}`,
        };
    },
});

const upload = multer({ storage: storage });

module.exports = {cloudinary, upload};
