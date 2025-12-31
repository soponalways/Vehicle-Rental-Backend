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

const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicle(); 
        return res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
    }
}
const getVehicleById = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicleById(req.params.vehicleId as string);
        return res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const updateVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.updateVehicle({ ...req.body, vehicleId: req.params.vehicleId }); 
        // console.log(result);
        return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteVehicle(req.params.vehicleId as string);
        console.log(result);
        if(result.rowCount === 0) {
            return res.status(200).json({
                success: false, 
                message: "Vehicle delete unsuccessfull"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const vehiclesController = {
    createVehicle, 
    getAllVehicle, 
    getVehicleById, 
    updateVehicle, 
    deleteVehicle
}; 

export default vehiclesController; 