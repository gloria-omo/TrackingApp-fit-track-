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
           // generate a random verification code
const verifyToken = () => {
    const digits = '0123456789';
    let uniqueNumber = '';
  
    while (uniqueNumber.length < 4) {
      const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
  
      if (!uniqueNumber.includes(randomDigit)) {
        uniqueNumber += randomDigit;
      }
    }
  
    return uniqueNumber;
  };
       

        if(!plan){      
       const user = await clientModel.create({
        fullName,
        membershipId: parseInt(verifyToken()),
        status: false
       });
       user.userId = id 

       await user.save()

       return res.status(200).json({
        message:"user created successfully",
        data:user
       })
        }

        
//   const PlanStartDate = new Date();
//   const formattedPlanStartDate = `${PlanStartDate.getDate()}/${PlanStartDate.getMonth() + 1}/${PlanStartDate.getFullYear()}`
  
       const user = await clientModel.create({
        fullName,
        membershipId: parseInt(verifyToken()),
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


            // generate a random verification code
const verifyToken = () => {
    const digits = '0123456789';
    let uniqueNumber = '';
  
    while (uniqueNumber.length < 4) {
      const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
  
      if (!uniqueNumber.includes(randomDigit)) {
        uniqueNumber += randomDigit;
      }
    }
  
    return uniqueNumber;
  };
   

            // Create user
            if(!plan){
            const newUser = new clientModel({ 
                fullName,
                membershipId: parseInt(verifyToken()),
                status: false
            });
             newUser.userId = id
            await newUser.save();


           return res.status(201).json({ 
                message: 'Batch onboarding successful' 
            });

        // console.log( parseInt(verifyToken()))
        }

        // const PlanStartDate = new Date();
        // const formattedPlanStartDate = `${PlanStartDate.getDate()}/${PlanStartDate.getMonth() + 1}/${PlanStartDate.getFullYear()}`

        const user = new clientModel({
            fullName,
            membershipId: parseInt(verifyToken()),
            plan,
            status:  true,
            PlanStartDate : Date.now() 
           })
    
           user.userId = id 
    
           await user.save()

        // console.log( parseInt(verifyToken()))

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


exports.getAllActiveMember = async(req,res)=>{
    try{
        const id = req.user.userId;
        const activeUser = await clientModel.find({userId:id,status: true, plan: { $ne: null } });
        // console.log(activeUser)
        if(activeUser.length === 0){
            return res.status(200).json({
                message:"You have no user yet"
            })
        }
        res.status(200).json({
            message:`There are ${activeUser.length} user `,
            totalNumberOfActiveMember:`${activeUser.length}`,
            data:activeUser
        })

    }catch(error){
        res.status(500).json({
           error:`${error.message}` 
        })
    }
}


exports.getAllNonActiveMember = async(req,res)=>{
    try{
        const id = req.user.userId;
        const nonactiveUser = await clientModel.find({userId:id,status: false });
        // console.log(nonactiveUser)
        if(nonactiveUser.length === 0){
            return res.status(200).json({
                message:"You have no user yet"
            })
        }
        res.status(200).json({
            message:`There are ${nonactiveUser.length} user `,
            totalNumberOfNonActiveMember:`${nonactiveUser.length}`,
            data:nonactiveUser
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

    // const PlanStartDate = new Date();
    // const formattedPlanStartDate = `${PlanStartDate.getDate()}/${PlanStartDate.getMonth() + 1}/${PlanStartDate.getFullYear()}`

    const user = await clientModel.findByIdAndUpdate(id,{
        plan:plan,
        PlanStartDate: Date.now(),
        status:true},{new: true})

    // user.plan = plan;

    await user.save()

    // const userPlan = await clientModel.create({plan});

    res.status(200).json({
        message: "Plan created",
        data: user
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
        const clients = await clientModel.findById(id );
        
        if (!client) {
            return res.status(404).json({ 
                message: "Client not found" 
            });
        }

        if (!client.PlanStartDate || !client.plan) {
            return res.status(400).json({
                 message: "Plan start date or plan not set for the client" 
                });
        }
        
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
            console.log("i am client "+client.PlanStartDate )
            console.log("i am plan start "+planStartDate)
            console.log("i am lan duration "+ planDuration)
            console.log("i am end date "+endDate);

         

            // Check if current date exceeds end date
            const currentDate = new Date();
            const remainingDays = endDate - currentDate
            console.log(remainingDays)
            // Calculate the number of days
          const days = remainingDays / (1000 * 60 * 60 * 24);
          console.log(days)

            
        res.status(200).json({ 
            message: `Remaining days for the plan: ${days}`, 
            days 
        });
    } 
}catch (error) {
        res.status(500).json({ 
            error: error.message
         });
    }
};




// Schedule the cron job to run every day at midnight

const scheduler = cron.schedule("* * * * *", async (req,res) => {
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
            console.log("i am client "+client.PlanStartDate )
            console.log("i am plan start "+planStartDate)
            console.log("i am lan duration "+ planDuration)
            console.log("i am end date "+endDate);

         

            // Check if current date exceeds end date
            const currentDate = new Date();
            const remainingDays = endDate - currentDate
            console.log(remainingDays)
            // Calculate the number of days
          const days = remainingDays / (1000 * 60 * 60 * 24);
          console.log(days)

            if (currentDate > endDate) {
                // Update client's plan status to false, plan to null, and PlanStartDate to null
                await clientModel.findByIdAndUpdate(client._id, {
                    status: false,
                    plan: null,
                    PlanStartDate: null
                });
            }
            // return res.status(200).json({
            //     message:`you have ${days} days remaining`
            // })
        }
        
        console.log('Cron job executed successfully');
    } catch (error) {
        console.error('Error in cron job:', error);
    }
});

// Middleware function using the cron job
exports.cronMiddleware = (req, res, next) => {
    // Start the cron job
    scheduler.start();
    // next();
};


exports.deleteUser = async(req,res)=>{
   try{
    const id = req.params.id;
    const user = await clientModel.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({
            message:"user has been deleted or does not exist"
        })
    }

    res.status(200).json({
        message:`${user.fullName} has been deleted successfully`
    })


   }catch(error){
  res.status(500).json({
    error:error.message
  })
   }

}
