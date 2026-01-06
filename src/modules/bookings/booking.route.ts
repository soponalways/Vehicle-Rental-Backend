import { Router } from "express";
import bookingsController from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router(); 

router.post('/', auth("admin", "customer"), bookingsController.createBooking)
router.get('/', auth("admin", "customer"), bookingsController.getBookings)


const bookingsRoute = router; 
export default bookingsRoute; 
