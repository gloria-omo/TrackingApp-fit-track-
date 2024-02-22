const clientModel = require("../models/clientModel");
const userModel = require("../models/userModel");
const membershipId = require("../helpers/getUserId")
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');

// const planModel = require("../models/planModel");


exports.createClient = async (req,res)=>{
    try{
        const id = req.user.userId;
        const { fullName, plan} = req.body;
        if(!id){
            return res.status(400).json({
                message: "You are not Log-in"
            })
        };
     
        if(!plan){      
       const user = await clientModel.create({
        fullName,
        membershipId:membershipId,
        status: false
       });
       user.userId = id 

       await user.save()

       return res.status(200).json({
        message:"user created successfully",
        data:user
       })
        }

       const user = await clientModel.create({
        fullName,
        membershipId:membershipId,
        plan,
        status:  true,
        PlanStartDate : Date.now()
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




exports.batchOnboard = async (req, res) => {
    try {
        const id = req.user.userId
        const usersData = req.body; // Assuming an array of user data is sent in the request body
        console.log(usersData);

        // Validate data
        if ( usersData.length === 0) {
            return res.status(404).json({
                 message: 'please fill in the fields' 
                });
        }
        if(!Array.isArray(usersData)){
            return res.status(404).json({
                message: 'invaild data format' 
               }); 
        }

        // Process data in batches
        for (const userData of usersData) {
            const { fullName, plan } = userData;

            // Validate user data
            if (!fullName) {
                console.error('Skipping user data due to missing fields:', userData);
                continue; // Skip this user and proceed to the next one
            }
            const membershipId = uuidv4 

            // Create user
            if(!plan){
            const newUser = await clientModel.create({ 
                fullName,
                membershipId,
                status: false
            });
             newUser.userId = id
            await newUser.save();

           return res.status(201).json({ 
                message: 'Batch onboarding successful' 
            });
        }

        const user = await clientModel.create({
            fullName,
            membershipId,
            plan,
            status:  true,
            PlanStartDate : Date.now()
           })
    
           user.userId = id 
    
           await user.save()

        }
        res.status(201).json({ 
            message: 'Batch onboarding successful' 
        });


       
    } catch (error) {
        console.error('Error during batch onboarding:', error);
        res.status(500).json({
             error: 'Internal server error' 
            });
    }
};





exports.getAll = async(req,res)=>{
    try{
        const id = req.user.userId;
        const allUser = await clientModel.find({userId:id});
        // console.log(allUser)
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

exports.getOne = async(req,res)=>{
    try{
        const id = req.params.id
    const oneUser = await clientModel.find(id)

    res.status(200).json({
        messsage: `user with email ${email} has been found`,
        data: oneUser

    })
}catch(error){
res.status(404).json({
    error:error.message
})
}
}
 

exports.createPlan = async(req,res)=>{
    try{
     const id = req.params.id;
    const {plan} = req.body;

    const user = await clientModel.findById(id)

    user.plan = plan;

    await user.save()

    // const userPlan = await clientModel.create({plan});

    res.status(200).json({
        message: "Plan created"
    })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}



// // Calculate remaining days for a plan
// exports.calculateRemainingDays = async (req, res) => {
//     try {

//         const id = req.params.id;
//         const client = await clientModel.findOne({ id });
//         if (!client) {
//             return res.status(404).json({ 
//                 message: "Client not found"
//              });
//         }
//         if (!client.PlanStartDate || !client.plan) {
//             return res.status(400).json({ message: "Plan start date or plan not set for the client" });
//         }
        
//         function getDaysSinceRegistration(registrationDate) {
//             const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
//             const currentDate = new Date();
//             const diffDays = Math.round(Math.abs((currentDate - registrationDate) / oneDay));
//             return diffDays;
//         };
//         const daySinceSignUp = getDaysSinceRegistration(client.PlanStartDate)

//         const planDurationInDays = {
//             "1Month": 30,    
//             "2Month": 60,
//             "3Month": 90
//         };
//         const startDate = new Date(client.PlanStartDate);
//         const endDate = new Date(startDate.getDate() + planDurationInDays[client.plan] * daySinceSignUp);
//         const remainingDays = Math.ceil(Math.abs((endDate - new Date()) / daySinceSignUp));
//         res.status(200).json({ 
//             message: `Remaining days for the plan: ${remainingDays}`, remainingDays 
//         });
//         console.log(`Remaining days for the plan: ${remainingDays}`, remainingDays );
//     } catch (error) {
//         res.status(500).json({ 
//             error: error.message
//          });
//     }
// };
        

exports.calculateRemainingDays = async (req, res) => {
    try {
        const id = req.params.id;
        const client = await clientModel.findById(id );
        
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        if (!client.PlanStartDate || !client.plan) {
            return res.status(400).json({ message: "Plan start date or plan not set for the client" });
        }
        
        function getDaysSinceRegistration(registrationDate) {
            const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
            const currentDate = new Date();
            const diffDays = Math.round(Math.abs((currentDate - registrationDate) / oneDay));
            return diffDays;
        };

        const daysSinceSignUp = getDaysSinceRegistration(new Date(client.PlanStartDate));

        const planDurationInDays = {
            "1Month": 30,    
            "2Month": 60,
            "3Month": 90
        };

        const planDuration = planDurationInDays[client.plan];
        const endDate = new Date(client.PlanStartDate);
        endDate.setDate(endDate.getDate() + planDuration * daysSinceSignUp);

        const remainingDays = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        
        res.status(200).json({ 
            message: `Remaining days for the plan: ${remainingDays}`, 
            remainingDays 
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message
         });
    }
};




// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Get all clients with active plans
        const clients = await clientModel.find({ status: true, plan: { $ne: null } });

        // Loop through each client
        for (const client of clients) {
            const planDurationInDays = {
                "1Month": 30,    
                "2Month": 60,
                "3Month": 90
            };

            // Calculate end date of plan
            const planStartDate = new Date(client.PlanStartDate);
            const planDuration = planDurationInDays[client.plan];
            const endDate = new Date(planStartDate.getTime() + planDuration * 24 * 60 * 60 * 1000);

            // Check if current date exceeds end date
            const currentDate = new Date();
            if (currentDate > endDate) {
                // Update client's plan status to false, plan to null, and PlanStartDate to null
                await clientModel.findByIdAndUpdate(client._id, {
                    status: false,
                    plan: null,
                    PlanStartDate: null
                });
            }
        }
        console.log('Cron job executed successfully');
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});


exports.deleteUser = async(req,res)=>{
   try{
    const id = req.params.id;
    const user = await clientModel.findByIdAndDelete(id);

    res.staus(200).json({
        message:"User deleted successfully"
    })


   }catch(error){
  res.status(500).json({
    error:error.message
  })
   }

}
