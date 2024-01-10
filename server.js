require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Proxy endpoint for YouTube API
app.get('/videos', async (req, res) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.CHANNEL_ID; // Make sure to set this in your .env file

    try {
        const youtubeApiResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`);
        if (!youtubeApiResponse.ok) {
            throw new Error(`YouTube API responded with status: ${youtubeApiResponse.status}`);
        }
        const youtubeData = await youtubeApiResponse.json();
        res.json(youtubeData.items);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        res.status(500).json({ error: 'Error fetching YouTube videos' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
