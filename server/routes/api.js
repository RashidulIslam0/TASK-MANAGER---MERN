import express from "express";

const router=express.Router()
import * as TaskController from "../app/controllers/TaskController.js";
import * as UserController from "../app/controllers/UserController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

// USERS
router.post("/Registration",UserController.Registration)
router.post("/Login",UserController.Login)
router.get("/ProfileDetails",AuthMiddleware,UserController.ProfileDetails)
router.post("/CodeVerify",UserController.CodeVerify)
router.post("/ProfileUpdate",UserController.ProfileUpdate)
router.post("/EmailVerify",UserController.EmailVerify)
router.post("/ResetPassWord",UserController.ResetPassWord)


// Task
router.post("/CreatedTask",TaskController.CreatedTask)
router.get("/UpdateTaskStatus",TaskController.UpdateTaskStatus)
router.get("/TaskListByStatus",TaskController.TaskListByStatus)
router.get("/DeleteTask",TaskController.DeleteTask)
router.get("/CountTask",TaskController.CountTask)


export  default  router