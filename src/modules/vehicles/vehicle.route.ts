import { Router } from "express";
import { vehiclesControllers } from "./vehicle.controllers";
import { auth } from "../../middleware/auth";
import { userControllers } from "../users/users.controllers";

const router=Router()

router.post("/vehicles",auth("admin"),vehiclesControllers.createVehicle)
router.get("/vehicles",vehiclesControllers.getAllVehicles)
router.get("/vehicles/:vehicleId",vehiclesControllers.getVehicleById)
router.put("/vehicles/:vehicleId",auth("admin"),vehiclesControllers.updateVehicle)
router.delete("/vehicles/:vehicleId",auth("admin"),vehiclesControllers.deleteVehicle)
router.get("/users",vehiclesControllers.getAllUsers)


export const vehicleRoutes={
    router
}