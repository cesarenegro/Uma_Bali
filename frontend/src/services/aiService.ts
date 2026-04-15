import type { SelectedProduct, Region } from '../stores/aiStore';

// Helper to load image and safely resize it to prevent massive Base64 API payloads
const loadAndResizeImage = async (url: string, maxDim = 1536, format = 'image/jpeg', quality = 0.85): Promise<{ base64: string, width: number, height: number, img: HTMLImageElement }> => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  let targetWidth = img.width;
  let targetHeight = img.height;
  if (Math.max(targetWidth, targetHeight) > maxDim) {
    const scale = maxDim / Math.max(targetWidth, targetHeight);
    targetWidth = Math.floor(targetWidth * scale);
    targetHeight = Math.floor(targetHeight * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');
  
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  return { 
    base64: canvas.toDataURL(format, quality), // Compress output to save payload size
    width: targetWidth, 
    height: targetHeight, 
    img 
  };
};

export const generateAIStaging = async (
  sceneImageUrl: string,
  selectedProducts: SelectedProduct[],
  selectedRegions?: Region[] | null
): Promise<string> => {
  try {
    if (!selectedRegions || selectedRegions.length === 0) {
      throw new Error("Please select a region on the image first.");
    }
    if (!selectedProducts || selectedProducts.length === 0) {
      throw new Error("Please select a product to place.");
    }

    const region = selectedRegions[0];
    const product = selectedProducts[0];

    // Downscale scene slightly to avoid hitting 10MB limit (compress scene via JPEG)
    const sceneData = await loadAndResizeImage(sceneImageUrl, 1536, 'image/jpeg', 0.85);
    const base64Image = sceneData.base64;

    // Load reference (keep as PNG to preserve alpha channel / transparency)
    const refData = await loadAndResizeImage(product.image, 1024, 'image/png');
    const referenceImageBase64 = refData.base64;

    // Create scene mask image using canvas matching the newly resized scene
    const canvas = document.createElement('canvas');
    canvas.width = sceneData.width;
    canvas.height = sceneData.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not create canvas context');

    // Fill with black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw white rectangle for the region
    ctx.fillStyle = '#FFFFFF';
    const rx = (region.x / 100) * canvas.width;
    const ry = (region.y / 100) * canvas.height;
    const rw = (region.width / 100) * canvas.width;
    const rh = (region.height / 100) * canvas.height;
    ctx.fillRect(rx, ry, rw, rh);

    const base64Mask = canvas.toDataURL('image/png');

    // Create reference_image_mask from reference image alpha channel
    const refImg = new Image();
    refImg.src = referenceImageBase64;
    await new Promise((resolve, reject) => {
      refImg.onload = resolve;
      refImg.onerror = reject;
    });
    const refCanvas = document.createElement('canvas');
    refCanvas.width = refImg.width;
    refCanvas.height = refImg.height;
    const refCtx = refCanvas.getContext('2d');
    if (!refCtx) throw new Error('Could not create reference canvas context');
    
    // Draw reference image
    refCtx.drawImage(refImg, 0, 0);
    const imgData = refCtx.getImageData(0, 0, refCanvas.width, refCanvas.height);
    const data = imgData.data;
    
    // Convert to black and white mask based on alpha
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      // If pixel is visible, make it white. Otherwise, black.
      const color = alpha > 10 ? 255 : 0;
      data[i] = color;     // R
      data[i + 1] = color; // G
      data[i + 2] = color; // B
      data[i + 3] = 255;   // A (solid)
    }
    refCtx.putImageData(imgData, 0, 0);
    const referenceImageMaskBase64 = refCanvas.toDataURL('image/png');

    // Call the local Express proxy running on port 3001
    const proxyResponse = await fetch('http://localhost:3001/api/replicate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bg_image_path: base64Image,
        bg_mask_path: base64Mask,
        reference_image_path: referenceImageBase64,
        reference_image_mask: referenceImageMaskBase64
      })
    });

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      const detailedError = errorData.detail ? JSON.stringify(errorData.detail) : (errorData.error || proxyResponse.statusText);
      throw new Error(`Generation failed: ${detailedError}`);
    }

    const resultData = await proxyResponse.json();
    
    if (resultData.output && Array.isArray(resultData.output) && resultData.output.length > 0) {
      return resultData.output[resultData.output.length - 1];
    } else if (typeof resultData.output === 'string') {
      return resultData.output;
    } else {
       throw new Error('API returned an empty output array');
    }

  } catch (error) {
    console.error('AI Staging generation error:', error);
    throw new Error('Failed to generate visualization. Please try again.');
  }
};
