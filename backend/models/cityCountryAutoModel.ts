import { db } from "../config/db"

export const getCities = async (query: string)=>{
    try {
        const result = await db("cities")
            .select("id", "country_name", "name")
            .whereILike("name", `%${query}%`) 
            .orWhereILike("country_name", `%${query}%`) 
            .orderByRaw(
                `GREATEST(similarity(country_name, ?), similarity(name, ?)) DESC`,
                [query, query]
            )
            .limit(10)
            .timeout(10000);

        return result.length > 0 ? result : [];

    } catch (error) {
        console.log(error)
        throw error
    }
}