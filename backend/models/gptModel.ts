import { openai } from "../config/openAi";
import { systemPrompt } from "../config/openAi";
import { Plan } from "../types";


export const gptResponse = async (plan: Plan) => {
  
  try {
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
          "type": "text"
        }
      },
      tools: [],
    //   temperature: 0.0,
      max_output_tokens: 2048,
      top_p: 1,
      store: false
    });

    return response
  } catch (e) {

    console.error("GPT Error:", e);
    return { output_text: JSON.stringify({ books: [] }) };

  }
}