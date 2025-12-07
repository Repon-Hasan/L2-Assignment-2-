import { Request, Response } from "express";
import { userServices } from "./users.services";

const createUser=async(req:Request,res:Response)=>{
     const body=req.body;
     try {
        const result=await userServices.createUser(body)
        delete result.rows[0].password
        res.status(201).json({
             success: true,
            message: "User registered successfully",
            data:result.rows[0]
        })
        
     } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message
        })
     }
}

const userUpdate=async(req:Request,res:Response)=>{
    const body=req.body
const {userId}=req.params

  const loggedInUser = (req as any).user;
  if (loggedInUser.role !== "admin" && loggedInUser.id !== Number(userId)) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }

    try {
        const result = await userServices.userUpdate(body,userId!)
        delete result.rows[0].password
        if(result.rowCount===0){
            res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }else{
       res.status(200).json({
        success:true,
        message: "User updated successfully",
        data:result.rows[0]
       })
        }
        
    } catch (error:any) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

const deleteUser=async(req:Request,res:Response)=>{
    const{userId}=req.params
     try {
        const result= await userServices.deleteUser(userId!)
        if(result.rowCount===0){
           res.status(500).json({
            success:false,
            message:"User not Found"
           })
        }else{
           res.status(200).json({
            success:true,
            message:"User deleted successfully"
           })
        }
     } catch (error:any) {
         res.status(500).json({
            success:false,
            message:error.message
         })
     }
}
export const userControllers={
    createUser,userUpdate,deleteUser
}