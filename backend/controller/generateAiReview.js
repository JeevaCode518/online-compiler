import {GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI();
const client = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

export const generateAiReview = async (code) =>{
    
     const response = await client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
        you're a code review expert
        you're given a code and you've to review it and give the short review of that code
        The code is: ${code}`
    });

    console.log("RESP", response.text);
    return response.text;

    // async function main() {
    //    const response = await client.models.generateContent({
    //         model: "gemini-2.0-flash",
    //         contents: "Explain how AI works in a few words"
    //     });
    //     console.log("RESP ", response.text);
    //     return response.text;
    // }
    // await main();
}; 