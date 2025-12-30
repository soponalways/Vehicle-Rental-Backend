import { Router } from "express";
import authControllers from "./auth.controller";

const router = Router(); 

router.post('/signup' , authControllers.signup); 

const authRouter = router; 
export default authRouter;
