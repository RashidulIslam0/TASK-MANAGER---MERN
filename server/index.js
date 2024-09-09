import express from 'express'
import  cors from  "cors"
import  mongoose from  "mongoose"
import  rateLimit  from  "express-rate-limit"
import  helmet from  "helmet"
import  hpp from  "hpp"
import  cookieParser from  "cookie-parser"
import route from "./routes/api.js";


import {
    PORT,
    MONGODB_CUNNECTION,
    MAX_JSON_SIZE,
    REQUEST_LIMIT_NUMBER,
    REQUEST_LIMIT_TIME,
    URL_ENCODE,
    WEB_CACHE

} from "./app/config/config.js";
import bodyParser from "body-parser";
const app=express()

// security Apply
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(cookieParser())
app.use(bodyParser.json())

// request size Limited
app.use(express.json({Limit: MAX_JSON_SIZE}))

// URL_ENCODE
app.use(express.urlencoded({extende: URL_ENCODE}))

// Request Rate Limit
const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)

// Web Cache
app.set("etag",(WEB_CACHE))

// MONGODB_CONNECTION
mongoose.connect(MONGODB_CUNNECTION,{autoIndex:true})
    .then(()=>{
        console.log("DB IS CONNECTED ")
    }).catch((err)=>{
    console.log("database Error",err )
})

// Add App Router

app.use("/api",route)

app.use("*",(req,res)=>{
    res.status(404).json({
        status:"Error",
        message:"Server Not Found"

    })
})

// App Run
app.listen(PORT,()=>{
    console.log(`Server is running  on port http://localhost:${PORT}`)
})



