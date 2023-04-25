const user = require("../models/user");
const userOTPVerification = require("../models/userOTPVerficationModel");
const Details=require("../models/DetailsModel");

const bcrypt=require("bcrypt");
const nodemailer=require("nodemailer");
let transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
      user:"student407@milagrescollegekallianpur.edu.in",
      pass: "xbxhknhcfmfaffbq", 
    },
  });  

 const login= async(req,res)=>{
    const {email,password}=req.body
    const userEmail=await user.findOne({email})
    const pasMatch=await bcrypt.compare(password,userEmail.password)
    if(pasMatch){
      res.status(200).send({
        status:true,
        message:"Login Successful!"
      });
    }else{
      res.status(401).send({
        status: false,
        message: "Credentials not matching :( "
      });
    }
  };
  
const signUp=(req, res) => {
    //destructuring- extracting values from an object and assiging them varaibles
    let{email,password}=req.body
     if (email === "" || password === "") {
        res.status(500).json({
        status: "failed!",
        message: "Enter all the details",
     });
    }else if (password.length<8) {
      res.status(500).json({
             status: "failed",
             message: "password too short",
     });
    }
    user.find({email: email}).then((result)=>{
     // console.table(result)
      if(result===null){
        res.json({
          status:"FAILED",
          message: "User with the provided email already exists",
        });
      }else{
        const saltrounds=10;
        bcrypt.hash(req.body.password,saltrounds,(err,hash)=>{
          if (err) {
            res.status(401).json({
              error: err,
              mesage: "Problem while hashing",
            });
          } else {
            const users = new user({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              verified: false,
        });
        users.save().then((req)=>{
              sendOTPVerificationEmail(req,res)
              console.log(res)
            })
             .catch((error)=>{
            console.log(error);
            res.status(400).json({
            error: error,
              //   res.status(400).json({
              //  status:"FAILED",
              //  message:"An error occured while saving user account!",
              })
             })       
         }
      })
      } 
    })
  }
  
  const sendOTPVerificationEmail=async({id,name, email},res)=>{
    try{
      var otp = "";
      const randomchar =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 5; i++) {
        otp += randomchar.charAt(Math.random() * randomchar.length);
        }
  
      //mail options
      const mailOptions={
        from: "student407@milagrescollegekallianpur.edu.in",
        to: email,
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
      }
  
      //hash the otp
      const saltrounds=10;
      const hashedOTP=await bcrypt.hash(otp,saltrounds);
      const newOTPVerification= new userOTPVerification({
        userId:id,
        otp:hashedOTP,
        name: name,
        email: email,
        createdAt: Date.now(),
        expiresAt:Date.now()+3600000,     
      })
  
      //save otp record
      await newOTPVerification.save();
      await transporter.sendMail(mailOptions);
      res.json({
        status:"PENDING",
        message:"Verification otp email sent",
        data:{
          userId:id,
          email,
        }
      })
    }catch(error){
      res.json({
        status:"FAILED",
        message:error.message,
      })        
    }   
  };
  
 const verifyOTP= async (req, res) => {
    try {
      let { userId, otp } = req.body;
      let hashedOTP = "";
      let email = "";
      let uName = "";
      let { expiresAt } = [];
      if (!userId || !otp) {
        throw Error("Empty OTP");
      } else {
        const userOTPVerificationRecord  = await userOTPVerification.find({ userId});
       //doubt
        if (userOTPVerificationRecord === null ) {
          throw new Error("Account doesnt exists or user signed up already");
        } else {
          expiresAt = userOTPVerificationRecord[0];
          hashedOTP = userOTPVerificationRecord[0].otp;
          email = userOTPVerificationRecord[0].email;
          uName = userOTPVerificationRecord[0].name;
        }
        if (expiresAt != null && expiresAt < Date.now()) {
          await userOTPVerification.deleteMany({ userId });
          throw new Error("code expired");
        } else {
          const validOtp = await bcrypt.compare(otp, hashedOTP);
          if (!validOtp) {
            throw new Error("Invalid code passed"); 
          } else {
            //success
            await user.updateOne({ id: userId }, { verified: true });
            const newDetails = new Details({
              userId: userId,
              name: uName, 
              email: email,
            });
            newDetails.save();
            const mail = {
              from: "student407@milagreskallianpur.edu",
              to: email,
              subject: "Email verification",
              html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
        
              <h2>Welcome to <span style="color: green;"> <img src="https://media.tenor.com/_bRpTU5IlMYAAAAM/contract-official.gif" alt="My_Logo"/>PROFILE MATES</span> .</h2>
              <h4>You officially signed up ✔</h4>
              <p style="margin-bottom: 30px;"><span style ="color:blue">Successfully Verified!</span> Thankyou for Signing up!</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;"></h1>
         </div>
          `,
            };
            await transporter.sendMail(mail);
            await userOTPVerification.deleteMany({ userId });
            const message="Verified!";
            res.status(200).json({userId,message});
          }
        }
      }
    } catch (err) {
      console.log(err)
      res.status(403).json({
        status: err,
        message: err.mesage,
      });
    }
  };

  module.exports={
    login,
    signUp,
    verifyOTP,
  };
  