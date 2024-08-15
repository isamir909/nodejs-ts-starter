import {
    HarmBlockThreshold,
    HarmCategory,
    VertexAI,
  } from "@google-cloud/vertexai";
 const initVertexAI = new VertexAI({
    project: "ai-agent-blog",
    location: "us-central1",
    googleAuthOptions: {
      keyFile: "./gcp-creds.json",
    },
  });
  
   const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];
  
interface VertexAiInput{
    prompt: string,
    userInput:string,
    fileBase64?: string,
    mimeType?: string,
}
  export const generateContentFromLlm = async (
   data:VertexAiInput
  ): Promise<any> => {
    try {
        console.log("Calling Vertex AI");
        
        const {prompt,userInput,fileBase64,mimeType} =data

      const generativeModel = initVertexAI.getGenerativeModel({
        model: "gemini-1.5-pro-001",
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 1,
          topP: 0.95,
        },
        safetySettings: safetySettings,
        systemInstruction: {
          role: "system",
          parts: [{ text: prompt }],
        },
      });
  
      let req
      if(fileBase64 && mimeType){
        const document = {
          inlineData: {
            mimeType: mimeType,
            data: fileBase64,
          },
        };
         req = {
          contents: [
            { role: "user", parts: [document, { text: userInput }] },
          ],
        };
      }else{
         req = {
          contents: [
            { role: "user", parts: [ { text: userInput }] },
          ],
        };

      }
      const aggregatedResponse = await generativeModel.generateContent(req); 
      if (
        !aggregatedResponse.response.candidates ||
        !aggregatedResponse.response.candidates[0]
      ) {
        throw new Error("No content found in aggregated response"); 
      }
      return aggregatedResponse.response.candidates[0]?.content.parts[0]?.text;
    } catch (error) {
      console.error(`ERROR: ${error}`);
      throw error; 
    }
  };