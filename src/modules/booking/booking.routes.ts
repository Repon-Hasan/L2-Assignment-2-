import { Router } from "express";
import { bookingsController, getBookings } from "./booking.controller";
import { auth } from "../../middleware/auth";


const router =Router()

router.post("/",bookingsController.createBookings)
router.get("/", auth("customer", "admin"), getBookings);
router.put("/:bookingId", auth("customer", "admin"),bookingsController.updateBookings );


export const bookingRouters={
    router
}