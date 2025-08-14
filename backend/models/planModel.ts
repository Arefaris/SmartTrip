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
    const response =  await gptResponse(plan)
   
    const trx = await db.transaction()
    try {

        // in the future we will lookup our plan by hash, for speed up
        const hash = crypto
            .createHash("sha256")
            .update(JSON.stringify(plan))
            .digest("hex");

        // if planned was found, return it
        const result = await lookUpPlan(hash)

        if (result) {
            return result
        }
        // if not, create it

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
    } catch (error) {
        await trx.rollback()
        console.log(error)
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

export const getUserPlans = async (userid: string) => {
    const trx = await db.transaction()
    try {
        const userPlans = await trx("user_plans as up")
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

        await trx.commit();
        return userPlans;

    } catch (error) {
        await trx.rollback();
        console.log("Error fetching user plans:", error);
        throw error;
    }
}