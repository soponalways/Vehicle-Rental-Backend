import express, { Request, Response } from "express"
import initDB from "./config/db"
import authRouter from "./modules/auth/auth.routes";
const app = express(); 

initDB(); 

// ? Parser
app.use(express.json())


// Routes 
app.use('/api/v1/auth', authRouter); 


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


export default app; 