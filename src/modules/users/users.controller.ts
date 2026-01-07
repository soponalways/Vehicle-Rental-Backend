import { Request, Response } from "express";
import usersServices from "./users.service";
import { JwtPayload } from "jsonwebtoken";

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

const updateUser = async (req: Request, res: Response) => { 
   try {
     const id = req.params.userId as string; 
     const user = req.user as JwtPayload; 
     const dataToUpdate = req.body; 
       const result = await usersServices.updateUser(id, user, dataToUpdate); 
    //    console.log({ resultOnRokeya: result });
       if(!result) {
           return res.status(500).json({
               success: true,
               message: "User update unsuccessfull",
           });
       }
         return res.status(200).json({
             success: true,
             message: "User updated successfully",
             data: result
         });
   } catch (err: any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
   }
}; 

const deleteUsers = async (req: Request, res: Response) => {
    try {
        const {userId } = req.params;
        const result = await usersServices.deleteUsers(userId as string)
        if(!result){
            return res.status(500).json({
                success: false,
                message: "User delete unsuccessfull due to active  bookings"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


const usersController = {
    getAllUsers, 
    updateUser, 
    deleteUsers, 
}; 

export default usersController; 