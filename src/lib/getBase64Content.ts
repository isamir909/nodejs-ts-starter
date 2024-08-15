import fs from 'fs';

// Function to get the base64 content of a file
export const getBase64Content = async (filePath: string): Promise<string> => {
    try {
      const fileContent = fs.readFileSync(filePath);
      return fileContent.toString('base64');
    } catch (error) {
      console.error(`Error reading file at ${filePath}:`, error);
      throw new Error('Failed to read file content');
    }
  };