import { db } from "../config/db"

export const getCities = async (query: string)=>{
    const trx = await db.transaction()

    try {
        
        const result = await trx("cities")
            .select("id", "country_name", "name")
            .whereILike("name", `%${query}%`) 
            .orWhereILike("country_name", `%${query}%`) 
            .orderByRaw(
                `GREATEST(similarity(country_name, ?), similarity(name, ?)) DESC`,
                [query, query]
            )
            .limit(10);

        if (result.length > 0) {
            return result
        }else {
            return []
        }

    } catch (error) {
        console.log(error)
    }

}