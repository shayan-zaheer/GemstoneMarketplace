
const Order = require("../models/Order")

exports.approveURL = async(req, res, next) =>{

    const {order_id} = req.body.data.notification.metadata
    try{

        
        console.log(req.body.data.notification.metadata)
        
        
        const resp = await Order.update(
{paymentStatus:req.body.data.notification.state},
{where:{
    orderId: order_id
}}
    )


   console.log("RES",resp)
    
    res.status(200).json({
        data: order_id,
        message:"PAYMENT SUCCESSFUL"
        
    })
}
catch(e){
    console.log(e)
    res.status(400).json({
        data: order_id,
        message:e.message
        
    })
    
}
}

exports.declineURL = async(req,res,next)=>{
    console.log(req.body)
    res.status(400).json({
        data: {...req.body},
        message:"PAYMENT DECLINED"
        
    })
}
exports.cancelURL = async(req,res,next)=>{
    console.log(req.body)
    res.status(400).json({
        data: {...req.body},
        message:"PAYMENT CANCEL"

    })
}