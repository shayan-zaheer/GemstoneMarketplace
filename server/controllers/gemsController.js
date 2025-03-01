const Gem = require("../models/Gem");

exports.uploadGem = async(request, response) => {
    try{
        const { name, image, coverImage, owner, price, description  } = request.body;
        const gem = await Gem.create({name, image, owner, price, coverImage, description});

        return response.status(201).json({
            status: "success",
            gem
        });
    } catch(err){
        return response.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getAllGems = async(request, response) => {
    try{
        let { page, sortBy } = request.query;

        console.log(" !!!!!!!!!! PAGE SORTBY !!!!!!", page, sortBy)

        const limit = 16; // set by muneer noob
        page = parseInt(page) || 1;
        sortBy = sortBy || "createdAt";

        const skip = (page - 1) * limit;

        const totalGems = await Gem.count();
        const totalPages = Math.ceil(totalGems / limit);

        const gems = await Gem.findAll({
            offset: skip,
            limit: limit,
            order: [
                [sortBy, 'ASC']
            ]
        });

        if (gems.length === 0) {
            return response.status(404).json({
                status: 'fail',
                message: 'Gems not found!'
            });
        }

        return response.status(200).json({
            status: "success",
            data: {
                currentPage: page,
                totalPages: totalPages,
                gems: gems
            }
        });
    } catch(err){
        return response.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getGemByID = async(request, response) => {
    try{
        const {productID} = request.params;
        const gem = await Gem.findByPk(productID);

        if(!gem){
            return response.status(404).json({
                status: "failure",
                message: "Gem not found!"
            });
        }

        return response.status(200).json({
            status: "success",
            gem
        });
    } catch(err){
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message
        });
    }
}