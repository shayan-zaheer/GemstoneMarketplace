const User = require("../models/User");

exports.createUser = async(request, response) => {
    try{
        const user = await User.create(request.body);

        return response.status(201).json({
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