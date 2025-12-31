import { Pool } from "pg"
import config from ".";
export const pool = new Pool({
    connectionString: config.connectionString
})
const initDB = async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        password TEXT NOT NULL CHECK(LENGTH(password) >= 6), 
        phone VARCHAR(20) NOT NULL, 
        role VARCHAR(15) CHECK (role IN ('admin' , 'customer')), 
        created_at TIMESTAMP DEFAULT NOW(), 
        last_signin_time TIMESTAMP DEFAULT NOW() 
        )`); 
    
    await pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY, 
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(15) CHECK (type IN ('car', 'bike', 'van', 'SUV')), 
        registration_number VARCHAR(40) UNIQUE NOT NULL, 
        daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0), 
        availability_status VARCHAR(20) CHECK ( availability_status IN ('booked' , 'available') ), 
        created_at TIMESTAMP DEFAULT NOW(), 
        updated_at TIMESTAMP DEFAULT NOW()
        )`); 

    await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY, 
        customer_id INT REFERENCES users(id) ON DELETE CASCADE, 
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE, 
        rent_start_date TIMESTAMP NOT NULL, 
        rent_end_date TIMESTAMP NOT NULL CHECK (rent_end_date > rent_start_date), 
        total_price INT NOT NULL CHECK( total_price > 0 ) , 
        status VARCHAR(20) CHECK( status IN('active', 'cancelled', 'returned'))
        )`)
}

export default initDB; 