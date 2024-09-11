import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import usersModel from "../models/UsersModel.js";
import SendEmail from "../utility/emailUtility.js";

export  const  Registration=async (req,res)=>{
   try{
       let reqBody=req.body;
       await  UsersModel.create(reqBody)
       return res.status(201).json({
           status:"Success",message:"User Registered Successfully"
       })
   }
   catch (e) {
       return res.status(500).json({
           status:"fail",message:e.toString()
       })
    }
}


export  const  Login=async (req,res)=>{
    try{
        let reqBody=req.body;
      let data=  await  UsersModel.findOne(reqBody)
       if (data ===null){
            res.json({
                status:"fail",
                message:"User Not Found"
            })
       }else {
        let token= TokenEncode(data['email'],data['_id'])
           return res.status(200).json({
               status:"Success",
               message:"User Login Successfully",
               data:{token:token}}
           )}
    }
    catch (e) {
        return res.status(500).json({
            status:"fail",message:e.toString()
        })
    }
}

export  const  ProfileDetails=async (req,res)=>{
  try{
      let user_id=req.headers['user_id']
      let data =await usersModel.findOne({_id:user_id})
      return res.status(201).json({
          status:"Success",
          message:"User Profile Successfully",
          data: data

      })
  }
  catch (e) {
      return res.status(500).json({
          status:"fail",message:e.toString()
      })
  }
}

export const ProfileUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        let data = await UsersModel.updateOne({ "_id": user_id }, reqBody);

        return res.status(201).json({
            status: "Success",
            message: "User Updated Successfully",
            data: data
        });
    } catch (e) {
        return res.status(500).json({
            status: "fail",
            message: e.toString()
        });
    }
};







export const EmailVerify=async(req,res)=>{
    try {
        let email=req.params.email;
        let data=await UsersModel.findOne({email: email})
        if(data==null){
            return res.json({status:"fail","Message":"User email does not exist"})
        }
        else {

            // Send OTP To Email
            let code=Math.floor(100000+Math.random()*900000)
            let EmailTo= data['email'];
            let EmailText= "Your Code is "+ code;
            let EmailSubject= "Task Manager Verification Code"
            await SendEmail(EmailTo, EmailText, EmailSubject)

            // Update OTP In User
            await UsersModel.updateOne({email: email},{otp:code})
            return res.json({status:"success",Message:"Verification successfully,check email"})

        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }
}


export  const  CodeVerify=async (req,res)=>{
  try{
      let reqBody=req.body
      let data=await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})

      if(data== null){

          return res.json({status:"fail",message:"Wrong Verification Code"})
      }else {
          return res.json({status:"success",message:" Verification successfully"})}
  }catch (e) {
      return res.json({status:"fail","Message":e.toString()})
  }
}



//
// export  const  ResetPassWord=async (req,res)=>{
// try {
//     let reqBody=req.body
//     let data=await UsersModel.findOne({email:reqBody['email'],otp:reqBody['otp']})
//
//     if(data== null){
//
//         return res.json({status:"fail",message:"Wrong Verification Code"})
//     }else {
//         let data=await UsersModel.findOne({email:reqBody["email"]},
//             {otp: "0", password: reqBody['password']}
//             )
//
//         return res.json({status:"success",message:" Password reset successfully",data})}
//
//
// }catch (e) {
//     return res.json({status:"fail","Message":e.toString()})
// }
//
// }
//


export const ResetPassWord=async(req,res)=>{


    try {
        let reqBody=req.body;
        let data=await UsersModel.findOne({email: reqBody['email'],otp:reqBody['otp']})
        if(data==null){
            return res.json({status:"fail","Message":"Wrong Verification Code"})
        }
        else {

            await UsersModel.updateOne({email: reqBody['email']},{
                otp:"0", password:reqBody['password'],
            })
            return res.json({status:"success",Message:"Password Reset successfully"})
        }
    }
    catch (e){
        return res.json({status:"fail","Message":e.toString()})
    }


}