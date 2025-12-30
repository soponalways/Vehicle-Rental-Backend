import { pool } from "../../config/db"

const createVehicle = async (payload: Record<string, any>) => {
   try {
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;  
        const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *` , [vehicle_name, type, registration_number, daily_rent_price, availability_status])
        // console.log(result);
        return result.rows[0]; 
   } catch (err: any) {
        return err.message; 
   }
}; 

const vehicleServices = {
    createVehicle, 
}; 
export default vehicleServices; 