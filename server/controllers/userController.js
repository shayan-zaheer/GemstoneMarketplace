const Gem = require("../models/Gem");
const User = require("../models/User");
const {cloudinary} = require("../utils/multer");

exports.getUserById = async(request, response) => {
    try{
        const user = await User.findOne({where: {userId: request.params.id}, 
            attributes: ["userId", "name", "residenceAddress", "profileImage", "walletAddress"],
            include: [
                {
                    model: Gem,
                    as: "ownedGemstones",
                    attributes: ["id", "name", "price", "description", "image"],
                    include: [
                        {
                            model: User,
                            as: "owner",
                            attributes: ["name"],
                        }
                    ]
                },
            ],
        });

        if(!user){
            return response.status(404).json({
                status: "failure",
                message: "User not found!"
            });
        }

        return response.status(200).json({
            status: "success",
            user
        });
    } catch(err){
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message
        });
    }
}

exports.updateUser = async (request, response) => {
    const { name, email, password, residenceAddress, contact } = request.body;
    const file = request.file;

    try {
        const user = await User.findByPk(request.params.id);
        if (!user) {
            return response.status(404).json({ status: "failure", message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = password;
        }
        if (residenceAddress) user.residenceAddress = residenceAddress;
        if (contact) user.contact = contact;

        if (file) {
            try {
                if (user.profileImage) {
                    const previousPublicId = user.profileImage
                        .split("/")
                        .slice(-1)[0]
                        .split(".")[0];
                    const fullPublicId = `gemvault/${previousPublicId}`;
                    await cloudinary.uploader.destroy(fullPublicId);
                }

                user.profileImage = request.file.path;
            } catch (error) {
                return response.status(400).json({ status: "failure", message: err.message });
            }
        }

        await user.save();

        return response.status(200).json({ status: "success", message: "User updated successfully" });
    } catch (err) {
        return response.status(400).json({ success: "failure", message: err.message });
    }
};
