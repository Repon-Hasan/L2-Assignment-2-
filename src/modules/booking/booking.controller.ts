import { Request, Response } from "express";
import { bookingServices } from "./booking.sevices";

const createBookings=async(req:Request,res:Response)=>{
    const body=req.body
     try {
        const result = await bookingServices.createBooking(body)
        res.status(200).json({
            success:"true",
            message:"Booking created successfully",
            data:result
        })
     } catch (error:any) {
          res.status(500).json({
            success:false,
            message:error.message
          })
     }
}


export const getBookings = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });

    if (user.role === "admin") {
      const result = await bookingServices.getAllBookingsForAdmin();
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully",
        data: result.rows,
      });
    } else {
      const result = await bookingServices.getBookingsForCustomer(user.email);
      return res.status(200).json({
        success: true,
        message: "Your bookings retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || "Failed to retrieve bookings" });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { bookingId } = req.params;

  const role = (req as any).user.role; 

  try {
 
    const result = await bookingServices.updateBookings(status, bookingId!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (role === "admin" && status === "returned") {
      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: result.rows[0],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const bookingsController={
    createBookings,updateBookings
}