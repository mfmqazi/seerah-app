import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React build (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Secure API Endpoint
app.post('/api/generate-summary', async (req, res) => {
    try {
        const { title } = req.body;
        const apiKey = process.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'Server configuration error: API Key missing' });
        }

        console.log(`Generating summary for: ${title}`);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are an Islamic scholar assistant. Generate a detailed summary for the Seerah (biography of Prophet Muhammad ﷺ) episode titled "${title}".

Please provide:
1. A brief overview (2-3 sentences)
2. Five key points from this episode

Format your response as a JSON object with this exact structure:
{
  "title": "${title}",
  "overview": "your overview here",
  "keyPoints": ["point 1", "point 2", "point 3", "point 4", "point 5"]
}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();

        // Send the raw data back to frontend, let frontend parse it
        // Or parse it here to be safer
        res.json(data);

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle React Routing (return index.html for all other routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
