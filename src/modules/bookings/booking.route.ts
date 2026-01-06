import { Router } from "express";
import bookingsController from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router(); 

router.post('/', auth("admin", "customer"), bookingsController.createBooking)

const bookingsRoute = router; 
export default bookingsRoute; 
