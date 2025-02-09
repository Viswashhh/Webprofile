const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

// Serve static files from root and public directory
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to fetch YouTube stats
app.get('/api/youtube-stats', async (req, res) => {
    const channelId = 'UCBJX2JwvsI45r0P27uMUbFw';
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
        console.log('Fetching from URL:', apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.error) {
            console.error('YouTube API Error:', data.error);
            return res.status(500).json(data.error);
        }
        
        console.log('YouTube Response:', data);
        res.json(data);
    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube stats', details: error.message });
    }
});

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Using API Key:', process.env.YOUTUBE_API_KEY ? 'Key is set' : 'Key is missing');
}); 