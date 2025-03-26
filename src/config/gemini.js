
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";

  
  
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  console.log("API Key from Vite env:", apiKey);
  console.log("Loaded API Key:", import.meta.env);

  if(!apiKey){
    throw new Error("Missing API Key. Set VITE_GOOGLE_API_KEY in .env file.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt) {
    if(!prompt || prompt.trim() === ""){
      console.error("Error: Received empty prompt in runChat()");
      return "Error: Empty prompt received.";
    }
    try{
      console.log("Sending prompt:",prompt);
    
    const chat = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(prompt);
    if(!result || !result.response){
      throw new Error("Invalid response from API");
    }
    const responseText = result.response.text();
    console.log("Received response:", responseText);
    return responseText;
  }  catch(error){
    console.error("Error in runChat:",error);
    return "Error fetching response.";
  }
  }

  
  export default runChat;