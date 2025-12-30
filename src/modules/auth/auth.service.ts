import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import config from "../../config";

const signup = async (payload: Record<string, unknown>) => {
    const { name , email, password, phone, role} = payload; 
    const hashedPassword = await bcrypt.hash(password as string, 10); 
    console.log(hashedPassword);
    try {
        const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING * `, [name, email, hashedPassword, phone, role]); 
        return result; 
    } catch (err: any) {
        return err.message
    }
}; 

const signin = async(payload: Record<string, unknown>) => {
    const { email, password } = payload; 
    if(!email || !password) return {success: false, message: "Please input email and password correctly"}; 

    const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]); 
    if(userExist.rows.length < 1) return {success: false , message: "You haven't Register yet Plesase Register first"}; 
    
    const isMatched = await bcrypt.compare(password as string , userExist.rows[0].password); 
    if(!isMatched) return {success: false, message: "Password not matched"}; 
    const { id, name, email: tEmail, phone, role } = userExist.rows[0]; 
    // console.log(userExist.rows[0]);
    const token = jwt.sign({id, name, email: tEmail, phone, role,}, config.jwtSecrete as string, {
        expiresIn: "7d"
    }); 
    return {
        token, 
        user: {
            id, name, email, phone, role
        }
    }
}

const authServices = {
    signup, 
    signin
}; 
export default authServices; 