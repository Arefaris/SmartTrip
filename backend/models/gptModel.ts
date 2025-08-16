import { openai } from "../config/openAi";
import { systemPrompt } from "../config/openAi";
import { Plan } from "../types";


export const gptResponse = async (plan: Plan) => {
  
  try {
    //making sure that we are capped at 30 days
    if (plan.days > 30) {
      plan.days = 30
    }

    //dynamicly calculating tokens for a response
    const maxTokens = calculateOutputTokens(plan.days);
    
    const response = await openai.responses.create({
      model: "gpt-5-nano-2025-08-07",
      reasoning: {
        "effort": "minimal"
    },
      input: [
        {
          "role": "system",
          "content": [
            {
              "type": "input_text",
              "text": systemPrompt
            },
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": `
              Generate a plan for: 
              Location: ${plan.location}
              Days: ${plan.days}
              Start Date: ${plan.start_date}
              End Date: ${plan.end_date}
              Traveler type: ${plan.interests}
              Budget: ${plan.budget}
              Traveler: ${plan.traveler_type}`
            }
          ]
        }
      ],
      text: {
        "format": {
          "type": "json_object"
        }
      },
      tools: [],
    //   temperature: 0.0,
      max_output_tokens: maxTokens,
      top_p: 1,
      store: false
    });

    return response
  } catch (e) {

    console.error("GPT Error:", e);
    return { output_text: JSON.stringify({ books: [] }) };

  }
}

//scale tokens
  const calculateOutputTokens = (days: number): number => {
    const baseTokens = 1000; // Base JSON structure
    const tokensPerDay = 400; // Estimated tokens per day of activities
    const calculated = baseTokens + (days * tokensPerDay);

    return Math.min(calculated, 13000); // Cap at max for 30 days
  };