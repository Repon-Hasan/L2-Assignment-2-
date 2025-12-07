import { Request, Response } from "express";
import { bookingServices } from "./booking.sevices";
import { pool } from "../../database/dbConnect";

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
     const booking = await pool.query(
      `SELECT * FROM Bookings WHERE id = $1`,
      [bookingId]
    );

    const result = await bookingServices.updateBookings(status, bookingId!);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
        const vehicle_id = booking.rows[0].vehicle_id; 
            await pool.query(
      `
        UPDATE Vehicles 
        SET availability_status = 'available' 
        WHERE id = $1
      `,
      [vehicle_id]
    );

    

const startedDateResult = await pool.query(
  `SELECT rent_start_date FROM Bookings WHERE id = $1`,
  [bookingId]
);

if (startedDateResult.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Booking not found",
  });
}

const startedDate = new Date(startedDateResult.rows[0].rent_start_date);



if (role === "customer" && startedDate <= new Date()) {
  return res.status(400).json({
    success: false,
    message: "You can't cancel this booking because it has already started",
  });
}



const endedDateResult = await pool.query(
  `SELECT rent_end_date, vehicle_id  FROM Bookings WHERE id = $1`,
  [bookingId]
);

if (endedDateResult.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Booking not found",
  });
}

const endedDate = new Date(endedDateResult.rows[0].rent_end_date);



if (role === "customer" && startedDate <= new Date()) {
  return res.status(400).json({
    success: false,
    message: "You can't cancel this booking because it has already started",
  });
}


if (endedDate < new Date()) {
  await pool.query(
    `UPDATE Bookings SET status = 'returned' WHERE id = $1`,
    [bookingId]
  );

  await pool.query(
    `UPDATE Vehicles SET availability_status = 'available' WHERE id = $1`,
    [vehicle_id]
  );

  return res.status(200).json({
    success: true,
    message: "Booking period ended. Auto-marked as returned",
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