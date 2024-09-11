import mongoose from "mongoose";
const TaskSchema= new mongoose.Schema({
        title:{
            type:String,
            required:true,


        },
        descripation:{
            type:String,
            required:true,


        },
        status:{
            type:String,
            required:true,
        },

        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },

    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Tasks =mongoose.model("Tasks",TaskSchema)

export  default  Tasks