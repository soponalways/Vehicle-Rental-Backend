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
}

const bookingsController = {
    createBooking, 
}; 

export default bookingsController; 