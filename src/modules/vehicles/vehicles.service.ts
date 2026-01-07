import autoReturn from "../../config/autoReturn";
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

const getAllVehicle = async () => {
     await autoReturn(); 
     const result = await pool.query(`SELECT * FROM vehicles`)
     return result.rows; 
}

const getVehicleById = async(id: string) => {
     await autoReturn(); 
     const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]); 
     return result.rows[0]; 
}; 

const updateVehicle = async(payload : Record<string, any>) => {
     const { daily_rent_price, availability_status, vehicleId } = payload; 
     const result = await pool.query(`UPDATE vehicles SET daily_rent_price=$1 , availability_status=$2 WHERE id=$3 RETURNING *`, [daily_rent_price, availability_status, vehicleId])
     // console.log(result);
     return result.rows[0]; 
}

const deleteVehicle = async(id: string) => {
     const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 AND availability_status <> 'booked'`, [id]); 
     return result; 
}

const vehicleServices = {
     createVehicle, 
     getAllVehicle, 
     getVehicleById, 
     updateVehicle, 
     deleteVehicle
}; 
export default vehicleServices; 