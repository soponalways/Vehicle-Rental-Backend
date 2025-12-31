import { Router } from "express";
import vehiclesController from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router(); 

router.post('/', auth('admin'),  vehiclesController.createVehicle); 
router.get('/', vehiclesController.getAllVehicle); 
router.get('/:vehicleId', vehiclesController.getVehicleById)
router.put('/:vehicleId', auth('admin'), vehiclesController.updateVehicle)


const vehicleRouter = router; 
export default vehicleRouter; 