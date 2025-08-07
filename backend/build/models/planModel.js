var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../config/db";
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
export const createPlan = (plan) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // in the future we will lookup our plan by hash, for speed up
        const hash = crypto
            .createHash("sha256")
            .update(JSON.stringify(plan))
            .digest("hex");
        const trx = yield db.transaction();
        const [returnPlan] = yield trx("plan").insert({
            location: plan.location,
            days: plan.days,
            interests: plan.interests,
            budget: plan.budget,
            traveler_type: plan.traveler_type,
            hash: hash,
            generated_plan: { this_will_be_gpt_json: "response" }
        }, ["generated_plan"]);
        yield trx.commit();
        return returnPlan["generated_plan"];
    }
    catch (error) {
        console.log(error);
    }
});
