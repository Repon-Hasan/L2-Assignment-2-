import { pool } from "../../database/dbConnect"

const createVehicle=async(body:Record<string,unknown>)=>{
    const{vehicle_name,
  type,
  registration_number,
  daily_rent_price,
  availability_status}=body
    const result= await pool.query(`
        INSERT INTO Vehicles(vehicle_name,
    type,
  registration_number,
  daily_rent_price,
  availability_status) VALUES ($1,$2,$3,$4,$5) RETURNING *
        `,[vehicle_name,type,registration_number,daily_rent_price,availability_status]);
     return result    
}

const getAllVehicle=async()=>{
const result= await pool.query(`
        SELECT * FROM Vehicles
  `)

  return result

}

const getVehicleById=async(id:string)=>{
  const result= await pool.query(`
    SELECT * FROM Vehicles WHERE id=$1
    `,[id])

    return result
}


const updateVehicle = async (body: Record<string, unknown>, id: string) => {
  const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = body;

  const result = await pool.query(`
  UPDATE Vehicles 
   SET 
    vehicle_name = COALESCE($1, vehicle_name),
    type = COALESCE($2, type),
    registration_number = COALESCE($3, registration_number),
    daily_rent_price = COALESCE($4, daily_rent_price),
    availability_status = COALESCE($5, availability_status)
  WHERE id=$6
  RETURNING *
  `, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);



  return result;
}

const deleteVehicle = async (id: string) => {

  const activeBookings = await pool.query(
    `
    SELECT * FROM Bookings 
    WHERE vehicle_id = $1 AND status = 'active'
    `,
    [id]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error(
      "Cannot delete vehicle: There are active bookings for this vehicle"
    );
  }

 
  const result = await pool.query(
    `
    DELETE FROM Vehicles 
    WHERE id = $1 
    RETURNING *
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  return result;
};


 const getAllUsers=async()=>{
  const result= await pool.query(`
SELECT id, name, email, phone, role FROM Users;
    `)
    return result
}


export const vehiclesServices={
    createVehicle,getAllVehicle,getVehicleById,updateVehicle,deleteVehicle,getAllUsers
}