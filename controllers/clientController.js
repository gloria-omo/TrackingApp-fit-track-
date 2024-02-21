const clientModel = require("../models/clientModel");
const userModel = require("../models/userModel");
// const planModel = require("../models/planModel");


exports.createClient = async (req,res)=>{
    try{
        const id = req.user.userId;
        const { fullName, plan} = req.body;
        if(!id){
            return res.status(400).json({
                message: "You are not Log-in"
            })
        }

       const user = await clientModel.create({
        fullName,
        plan,
        status: (plan) ? true : false
       })

       user.userId = id 

       await user.save()

       res.status(200).json({
        message:"user created successfully",
        data:user
       })

    }catch(error){
        res.status(500).json({
            // error:`unable to sign-up ${error.message}`
            error: error.message
        })
    }
}



exports.getAll = async(req,res)=>{
    try{
        const id = req.user.userId;
        const allUser = await clientModel.find({userId:id});
        console.log(allUser)
        if(allUser.length === 0){
            return res.status(200).json({
                message:"You have no user yet"
            })
        }
        res.status(200).json({
            message:`There are ${allUser.length} user `,
            totalNumber:`${allUser.length}`,
            data:allUser
        })

    }catch(error){
        res.status(500).json({
           error:`${error.message}` 
        })
    }
}

exports.getOne = async (req,res)=>{
    try{

    }catch(error){
        res.status(200).json({
            message:error.message
        })
    }
}
 

exports.creatPlan = async(req,res)=>{
    try{
     const id = req.params.id;
    const {plan} = req.body;

    const user = await clientModel.findById(id)

    user.plan = plan;

    user.save()

    // const userPlan = await clientModel.create({plan});

    res.status(200).json({
        message: "Plan created"
    })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getOne = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            messsage : error.message
        })
    }
}


// Calculate remaining days for a plan
exports.calculateRemainingDays = async (req, res) => {
    try {

        const userId = req.params.id;
        const client = await clientModel.findOne({ userId });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        if (!client.planStartDate || !client.plan) {
            return res.status(400).json({ message: "Plan start date or plan not set for the client" });
        }
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const planDurationInDays = {
            "1Month": 30,
            "2Month": 60,
            "3Month": 90
        };
        const startDate = new Date(client.planStartDate);
        const endDate = new Date(startDate.getTime() + planDurationInDays[client.plan] * millisecondsPerDay);
        const remainingDays = Math.ceil((endDate - new Date()) / millisecondsPerDay);
        res.status(200).json({ message: `Remaining days for the plan: ${remainingDays}`, remainingDays });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
        