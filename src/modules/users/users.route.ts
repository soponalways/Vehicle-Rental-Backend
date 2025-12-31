import { Router } from "express";
import auth from "../../middleware/auth";
import usersController from "./users.controller";

const router = Router(); 

router.get('/', auth("admin"), usersController.getAllUsers)

const userRoutes = router; 
export default userRoutes; 