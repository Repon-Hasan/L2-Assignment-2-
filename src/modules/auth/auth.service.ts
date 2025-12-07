import bcrypt from "bcryptjs"
import config from "../../config"
import { pool } from "../../database/dbConnect"
import jwt from 'jsonwebtoken'

type Payload = { email: string; password: string };
const loginUser=async(payload: Payload)=>{
    const{email,password}=payload
    const result=await pool.query(`
        SELECT * FROM Users WHERE email=$1 
        `,[email])

          if (result.rows.length === 0) {
        // no user found
         throw new Error("User not found");
         }
         const secret=config.JWT_SECRET
         const matched=await bcrypt.compare(password,result.rows[0].password)
         if(!matched){
            throw new Error("Invalid Credentials")
         }
         const jsonPayload={
            name:result.rows[0].name,
            email:result.rows[0].email,
            phone:result.rows[0].phone,
            role:result.rows[0].role

         }
         const token=jwt.sign(jsonPayload,secret!,{
          "expiresIn":"7d"
         })
         delete result.rows[0].password
        return {token,user:result.rows[0]}
}

export const authServices={
 loginUser
}