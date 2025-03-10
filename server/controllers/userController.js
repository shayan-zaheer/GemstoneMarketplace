const Gem = require("../models/Gem");
const User = require("../models/User");

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