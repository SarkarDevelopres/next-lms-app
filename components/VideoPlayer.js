import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from '@/styles/coursePlayer.module.css';
import { useRouter } from 'next/router';

const VideoPlayer = ({ videoID, completeChapter }) => {
    const videoRef = useRef(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [hasSentRequest, setHasSentRequest] = useState(false); // To ensure the API request is sent only once
    const router = useRouter()
    // Fetch the signed video URL when the component mounts
    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const response = await fetch(`/api/video/getSignedUrl?videoID=${videoID}`);
                const data = await response.json();
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

    // Track video progress and send an API request if the video has been watched more than 90%
    useEffect(() => {
        const videoElement = videoRef.current;

        const handleTimeUpdate = () => {
            if (videoElement) {
                const progress = (videoElement.currentTime / videoElement.duration) * 100;

                // Check if the progress is greater than or equal to 90% and the request hasn't been sent yet
                if (progress >= 90 && !hasSentRequest) {
                    setHasSentRequest(true); // Prevent further API calls
                    completeChapter();
                }
            }
        };

        // Attach the timeupdate event listener if the video element is available
        if (videoElement) {
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
        }

        // Clean up the event listener when the component unmounts or the video URL changes
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [videoID, hasSentRequest]);

    // Listen for the 'ended' event to auto-play the next video
    useEffect(() => {
        const videoElement = videoRef.current;

        const handleEnded = () => {
            if (!hasSentRequest) {
                completeChapter()
            }
            else{
                router.reload()
            }
        };

        // Attach the ended event listener if the video element is available
        if (videoElement) {
            videoElement.addEventListener('ended', handleEnded);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', handleEnded);
            }
        };
    }, [hasSentRequest]);

    return (
        <video
            ref={videoRef}
            controls
            onContextMenu={(e) => e.preventDefault()} // Disables right-click menu
            className={styles.videoPlayer} // Assuming you have styles for the video
        />
    );
};

export default VideoPlayer;
