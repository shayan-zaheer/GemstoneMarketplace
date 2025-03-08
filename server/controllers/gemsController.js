const Gem = require("../models/Gem");
const Img = require("../models/Img");
const User = require("../models/User");


// Upload multiple images with different keys


exports.uploadGem = async (req, response) => {
    try {
        
        console.log(JSON.stringify(req.files))
        const image = req.files['image']?.[0]?.path
        const coverImage = req.files['coverImage']?.[0]?.path
        const moreImages = req.files['moreImages'].map(f=>({
           path: f.path}))
        
        
        let payload = {...req.body,image,coverImage,moreImages}
        
            console.log(payload)

        const gem = await Gem.create(payload, {
            include: [{ model: Img, as: "moreImages" }],
        });




        return response.status(201).json({
            status: "success",
            data:gem,
        });
    } catch (err) {
        console.error(err)
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

        const limit = 16; // set by muneer noob
        page = parseInt(page) || 1;
        sortBy = sortBy || "createdAt";

        const skip = (page - 1) * limit;

        const totalGems = await Gem.count();
        const totalPages = Math.ceil(totalGems / limit);

        const gems = await Gem.findAll({
            offset: skip,
            limit: limit,
            order: [[sortBy, "ASC"]],
            attributes:["name","price","description","image"],
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
                { model: User, as: "owner", attributes: ["name"], },
                { model: Img, as: "moreImages", attributes: ["path"], },
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
}

exports.deleteGem = async (req,res)=>{

try{
    let {id} = req.params
id = +id
    const result = await Gem.destroy({
        where:{
            id
        }
    })

 console.log(result)

    res.status(204).json({
        status:"success",
        message:"Gemstone Deleted successfully"
    })

    }
    catch(e){
res.status(400).json({
    status:"failed",
    message:"Gemstone not found"
})
    }
}