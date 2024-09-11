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
    try {
        let id =req.params.id
        let status=req.params.status
        let user_id=req.headers['user_id']
        let date =await  tasksModel.updateOne({"_id": id, "user_id":user_id },
            {status:status}
        )
        return res.status(201).json({
            status:"Success",
            message:"User Update Successfully",
            date:date
        })
    }catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}


export  const TaskListByStatus=async (req,res)=>{
    try {

        let status=req.params.status
        let user_id=req.headers['user_id']
        let date =await  tasksModel.find({ "user_id":user_id ,status:status},

        )
        return res.status(201).json({
            status:"Success",
            message:"User Task List ",
            date:date
        })
    }catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }

}


export  const DeleteTask=async (req,res)=>{
    try {

        let id =req.params.id
        let user_id=req.headers['user_id']
        let date =await  tasksModel.deleteOne({"_id":id, "user_id":user_id },

        )
        return res.status(201).json({
            status:"Success",
            message:"User Delete Successfully ",
            date:date
        })
    }catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }

}



export  const   CountTask=async (req,res)=>{
    return res.json({status:"success"})

}


