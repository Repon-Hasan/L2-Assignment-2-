import { Request, Response } from "express";
import { vehiclesServices } from "./vehicle.services";
import strict from "assert/strict";


const createVehicle=async(req:Request,res:Response)=>{
    const body=req.body;
  try {
         const result=await vehiclesServices.createVehicle(body)
         res.status(201).json({
              success: true,
             message: "Vehicle created successfully",
             data:result.rows[0]
         })
  } catch (error:any) {
      res.status(500).json({
        success:false,
        message:error.message
      })
  }
}

const getAllVehicles=async(req:Request,res:Response)=>{
   try {
      const result=await vehiclesServices.getAllVehicle()
      res.status(200).json({
         success: true,
         message: "Vehicles retrieved successfully",
         data:result.rows
      })
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}


const getVehicleById=async(req:Request,res:Response)=>{
    const{vehicleId}=req.params
    try {
    const result = await vehiclesServices.getVehicleById(vehicleId!) 
    res.status(200).json({
         success: true,
        message: "Vehicle retrieved successfully",
        data:result.rows[0]
    })
    } catch (error:any) {
       res.status(500).json({
         success:false,
        message:error.message,
       })
    }
}

const updateVehicle=async(req:Request,res:Response)=>{
    const body=req.body;
    const {vehicleId} = req.params
   try {
    const result= await vehiclesServices.updateVehicle(body,vehicleId!)
    res.status(200).json({
          success: true,
         message: "Vehicle updated successfully",
         data:result.rows[0]
    })
   } catch (error:any) {
       res.status(500).json({
        success:false,
        message:error.message
       })
   }
}

const deleteVehicle=async(req:Request,res:Response)=>{
   const {vehicleId} = req.params
        try {
              const result=await vehiclesServices.deleteVehicle(vehicleId!)
          if(result.rowCount===0){
            res.status(404).json({
                success:false,
                message:"User not found"
            })
          }else{
            res.status(200).json({
                  success: true,
                  message: "Vehicle deleted successfully"
            })
          }

        } catch (error:any) {
            res.status(500).json({
             success:false,
             message:error.message
            })
        }
}
const getAllUsers=async(req:Request,res:Response)=>{
           try {
              const result= await vehiclesServices.getAllUsers()
              
              res.status(200).json({
                    success: true,
                    message: "Users retrieved successfully",
                    data:result.rows
              })
           } catch (error:any) {
                res.status(500).json({
                     success:false,
                     message:error.message
                })
           }
}


export const vehiclesControllers={
    createVehicle,getAllVehicles,getVehicleById,updateVehicle,deleteVehicle,getAllUsers
}