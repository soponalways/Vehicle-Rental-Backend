import dotenv from "dotenv"; 
import path from "path"
dotenv.config({path: path.join(process.cwd(), ".env")})

const config = {
    port: process.env.PORT, 
    connectionString: process.env.CONNECTION_STRING, 
    jwtSecrete: process.env.JWT_SECRETE, 
}; 

export default config