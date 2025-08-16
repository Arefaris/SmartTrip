import { db } from "../config/db"
import { Plan } from "../types"
//this is for hash generation
import crypto from 'crypto';
import { gptResponse } from "./gptModel";

//dummy data
// {
//   location: 'Kiev',
//   days: 1,
//   interests: [ 'Food', 'Museum' ],
//   traveler_type: 'Solo'
// }

//model to submit user plan to db
export const createPlan = async (plan: Plan, userid: string) => {
    // hashing up our plan for future look up
    const hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(plan))
        .digest("hex");
        
    // First check if plan already exists
    const existingPlan = await lookUpPlan(hash)
    if (existingPlan) {
        return existingPlan
    }
    
    // Plan doesn't exist, so generate and create it
    const response = await gptResponse(plan)
    
    const trx = await db.transaction()

    try {
        // Try to insert the new plan
        const [returnPlan] = await trx("plan").insert({
            location: plan.location.toLowerCase(),
            days: plan.days,
            start_date: plan.start_date,
            end_date: plan.end_date,
            interests: plan.interests.map(interest => interest.toLowerCase()),
            budget: plan.budget.toLowerCase(),
            traveler_type: plan.traveler_type.toLowerCase(),
            hash: hash,
            generated_plan: response.output_text
        }, ["generated_plan", "id"])

        //saving this plan to user, for future lookup
        const [user_plans] = await trx("user_plans")
            .insert({
                user_id: userid,
                plan_id: returnPlan["id"]
            }, ["user_id", "plan_id"])

        console.log(user_plans)
        await trx.commit()

        return returnPlan["generated_plan"]
    } catch (error: any) {
        
        await trx.rollback()
        console.log(error)
        
        if (error.code === '23505') {
            const existingPlan = await lookUpPlan(hash)
            if (existingPlan) {
                return existingPlan
            }
        }
        
        throw error
    }
}

//searchig by hash in our db
const lookUpPlan = async (hash: string) => {
    try {
        const result = await db("plan")
            .select("generated_plan")
            .where({ hash })
            .first()

        if (result) {
            return result["generated_plan"]
        }

    } catch (error) {
        console.log(error)
    }

}

//searching by hash in our db using transaction
const lookUpPlanWithTransaction = async (hash: string, trx: any) => {
    try {
        const result = await trx("plan")
            .select("generated_plan")
            .where({ hash })
            .first()

        if (result) {
            return result["generated_plan"]
        }

    } catch (error) {
        console.log(error)
    }

}

export const getUserPlans = async (userid: string) => {
    try {
        const userPlans = await db("user_plans as up")
            .join("plan as p", "up.plan_id", "p.id")
            .select(
                "p.id as plan_id",
                "p.hash",
                "p.generated_plan",
                "p.location",
                "p.days",
                "up.saved_at"
            )
            .where("up.user_id", userid);

        return userPlans;

    } catch (error) {
        console.log("Error fetching user plans:", error);
        throw error;
    }
}