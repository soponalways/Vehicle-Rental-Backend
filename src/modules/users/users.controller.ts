import { Request, Response } from "express";
import usersServices from "./users.service";

const getAllUsers = async(req: Request, res: Response) => {
    try {
        const result = await usersServices.getAllUsers(); 
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
    }
}; 


const usersController = {
    getAllUsers, 
}; 

export default usersController; 