// Toggle navbar for mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
});

// Fetch and display YouTube videos
const apiKey = 'YOUR_YOUTUBE_API_KEY'; // WARNING: This should be kept secret in a real-world app
const channelId = 'YOUR_CHANNEL_ID';

// Fetch and display YouTube videos from the server-side proxy
fetch('/videos')
    .then(response => response.json())
    .then(videos => {
        const videoGrid = document.getElementById('video-grid');
        videos.forEach(video => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const videoThumb = video.snippet.thumbnails.high.url;

            videoGrid.innerHTML += `
                <div class="video">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${videoThumb}" alt="${videoTitle}">
                        <p>${videoTitle}</p>
                    </a>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error fetching videos:', error));
