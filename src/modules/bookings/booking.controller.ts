import { Request, Response } from "express";
import bookingsServices from "./booking.services";
import { JwtPayload } from "jsonwebtoken";

const createBooking = async (req: Request, res: Response) => {
    try {
        const data = req.body; 
        const user = req.user as JwtPayload ; 
        const result = await bookingsServices.createBooking(data, user)
        if(!result) {
            return res.status(500).json({
                success: false, 
                message: "Booking not Created for vehicle not available", 
            })
        }; 

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        })
    } catch (err:any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
    }
}; 

const getBookings = async(req: Request, res: Response) => {
    const user = req.user as JwtPayload; 
    try {
        const result = await bookingsServices.getBookings(user); 
        return res.status(200).json({
            success: false,
            message: "Your bookings retrieved successfully", 
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
    }
}

const bookingsController = {
    createBooking, 
    getBookings, 
}; 

export default bookingsController; 