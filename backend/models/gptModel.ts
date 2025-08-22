import { openai } from "../config/openAi";
import { systemPrompt } from "../config/openAi";
import { Plan } from "../types";
import { getPhotos, PhotoResult } from "./pexelsModel";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";




// This function adds photos into the plan data.
async function addPhotosToPlan(planData: any): Promise<any> {
  console.log(`📸 Getting 1 photo per day...`);

  const photoPromises: Promise<any>[] = [];

  // Add 1 photo to the first activity of each day
  planData.plan.forEach((day: any) => {
    if (day.activities.length > 0) {
      const rngActivity = Math.floor(Math.random() * day.activities.length)
      const firstActivity = day.activities[rngActivity];
      const searchQuery = `${planData.location} ${firstActivity.title}`;
      
      const photoPromise = getPhotos(searchQuery)
        .then((photo) => {
          firstActivity.photo = photo;
          console.log(`✅ Day ${day.day}: Added photo for ${searchQuery}`);
          return { success: true, day: day.day, activity: firstActivity.title };
        })
        .catch((error) => {
          console.error(`❌ Day ${day.day}: Failed photo for ${searchQuery}`, error);
          return { success: false, day: day.day, activity: firstActivity.title };
        });
      
      photoPromises.push(photoPromise);
    }
  });

  // Wait for all photo assignments to complete
  const results = await Promise.all(photoPromises);
  const successCount = results.filter(r => r.success).length;
  
  console.log(`📸 Successfully added ${successCount}/${planData.days} photos`);

  return planData;
}

export const gptResponse = async (plan: Plan) => {
  console.log("🚀 Generating travel plan for", plan.location, "-", plan.days, "days");
  
  try {
    // Making sure that we are capped at 10 days
    if (plan.days > 10) {
      plan.days = 10;
    }

    // Dynamically calculating tokens for a response
    const maxTokens = calculateOutputTokens(plan.days);
    
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `
        Generate a plan for: 
        Location: ${plan.location}
        Days: ${plan.days}
        Start Date: ${plan.start_date}
        End Date: ${plan.end_date}
        Traveler type: ${plan.interests}
        Budget: ${plan.budget}
        Traveler: ${plan.traveler_type}`
      }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano-2025-08-07",
      messages,
      response_format: { type: "json_object" },
      max_completion_tokens: maxTokens,
      top_p: 1,
      reasoning_effort: "low"
    });

    console.log("📊 API call:", {
      tokens: {
        prompt: response.usage?.prompt_tokens,
        completion: response.usage?.completion_tokens,
        total: response.usage?.total_tokens
      },
      finish_reason: response.choices[0]?.finish_reason,
      content_length: response.choices[0]?.message?.content?.length || 0
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Parse the JSON response
    const planData = JSON.parse(content);
    
    // Add photos to the plan
    const planWithPhotos = await addPhotosToPlan(planData);
    
    console.log("Plan generated successfully with photos");
    return {
      choices: [{
        message: {
          content: JSON.stringify(planWithPhotos)
        }
      }]
    };
  } catch (e: any) {
    console.error("Plan generation failed:", e.message);
    throw new Error(`Failed to generate plan: ${e.message}`);
  }
}

//scale tokens - optimized based on actual usage
  const calculateOutputTokens = (days: number): number => {

    const baseTokens = 1000; // Base JSON structure
    const tokensPerDay = 300; // Actual usage is ~300 tokens per day
    const reasoningBuffer = 1000; // Buffer for reasoning tokens
    const calculated = baseTokens + (days * tokensPerDay) + reasoningBuffer;
    
    // Cap at reasonable limits to avoid waste
    const cappedTokens = Math.min(calculated, 20000);
    
    console.log(`📊 Token allocation for ${days} days: ${cappedTokens} tokens`);
    return cappedTokens;
  };