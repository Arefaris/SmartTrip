import { openai } from "../config/openAi";
import { systemPrompt } from "../config/openAi";
import { Plan } from "../types";
import { getPhotos, PhotoResult } from "./pexelsModel";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


// Helper function to calculate photo calls based on trip duration
const calculatePhotoCalls = (days: number): number => {
  return Math.ceil(days / 2.5); // 1 photo every 2-3 days
};

// Function to select key activities for photo calls
const selectPhotoActivities = (planData: any): string[] => {
  const photoCalls = calculatePhotoCalls(planData.days);
  const allActivities = planData.plan.flatMap((day: any) => 
    day.activities.map((activity: any) => ({
      title: activity.title,
      dayIndex: day.day
    }))
  );
  
  // Distribute photo calls across the trip duration
  const interval = Math.floor(allActivities.length / photoCalls);
  const selectedActivities: string[] = [];
  
  for (let i = 0; i < photoCalls && i * interval < allActivities.length; i++) {
    const activityIndex = i * interval;
    selectedActivities.push(`${planData.location} ${allActivities[activityIndex].title}`);
  }
  
  return selectedActivities;
};

// Function to add photos to the travel plan
const addPhotosToplan = async (planData: any): Promise<any> => {
  const photoLocations = selectPhotoActivities(planData);
  console.log(`📸 Fetching ${photoLocations.length} photos for key locations...`);
  
  // Fetch photos for selected locations
  const photoPromises = photoLocations.map(async (location, index) => {
    try {
      const photo = await getPhotos(location);
      return { index, photo };
    } catch (error) {
      console.error(`Failed to get photo for ${location}:`, error);
      return null;
    }
  });
  
  const photoResults = await Promise.all(photoPromises);
  const validPhotos = photoResults.filter(result => result !== null);
  
  // Add photos to random activities, distributed across days
  let photoIndex = 0;
  const photosPerDay = Math.ceil(validPhotos.length / planData.days);
  
  planData.plan.forEach((day: any, dayIndex: number) => {
    let photosAddedToday = 0;
    day.activities.forEach((activity: any, activityIndex: number) => {
      if (photoIndex < validPhotos.length && photosAddedToday < photosPerDay && 
          (activityIndex === 0 || Math.random() > 0.7)) { // Favor first activity or random selection
        activity.photo = validPhotos[photoIndex].photo;
        photoIndex++;
        photosAddedToday++;
      }
    });
  });
  
  return planData;
};

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
    const planWithPhotos = await addPhotosToplan(planData);
    
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