import express, { Request, Response } from "express"
import initDB from "./config/db"
import authRouter from "./modules/auth/auth.routes";
import vehicleRouter from "./modules/vehicles/vehicles.route";
import userRoutes from "./modules/users/users.route";
const app = express(); 

initDB(); 

// ? Parser
app.use(express.json())


// Routes 
app.use('/api/v1/auth', authRouter); 
app.use('/api/v1/vehicles', vehicleRouter)
app.use("/api/v1/users", userRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


export default app; 