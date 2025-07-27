
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export const generateSummary = async (content) => {
//   if (!content || content.length < 30) return content;
//   console.log(content);
  

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert at summarizing notes. Create a concise 1-2 sentence summary that captures the key points."
//         },
//         {
//           role: "user",
//           content: `Summarize this note:\n\n${content.substring(0, 2000)}` 
//         }
//       ],
//       temperature: 0.3,
//       max_tokens: 100
//     });

//     return response.choices[0]?.message?.content?.trim() || "No summary generated";
//   } catch (error) {
//     console.error("OpenAI error:", error);
//     throw new Error("Failed to generate summary");
//   }
// };




import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.API_GEMINIAi
});

 export async function generateSummary(content) {
try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:`Summarize this note:${content}`});
   
    
      return response.text
     
} catch (error) {
    throw new Error("Failed to generate summary");
    
}
}
await generateSummary()

