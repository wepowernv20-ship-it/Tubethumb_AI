import { GoogleGenAI } from "@google/genai";
import { ThumbnailStyle } from "../types";

// Helper to convert File to base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateThumbnail = async (
  prompt: string,
  styleModifier: string,
  imageFiles: File[]
): Promise<string[]> => {
  // Always create a new instance to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imageParts = await Promise.all(imageFiles.map(fileToGenerativePart));

  const fullPrompt = `
    Create a high-quality YouTube thumbnail image (16:9 aspect ratio).
    User Request: ${prompt}
    
    Style Guide: ${styleModifier}
    
    Requirements:
    - Aspect Ratio: 16:9
    - Contrast: High contrast, eye-catching.
    - Text: If text is included, make it big, bold, and readable (use English for text inside image if uncertain).
    - Composition: Follow the rule of thirds or center focus typical for YouTube CTR.
  `;

  const contents = {
    parts: [
      ...imageParts,
      { text: fullPrompt }
    ]
  };

  // Function to perform a single generation request
  const generateSingleRequest = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          // imageSize is not supported in Flash Image model
        },
      },
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    return null;
  };

  try {
    // Run 2 requests in parallel to get 2 variations
    const results = await Promise.all([generateSingleRequest(), generateSingleRequest()]);
    
    // Filter out failed requests (nulls)
    const images = results.filter((img): img is string => img !== null);

    if (images.length === 0) {
      throw new Error("No images generated.");
    }
    
    return images;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};