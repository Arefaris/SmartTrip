import { db } from "../config/db";
import bcrypt from "bcrypt"

export const createUser = async (password: string, email: string) => {
        const trx = await db.transaction()

        try {
            const hashPassword = await bcrypt.hash(password + "", 10)
            const [user] = await trx('users').insert({
                email: email.toLowerCase(),
                password_hash: hashPassword
            }, ["email", "id"])

            await trx.commit()
            return user

        } catch (error) {
            await trx.rollback()
            console.log(error)
            throw error
        }
}