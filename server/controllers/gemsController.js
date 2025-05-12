const Gem = require("../models/Gem");
const Img = require("../models/Img");
const User = require("../models/User");

exports.uploadGem = async (request, response) => {
    // console.log("BODY:", request.body);
    // console.log("FILES:", request.files);


    try {
        console.log(JSON.stringify(request.files));
        const image = request.files["image"]?.[0]?.path;
        const coverImage = request.files["coverImage"]?.[0]?.path;
        const moreImages = request.files["moreImages"]?.map((f) => ({
            path: f.path,
        }));

        console.log(request)
        let payload = { ...request.body, image, coverImage, moreImages,isListed:true };

        // console.log(payload);

        const gem = await Gem.create(payload, {
            include: [{ model: Img, as: "moreImages" }],
        });

        return response.status(201).json({
            status: "success",
            data: gem,
        });
    } catch (err) {
        console.error("Error Details:", err.message, err.stack);
        return response.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAllGems = async (request, response) => {
    try {
        let { page, sortBy } = request.query;

        console.log(" !!!!!!!!!! PAGE SORTBY !!!!!!", page, sortBy);

        const limit = 16; 
        page = parseInt(page) || 1;
        sortBy = sortBy || "createdAt";

        const skip = (page - 1) * limit;

        const totalGems = await Gem.count({
            where: { isDeleted: false },
        });

        const totalPages = Math.ceil(totalGems / limit);

        const gems = await Gem.findAll({
            where: { isDeleted: false },
            offset: skip,
            limit: limit,
            order: [[sortBy, "ASC"]],
            attributes: ["id", "name", "price", "description", "image"],
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["name"],
                },
            ],
        });

        if (gems.length === 0) {
            return response.status(404).json({
                status: "fail",
                message: "Gems not found!",
            });
        }

        return response.status(200).json({
            status: "success",
            data: {
                currentPage: page,
                totalPages: totalPages,
                gems: gems,
            },
        });
    } catch (err) {
        return response.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getGemByID = async (request, response) => {
    try {
        const { productID } = request.params;
        const gem = await Gem.findByPk(productID, {
            include: [
                { model: User, as: "owner", attributes: ["userId", "name"] },
                { model: Img, as: "moreImages", attributes: ["path"] },
            ],
        });

        if (!gem) {
            return response.status(404).json({
                status: "failure",
                message: "Gem not found!",
            });
        }

        return response.status(200).json({
            status: "success",
            gem,
        });
    } catch (err) {
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};

exports.deleteGem = async (request, res) => {
    try {
        let { id } = request.params;
        id = +id;

        const result = await Gem.update(
            { isDeleted: true },
            { where: { id } }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Gemstone not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Gemstone marked as deleted successfully",
        });
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "failed",
            message: e.message,
        });
    }
};


exports.updateGem = async (req,res) =>{
    try{

        const {body}= req
        const {id} = req.params
        console.log(body)
        const result = await Gem.update({
            ...body
        },{
            where:{
                id
            }
        })

        console.log(result)

        res.status(200).json({
            status:"Success",
            message:"Data Updated Successfully",
            data: result
        })

    }
    catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
}


exports.getGemByUser = async (req, res) => {
    try {
        const id = +req.params.id;

        const result = await Gem.findAll({
            where: {
                userId: id,
                isDeleted: false,
            },
        });

        res.status(200).json({
            status: "success",
            data: result,
        });
    } catch (e) {
        res.status(404).json({
            status: "failed",
            message: e.message,
        });
    }
};

exports.getGemsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!["trending", "highvolume"].includes(category)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid category. Must be 'trending' or 'highvolume'.",
            });
        }

        const gems = await Gem.findAll({
            where: {
                category,
                isDeleted: false,
            },
            attributes: ["id", "name", "price", "description", "image", "category"],
            include: [
                {
                    model: User,
                    as: "owner",
                    attributes: ["name"],
                },
            ],
        });

        if (gems.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: `No gems found in '${category}' category.`,
            });
        }

        res.status(200).json({
            status: "success",
            data: gems,
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message,
        });
    }
};
