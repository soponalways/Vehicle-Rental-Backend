import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db"

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`); 
    return result.rows; 
}; 

const updateUser = async (id : string, user: JwtPayload, dataToUpdate : Record<string, any>) => {
    if (user.role === "customer") { 
        const destinationUser = await pool.query(`SELECT * FROM users WHERE id=$1  `, [id]);
        if(user.email !== destinationUser.rows[0].email) {
            return ""
        }
        const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING *`, [dataToUpdate?.name, dataToUpdate?.email, dataToUpdate?.phone, id ]); 
        return result; 
    }; 

    const result = await pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [ dataToUpdate?.name, dataToUpdate?.email, dataToUpdate?.phone, dataToUpdate?.role, id]); 
    return result

}

const usersServices = {
    getAllUsers,   
    updateUser,  
}; 

export default usersServices; 