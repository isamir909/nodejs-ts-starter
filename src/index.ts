import path from "path";
import { generateContentFromLlm } from "./lib/vertexAi";
import { getBase64Content } from "./lib/getBase64Content";

/**
 * aiExtractionAgent - A function that processes a file by converting it to base64,
 * sends the base64 content along with a prompt to an AI language model (LLM),
 * and returns the file name and the extracted data from the LLM.
 *
 * @param {string} filePath - The path to the file that needs to be processed.
 * @param {string} prompt - System instruction provided to the LLM. For example,
 *                          "You are an extraction agent, you will be given a file from that you have to extract the data in the required format"
 * @param {string} userInput - Specific details the user wants to extract from the PDF file.
 *                             For instance, "Find and return the customer's address."
 * @param {string} mimeType - The MIME type of the file being processed, e.g., "application/pdf".
 */
type AiAgentInput = {
  filePath: string;
  prompt: string;
  userInput: string;
  mimeType: string;
};

const aiExtractionAgent = async (
  data: AiAgentInput
): Promise<{ fileName: string; llmResponse: any }> => {
  const { filePath, prompt, userInput, mimeType } = data;

  // Extract the file name from the provided file path
  const fileName = path.basename(filePath);

  try {
    // Convert the file content to a base64 string
    const base64Content = await getBase64Content(filePath);

    // Prepare the input for the LLM, including the prompt, user input, base64 content, and MIME type
    const input = {
      prompt,
      userInput: userInput, // Example: "Identify key dates mentioned in the document."
      fileBase64: base64Content,
      mimeType: mimeType, // Typically, "application/pdf" for PDF files
    };

    // Generate content from the LLM using the provided input
    const rawExtractionResponse = await generateContentFromLlm(input);

    // Parse the raw LLM response to JSON format and clean up unnecessary characters
    const extractionResponse = JSON.parse(
      rawExtractionResponse.replace("```json", "").replace("```", "").trim()
    );

    // Return the file name and the structured LLM response
    return { fileName, llmResponse: extractionResponse };
  } catch (error) {
    // Log an error if the file processing fails and return null for the LLM response
    console.error(`Error processing file ${filePath}:`, error);
    return { fileName, llmResponse: null };
  }
};


(async()=>{
  let input={
    filePath:"./files/sample_pdf.pdf",
    prompt:"You are an extraction agent, you will be given a file from that you have to extract the data in the required format",
    userInput:`extract the product list given in the invoice, return response in json format format hsould belike below {items:[{productTitiel:item1,quantity:"",price:"",total:""}],totalAmount:"",customerName:""}`,
    mimeType:"application/pdf"
  }
  let response=await  aiExtractionAgent(input);
  console.log(response)
})()
