import UsersModel from "../models/UsersModel.js";

export  const  Registration=async (req,res)=>{
   try{
       let reqBody=req.body;
       await  UsersModel.create(reqBody)
       return res.status(201).json({
           status:"Success",message:"User Registered Successfully"
       })
   }
   catch (e) {
       return res.status(201).json({
           status:"fail",message:e.toString()
       })

}
}
export  const  Login=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  ProfileDetails=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  ProfileUpdate=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  EmailVerify=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  CodeVerify=async (req,res)=>{
    return res.json({status:"success"})

}

export  const  ResetPassWord=async (req,res)=>{
    return res.json({status:"success"})

}



