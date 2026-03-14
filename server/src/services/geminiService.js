const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
const generateBookReview = async (bookTitle, description) => {

  const prompt = `
You are a professional book critic and storyteller. 
Review the book "${bookTitle}" based on this description: "${description}".

Return a JSON object with the following structure:
{
  "summary": "A 2-3 sentence engaging summary",
  "rating": "A rating out of 5",
  "analysis": "A brief technical analysis of the writing style and themes",
  "characters": [
    { "name": "Name", "description": "1-sentence visual and personality description" }
  ],
  "narrationScript": "A dramatic, short storytelling script (approx 100 words) that introduces the book's world."
}
Strictly return ONLY JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate AI review");
  }
};

module.exports = { generateBookReview };