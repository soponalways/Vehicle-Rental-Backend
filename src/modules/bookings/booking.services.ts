import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import autoReturn from "../../config/autoReturn";

const createBooking = async(payload: Record<string, any>, reqUser: JwtPayload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload || {}; 
    const startDate = new Date(rent_start_date).getTime();
    const endDate = new Date(rent_end_date).getTime(); 
    const daysMS = 1000 * 60 * 60 * 24; 
    const totalDaysInMS = endDate - startDate; 
    const totalDaysofBookings = Math.floor(totalDaysInMS / daysMS); 

    // * get Vehicle
    const targeted_vehicle = (await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])).rows[0]; 
    if (targeted_vehicle.availability_status === "booked") {
        return ""
    }; 
    const daily_rent_price = targeted_vehicle.daily_rent_price
    const total_price = totalDaysofBookings * daily_rent_price; 
    const vehicle_name = targeted_vehicle.vehicle_name; 

    // get user if role is customer
    if (reqUser.role === "customer") {
        const user =(await pool.query(`SELECT * FROM users WHERE id=$1`, [customer_id])).rows[0]; 
        if(user.email !== reqUser.email) {
            return {
                message: "You are not availed users"
            }
        }; 

    }; 

    const createBook = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, "active"
    ]); 
//* Update vehicle status 
    await pool.query(`UPDATE vehicles SET availability_status=$1`, ["booked"])
    
    return {
        ...createBook.rows[0],
        vehicle: {
            vehicle_name,
            daily_rent_price
        }
    }  
}; 

const getBookings = async(reqUser : JwtPayload)=> {
    await autoReturn(); 
    //* check valid customer 
    if(reqUser.role === "customer") {
        const customer = (await pool.query(`SELECT * FROM users WHERE email=$1`, [reqUser.email])).rows[0]; 
        const result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [customer.id]); 
        const data =await Promise.all(
            result.rows.map(async (row) => {
                const vehicle_id = row.vehicle_id;
                const vehicleInfo = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])
                const vehicle_name = vehicleInfo.rows[0].vehicle_name;
                const registration_number = vehicleInfo.rows[0].registration_number;
                const type = vehicleInfo.rows[0].type;

                const newData = {
                    ...row,
                    vehicle: {
                        vehicle_name,
                        registration_number,
                        type
                    }
                }
                return await newData;
            })
        ); 
        return data; 
    };; 

    //* For Admin user
    const allBookings = (await pool.query(`SELECT * FROM bookings`)).rows; 
    const data = await Promise.all(
        allBookings.map(async (booking) => {
            const { vehicle_id, customer_id} = booking; 
            const customer = (await pool.query(`SELECT * FROM users WHERE id=$1`, [customer_id])).rows[0]; 
            const vehicleOfBooking = (await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id])).rows[0]; 

            const newData = {
                ...booking,
                customer: {
                    name: customer.name,
                    email: customer.email, 
                },
                vehicle: {
                    vehicle_name: vehicleOfBooking.vehicle_name,
                    registration_number: vehicleOfBooking.registration_number, 
                }
            }; 
            return await newData; 
        })
    ); 
    return data; 
    
}

const bookingsServices = {
    createBooking,
    getBookings,  
}; 
export default bookingsServices; 