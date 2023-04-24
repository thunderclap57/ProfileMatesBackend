const forgotPasswordVerify = require("../models/forgotPasswordVerify");
const user = require("../models/user");
const bcrypt=require("bcrypt");
const nodemailer=require("nodemailer");
let transporter=nodemailer.createTransport({
  service: "gmail",
  auth:{
    user:"student407@milagrescollegekallianpur.edu.in",
    pass: "xbxhknhcfmfaffbq", 
  },
});
const checkEmail=async (req, res) => {
    try {
      let {userId,emailID}= req.body;
      const emailCheckRecord  = await user.findOne({id: userId});
      console.log(emailID);
      console.log(emailCheckRecord);
      if (emailCheckRecord == null) {   
        res.status(400).json({
          status: "Failed",
          message: "Email doesnt exist"
      })
      }
      else{
        var otp = "";
        const randomchar =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
          otp += randomchar.charAt(Math.random() * randomchar.length);
          }
        //mail options
        const mailCheck={
          from: "student407@milagrescollegekallianpur.edu.in",
          to: emailCheckRecord.email,
          subject: "Email verification",
          html: `
              <div
                class="container"
                style="max-width: 90%; margin: auto; padding-top: 20px"
              >
          
                <h2>Welcome to <span style="color: green;"> <img src="https://www.shutterstock.com/image-vector/job-profile-logo-design-element-260nw-602927570.jpg" alt="My_Logo"/>PROFILE MATES</span> .</h2>
                <h4>You are officially In ✔</h4>
                <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
                <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
           </div>
            `,
        };
        const saltrounds=10;
        const hashedOTP=await bcrypt.hash(otp,saltrounds);
        const newforgotPasswordVerify= new forgotPasswordVerify({  
            userId:userId,       
            otp:hashedOTP,
            email: emailID,
            createdAt: Date.now(),
            expiresAt:Date.now()+3600000,     
        })
        await newforgotPasswordVerify.save();
        await transporter.sendMail(mailCheck);
  
        res.status(201).json({
          status: "Verified",
          message: "Email Sent",
      })
    }
    }
    catch(err){
    //    console.table(err)
        res.json({
          status: err,
          message: err.mesage,
    })
  }
  }
  
const verifyEmail=async (req, res) => {
    try {
      let { userId, otp } = req.body;
      let hashedOTP = "";
      let email = "";
      let { expiresAt } = [];
      if (!userId || !otp) {
        throw Error("Empty OTP");
      } else {
        const forgotPasswordVerifyRecord  = await forgotPasswordVerify.find({ userId: userId });
        console.log(forgotPasswordVerifyRecord);
       //doubt
  
        if (forgotPasswordVerifyRecord == null ) {
          throw new Error("Account doesnt exists or user signed up already");
        } else {
          userId=forgotPasswordVerifyRecord[0].userId;
          expiresAt = forgotPasswordVerifyRecord[0];
          hashedOTP = forgotPasswordVerifyRecord[0].otp;
          email = forgotPasswordVerifyRecord[0].email;
        }
        console.log(forgotPasswordVerifyRecord)
        if (expiresAt != null && expiresAt < Date.now()) {
          await forgotPasswordVerify.deleteMany({ userId });
          throw new Error("code expired");
        } else {
          const validOtp = await bcrypt.compare(otp, hashedOTP);
          console.log(otp);
          console.log(hashedOTP);
          if (!validOtp) {
            throw new Error("Invalid code passed"); 
          } else {
            //success
            await forgotPasswordVerify.updateOne({ _id: userId }, { verified: true });
            res.status(201).json({
              status: "Verified",
              message: "User Verified",
            });
          }
        }
      }
    } catch (err) {
      console.table(err)
      res.status(403).json({
        status: err,
        message: err.mesage,
      });
    }
  };
  
const checkPassword=async(req,res)=>
  {    
      const {_id,password}=req.body;
      console.log(req.body)
      const saltrounds=10;
      const hashedPassword=await bcrypt.hash(password,saltrounds);
        await user.updateOne({ _id:_id}, { password: hashedPassword}).then((result)=>{
            if(result!=null){
              res.status(200).json({
                status:"DONE",
                message:result
              })
            }
            else{
              res.status(400).json({
                status:"Failed",
                message:"Failed"
              })
            }
        });
  }

  module.exports={
    checkEmail,
    verifyEmail,
    checkPassword,
  }