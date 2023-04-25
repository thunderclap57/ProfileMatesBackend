const details = require("../models/DetailsModel");

const addDetails = async (req, res) => {
     const { id } = req.params;
     const { userId, name, email, phone, dob, image, awards, linkedIn, certifications, gitHub, hackerRank, skills, education, languages_known, references, projects } = req.body;
     try { 
        const user = await details.findOneAndUpdate({ userId: userId }, 
        { name, email, phone, dob, image, awards, linkedIn, certifications, gitHub, hackerRank, skills, education, languages_known, references, projects }, 
        { new: true, upsert: true }); 
        res.json({message:'Updated!'}); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
};


const getDetails= async(req,res)=>{
   // const id=req.body;
   // const query = { userId: "6442316ae9046aeb84b8dd8dd" };
    console.log(req.body.userId);
     try{
        const data = await details.findOne({userId: req.body.userId});
        res.send(data)
        console.log(data);
    }catch(error){
        res.status(404).json({message: error.message})
    }};

// const updateUser = async (req, res) => {
//   try {
//     const user = await Details.findById(req.user._id);
//     if (user) {
//       const { firstName, lastName, email, phone, age } = req.body;
//       user.firstName = firstName;
//       user.lastName = lastName;
//       user.email = email;
//       user.phone = phone;
//       user.age = age;
//       await Details.save();
//       res.status(202).send({
//         status: true,
//         message: "User updated succesfully!",
//       });
//     } else {
//       res.status(404).send({
//         status: false,
//         message: "User not found!",
//       });
//     }
//   } catch (err) {
//     res.status(500).send({
//       status: false,
//       message: err.message,
//     });
//   }
// };


module.exports = {
  addDetails,
  getDetails,
 // updateUser,
};
