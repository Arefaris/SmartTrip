import { db } from "../config/db"
import { Plan } from "../types"
//this is for hash generation
import crypto from 'crypto';

//dummy data
// {
//   location: 'Kiev',
//   days: 1,
//   interests: [ 'Food', 'Museum' ],
//   traveler_type: 'Solo'
// }

//model to submit user plan to db
export const createPlan = async (plan: Plan)=> {
    try {

        // in the future we will lookup our plan by hash, for speed up
        const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(plan))
        .digest("hex");

        // if planned was found, return it
        const result = await lookUpPlan(hash)

        if (result){
            return result
        }
        // if not, create it
        const trx = await db.transaction()
        const [returnPlan] = await trx("plan").insert({
            location: plan.location.toLowerCase(),
            days: plan.days,
            interests: plan.interests.map(interest => interest.toLowerCase()),
            budget: plan.budget.toLowerCase(),
            traveler_type: plan.traveler_type.toLowerCase(),
            hash: hash,
            generated_plan: {this_will_be_gpt_json: "response"}
        }, ["generated_plan"])

        await trx.commit()

        return returnPlan["generated_plan"]
    }catch (error){
        console.log(error)
    }
}

//searchig by hash in our db
const lookUpPlan = async (hash: string) => {
    try {
        const result = await db("plan")
        .select("generated_plan")
        .where({hash})
        .first()

        if(result){
            return result["generated_plan"]
        }

    }catch (error) {
        console.log(error)
    }
    
}