import { pool } from "../../database/dbConnect"

const createBooking = async (body: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = body;

  const booking = await pool.query(`
    INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
          SELECT 
        $1, 
         $2, 
        $3, 
        $4, 
        (($4::date - $3::date) + 1) * daily_rent_price, 
           'Booking'
            FROM Vehicles
     WHERE id = $2
    RETURNING *
  `, [customer_id, vehicle_id, rent_start_date, rent_end_date]);

  const vehicle = await pool.query(`
    SELECT vehicle_name, daily_rent_price FROM Vehicles WHERE id=$1
  `, [vehicle_id]);

  return {
    ...booking.rows[0],
    vehicle: vehicle.rows[0]
  };
};

const getAllBookingsForAdmin=async()=>{
  const result= await pool.query(`
    SELECT * FROM Bookings 
    `)
    return result
}

const getBookingsForCustomer=async(email:string)=>{
   const result= await pool.query(`
    SELECT * FROM Bookings WHERE email = $1 
    `,[email])
    return result
}

const updateBookings=async(status:string,id:string)=>{
   const result=await pool.query(`
     UPDATE Bookings SET status=$1 WHERE id=$2  RETURNING *
    `,[status,id])
    return result
}




export const bookingServices={
    createBooking,getAllBookingsForAdmin,getBookingsForCustomer,updateBookings
}