import tasksModel from "../models/TasksModel.js";

export  const CreatedTask=async (req,res)=>{
    try{
        let user_id=req.headers['user_id']
        let reqBody=req.body
        reqBody.user_id=user_id


        let date =await  tasksModel.create(reqBody)
        return res.status(201).json({
            status:"Success",
            message:"User Registered Successfully",
            date:date
        })
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}

export  const UpdateTaskStatus=async (req,res)=>{
    return res.json({status:"success"})

}


export  const TaskListByStatus=async (req,res)=>{
    return res.json({status:"success"})

}


export  const DeleteTask=async (req,res)=>{
    return res.json({status:"success"})

}



export  const   CountTask=async (req,res)=>{
    return res.json({status:"success"})

}


