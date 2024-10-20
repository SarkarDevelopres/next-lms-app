import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from '@/styles/coursePlayer.module.css'
const VideoPlayer = ({ videoID }) => {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(null);

    // Fetch the signed video URL when the component mounts
    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(`/api/video/getSignedUrl?videoID=${videoID}`);
                const data = await response.json();
                console.log(data.url);

                setVideoUrl(data.url);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoUrl();
    }, [videoID]);

    // Initialize Hls.js for streaming if the signed URL is available
    useEffect(() => {
        if (videoUrl && videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoUrl); // Use the signed URL
                hls.attachMedia(videoRef.current);

                // Clean up on component unmount
                return () => {
                    hls.destroy();
                };
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // For browsers like Safari that support HLS natively
                videoRef.current.src = videoUrl;
            }
        }
    }, [videoUrl]);

    return (
        <video
            ref={videoRef}
            controls
            onContextMenu={(e) => e.preventDefault()} // Disables right-click menu
        />
    );
};

export default VideoPlayer;
