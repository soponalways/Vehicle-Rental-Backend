import { pool } from "./db";

const autoReturn = async () => {
    const allbookings = (await pool.query(`SELECT * FROM bookings`)).rows; 
    console.log({ allbookings });
    const newData = await Promise.all(allbookings.map(async (booking) => {
        const { rent_end_date, vehicle_id, } = booking; 
        // const endTime = new Date("2026-01-06T18:00:00.000Z").getTime();
        const endTime = new Date(rent_end_date).getTime();

        const currentTime = new Date().getTime(); 
        if(endTime < currentTime) {
            await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2`, ["returned", booking.id]); 
            await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, ["available", vehicle_id]); 
        }

    }))
}; 

export default autoReturn; 