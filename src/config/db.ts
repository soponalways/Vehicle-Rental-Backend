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
        role VARCHAR(15), 
        created_at TIMESTAMP DEFAULT NOW(), 
        last_signin_time TIMESTAMP DEFAULT NOW() 
        )`)
}

export default initDB; 