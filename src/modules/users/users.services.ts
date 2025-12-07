import { pool } from "../../database/dbConnect";
import { IUser } from "../../types/userType";
import bcrypt from "bcryptjs";

const createUser = async (body: IUser) => {
    const { name, email, password, phone, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users(name,email,password,phone,role) 
        VALUES($1,$2,$3,$4,$5) RETURNING *
    `, [name, email, hashedPassword, phone, role]);

    return result;
}

const userUpdate=async(body: Record<string,unknown>,id:string)=>{
    const{name,email,password,phone,role}=body
    const updateUsers= await pool.query(`
           UPDATE Users SET 
           name=COALESCE($1,name),
           email=COALESCE($2,email), 
           password=COALESCE($3,password),
            phone=COALESCE($4,phone),
            role=COALESCE($5,role)
            WHERE id=$6 RETURNING *
        `,[name,email,password,phone,role,id])
        return updateUsers
}

const deleteUser = async (id: string) => {
  
  const activeBookings = await pool.query(
    `
    SELECT * FROM Bookings 
    WHERE customer_id = $1 AND status = 'active'
    `,
    [id]
  );

  if (activeBookings.rows.length > 0) {
    throw new Error(
      "Cannot delete user: There are active bookings for this user"
    );
  }


  const result = await pool.query(
    `
    DELETE FROM Users 
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result;
};


   

export const userServices = { createUser,userUpdate,deleteUser };
