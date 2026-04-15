import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const REPLICATE_API_TOKEN = process.env.VITE_REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN;

app.post('/api/replicate', async (req, res) => {
  try {
    const { bg_image_path, bg_mask_path, reference_image_path, reference_image_mask } = req.body;

    if (!REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'Replicate API Token is missing' });
    }

    // Start prediction
    const startResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: "542c963129c4661ab53a875b1b9a84b2102ca784cf872ef2752a468721c0eb2a",
        input: {
          bg_image_path: bg_image_path,
          bg_mask_path: bg_mask_path,
          reference_image_path: reference_image_path,
          reference_image_mask: reference_image_mask,
          steps: 50,
          guidance_scale: 4.5
        }
      })
    });

    if (!startResponse.ok) {
      const errorData = await startResponse.json();
      return res.status(startResponse.status).json(errorData);
    }

    let prediction = await startResponse.json();
    const getUrl = prediction.urls.get;

    // Polling loop
    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed' &&
      prediction.status !== 'canceled'
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const pollResponse = await fetch(getUrl, {
        headers: {
          'Authorization': `Token ${REPLICATE_API_TOKEN}`
        }
      });
      prediction = await pollResponse.json();
    }

    if (prediction.status === 'succeeded') {
      res.json({ output: prediction.output });
    } else {
      res.status(500).json({ error: 'Prediction failed or was canceled', details: prediction.error });
    }
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Replicate Proxy Server running on http://localhost:${PORT}`);
});
