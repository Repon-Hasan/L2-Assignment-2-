import {Pool} from 'pg'
import config from '../config'

export const pool=new Pool({
connectionString:`${config.connection_str}`
})

const initDb=async()=>{

    await  pool.query(`
        CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL CHECK (LENGTH(password) >= 6),
    phone TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer')),
    CHECK (email = LOWER(email))
); `);

await pool.query(`
    CREATE TABLE IF NOT EXISTS Vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(150) NOT NULL,
    type VARCHAR(50) CHECK(type IN ('car', 'bike', 'van','SUV')),
    registration_number TEXT UNIQUE NOT NULL,
    daily_rent_price INT NOT NULL  CHECK (daily_rent_price > 0),
    availability_status VARCHAR(50) CHECK(availability_status IN('available','booked'))
    ) 
    `);

    await pool.query(`
CREATE TABLE IF NOT EXISTS Bookings (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Users(id),
    vehicle_id INT REFERENCES Vehicles(id),
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
    total_price INT NOT NULL CHECK (total_price > 0),
    status VARCHAR(50) CHECK (status IN ('active', 'cancelled', 'returned'))
)

        `);



console.log("DbConnect")

}

export default initDb