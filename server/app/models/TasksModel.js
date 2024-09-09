import mongoose, {Mongoose} from "mongoose";
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
            type:Mongoose.Schema.Types.ObjectId,
            required:true,


        },

        password:{
            type:String,
            required:true,


        }

    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Tasks =mongoose.model("Tasks",TaskSchema)

export  default  Tasks