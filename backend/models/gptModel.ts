import { openai } from "../config/openAi";
import { systemPrompt } from "../config/openAi";
import { Plan } from "../types";
import { getPhotos, PhotoResult } from "./pexelsModel";
import { ChatCompletionCreateParams, ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}


export const gptResponse = async (plan: Plan) => {
  console.log("🚀 Generating travel plan for", plan.location, "-", plan.days, "days");
  
  try {
    // Making sure that we are capped at 30 days
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

    const tools: ChatCompletionTool[] = [
      {
        type: "function",
        function: {
          name: "getPhotos",
          description: "Get a photo for a specific location to enhance the travel itinerary",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "The location, attraction, or place name to search for photos"
              }
            },
            required: ["location"]
          }
        }
      }
    ];


    const response = await openai.chat.completions.create({
      model: "gpt-5-nano-2025-08-07",
      messages,
      tools,
      response_format: { type: "json_object" },
      max_completion_tokens: maxTokens,
      top_p: 1,
      // Optimize for speed
      reasoning_effort: "low", // Reduce reasoning tokens for faster response
      parallel_tool_calls: true // Enable parallel tool execution
    });

    console.log("📊 Initial API call:", {
      tokens: {
        prompt: response.usage?.prompt_tokens,
        completion: response.usage?.completion_tokens,
        total: response.usage?.total_tokens,
        reasoning: response.usage?.completion_tokens_details?.reasoning_tokens
      },
      finish_reason: response.choices[0]?.finish_reason,
      content_length: response.choices[0]?.message?.content?.length || 0
    });

    // Handle function calls if present
    const message = response.choices[0]?.message;
    if (message?.tool_calls && message.tool_calls.length > 0) {
      console.log("📸 Fetching", message.tool_calls.length, "photos in parallel...");
      
      // Add assistant message with tool calls
      messages.push({
        role: "assistant",
        content: message.content,
        tool_calls: message.tool_calls
      });

      // Execute function calls in parallel for better performance
      const photoPromises = message.tool_calls
        .filter(toolCall => toolCall.type === "function" && toolCall.function?.name === "getPhotos")
        .map(async (toolCall) => {
          if (toolCall.type === "function" && toolCall.function) {
            try {
              const args = JSON.parse(toolCall.function.arguments);
              const photoResult: PhotoResult = await getPhotos(args.location);
              
              return {
                role: "tool" as const,
                tool_call_id: toolCall.id,
                content: JSON.stringify(photoResult)
              };
            } catch (error: any) {
              console.error("Photo fetch failed:", error.message);
              return {
                role: "tool" as const,
                tool_call_id: toolCall.id,
                content: JSON.stringify({ error: "Failed to get photo" })
              };
            }
          }
          
          return {
            role: "tool" as const,
            tool_call_id: toolCall.id,
            content: JSON.stringify({ error: "Invalid tool call" })
          };
        });

      // Wait for all photo fetches to complete in parallel
      const photoResults = await Promise.all(photoPromises);
      
      // Add all results to messages
      messages.push(...photoResults);

      const finalResponse = await openai.chat.completions.create({
        model: "gpt-5-mini-2025-08-07",
        messages,
        response_format: { type: "json_object" },
        max_completion_tokens: maxTokens,
        top_p: 1,
        reasoning_effort: "low"
      });

      console.log("📊 Final API call:", {
        tokens: {
          prompt: finalResponse.usage?.prompt_tokens,
          completion: finalResponse.usage?.completion_tokens,
          total: finalResponse.usage?.total_tokens,
          reasoning: finalResponse.usage?.completion_tokens_details?.reasoning_tokens
        },
        finish_reason: finalResponse.choices[0]?.finish_reason,
        content_length: finalResponse.choices[0]?.message?.content?.length || 0
      });
      
      const totalTokensUsed = (response.usage?.total_tokens || 0) + (finalResponse.usage?.total_tokens || 0);
      console.log("Total tokens used:", totalTokensUsed);
      console.log("Plan generated successfully with photos");
      return {
        choices: [{
          message: {
            content: finalResponse.choices[0]?.message?.content || ""
          }
        }]
      };
    }

    console.log("Plan generated successfully (no photos)");
    return {
      choices: [{
        message: {
          content: message?.content || ""
        }
      }]
    };
  } catch (e: any) {
    console.error("Plan generation failed:", e.message);
    return {
      choices: [{
        message: {
          content: JSON.stringify({ error: "Failed to generate plan" })
        }
      }]
    };
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