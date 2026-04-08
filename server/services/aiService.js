import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock_key',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'ValidateIt AI',
  },
});

export const analyzeIdea = async (title, description) => {
  if (process.env.MOCK_AI === 'true' || !process.env.OPENAI_API_KEY) {
    console.log("Using Mock AI Response");
    return {
      problemSummary: "There is a lack of automated tools for validating startup ideas quickly and effectively.",
      customerPersona: "Founders, Indie Hackers, Product Managers",
      marketOverview: "Growing market of micro-SaaS and AI-assisted venture tools. High willingness to pay for time-saving products.",
      competitors: ["ValidateIt", "IdeaCheck", "YCombinator Startup School forums"],
      suggestedTechStack: ["React", "Node.js", "MongoDB", "OpenAI"],
      riskLevel: "Medium",
      profitabilityScore: 75
    };
  }

  const prompt = `
You are an expert startup advisor and initial stage venture capitalist.
Analyze the following startup idea and return a structured JSON response.

Title: ${title}
Description: ${description}

Respond ONLY with valid JSON strictly matching the following schema. Do not include markdown formatting like \`\`\`json.
{
  "problemSummary": "String (1-2 sentences summarizing the core problem)",
  "customerPersona": "String (Target audience)",
  "marketOverview": "String (Brief market analysis)",
  "competitors": ["String", "String"],
  "suggestedTechStack": ["String", "String"],
  "riskLevel": "Low | Medium | High",
  "profitabilityScore": number (0-100)
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content.trim();
    // In case the AI includes markdown tags
    const cleanContent = content.replace(/^```json/, '').replace(/```$/, '').trim();
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error("Error analyzing idea with OpenAI:", error);
    if (error.status === 429) {
      throw new Error("The free AI model is currently overloaded. Please try again in a few seconds.");
    }
    throw new Error("Failed to generate AI analysis");
  }
};
