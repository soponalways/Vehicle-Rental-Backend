import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";

const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(" ")[1]; 
        if(!token) {
            return res.status(401).json({
                success: false, 
                message: "Unauthorized Access"
            })
        }
        const decoded = jwt.verify(token as string, config.jwtSecrete as string) as JwtPayload
        req.user = decoded; 
        if(roles.length !== 0 && !roles.includes(decoded.role) ) {
            return res.status(403).json({
                success: false, 
                message: "Forbidden Access"
            })
        }
        next(); 
    }
}; 

export default auth; 