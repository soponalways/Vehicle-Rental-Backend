import { Request, Response } from "express";
import vehicleServices from "./vehicles.service";

const createVehicle = async (req: Request, res:Response) => {
    try {
        const data = await vehicleServices.createVehicle(req.body); 
        if(!data) {
            return res.status(202).json({
                success: false, 
                message: "Vehicle Not Created"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data, 
        })
    } catch (err: any) {
        return res.status(500).json({
            success: true,
            message: err.message,
        })
    }
}; 

const vehiclesController = {
    createVehicle, 
}; 

export default vehiclesController; 