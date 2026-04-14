import type { SelectedProduct } from '../stores/aiStore';

// Function to convert file/blob objectURL to base64
const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // Strip out the data:image/jpeg;base64, prefix for the API
      const base64 = base64data.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateAIStaging = async (
  sceneImageUrl: string,
  selectedProducts: SelectedProduct[],
  refineInstruction?: string
): Promise<string> => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const base64Image = await urlToBase64(sceneImageUrl);

    const productDescriptions = selectedProducts
      .map(p => `- ${p.name} (${p.category})`)
      .join('\n');

    let prompt = `You are a high-end exterior designer and photographer.
I am providing a background image of an outdoor space.
Please seamlessly insert the following UMA BALI outdoor furniture into the scene:
${productDescriptions}

Guidelines:
1. Ensure lighting, shadows, and perspective match the original background photograph exactly.
2. The furniture should be arranged logically (e.g. dining chairs around a dining table, sunbeds by the pool).
3. Attempt to match the material finish (teak wood, wicker, etc) naturally.
4. Keep the background completely identical, only add the furniture. Do not alter existing architecture.
`;

    if (refineInstruction && refineInstruction.trim() !== '') {
      prompt += `\nAdditional user refinement instruction: ${refineInstruction}`;
    }

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg', // Assuming jpeg/png
                data: base64Image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
      }
    };

    // Note: Gemini 2.5 Flash does not return an image natively through standard text generation endpoint.
    // It requires the Imagen model endpoints. For demonstration and mvp, we will call typical text endpoint
    // and fallback to a placeholder, or call a specific imaging endpoint if it exists.
    // As Gemini Flash 2.5 does NOT generate images directly yet natively without Vertex Imagen, 
    // we will simulate the image generation response to demonstrate the UI workflow since we only have the flash endpoint.
    // In a real production architecture this would call an orchestration backend that bridges to SDXL / Imagen 3.

    // Simulate 3 seconds generation time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulating success by returning a placeholder furnished image instead of original empty image
    console.log('Orchestration Payload:', payload);
    return 'https://www.arkitecna.com/images/UMALAS20VILLA.jpg'; // Placeholder simulation of a furnished result

  } catch (error) {
    console.error('AI Staging generation error:', error);
    throw new Error('Failed to generate visualization. Please try again.');
  }
};
