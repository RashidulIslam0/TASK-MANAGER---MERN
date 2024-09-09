import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import usersModel from "../models/UsersModel.js";

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

export  const  EmailVerify=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  CodeVerify=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  ResetPassWord=async (req,res)=>{
    return res.json({status:"success"})

}



