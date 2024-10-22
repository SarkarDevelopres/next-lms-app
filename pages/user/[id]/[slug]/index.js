import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { fetchChapterData, fetchChapterList, fetchUserProgressData, fetchUpdatedUserProgress } from '@/utils/fetchAPIs';
import styles from '@/styles/coursePlayer.module.css'
import Accordion from 'react-bootstrap/Accordion';
import VideoChapterComponent from '@/components/VideoChapterComponent';
import Loading from '@/components/Loading';
import VideoPlayer from '@/components/VideoPlayer';
import 'next-cloudinary/dist/cld-video-player.css';
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function index() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true)
  const [chapterList, setChapterList] = useState([]);
  const [progressData, setProgressData] = useState({
    completedChapters: 0,
    totalChapters: 10
  });
  const [currentChapterData, setCurrentChapterData] = useState({});
  const [nextChapterData, setNextChapterData] = useState({});
  const [chapterCompleted, setChapterCompleted] = useState(false)

  // Function to send completion request and update states after completion
  const sendCompletionRequest = async () => {
    setChapterCompleted(true);
    try {
      const userToken = localStorage.getItem("token");
      const courseID = router.query.slug;
      const currentCompletedChapterID = currentChapterData._id;
      
      const response = await fetchUpdatedUserProgress(userToken, courseID, currentCompletedChapterID);
      
      // Update progress and fetch next chapter data
      if (response.data.currentChapterID === null) {
        // Course Completed
        toast.success(`${res.message}`,{transition:Bounce});
        // alert("Course Completed !!")
        setProgressData({ ...response.data.progressData });
      } 
      else if (response.data.nextChapterID === null) {
        fetchChapterData(response.data.currentChapterID, setCurrentChapterData);
        setProgressData({ ...response.data.progressData });
      } 
      else {
        // Update progress and fetch both current and next chapter data
        setProgressData({ ...response.data.progressData });
        fetchChapterData(response.data.currentChapterID, setCurrentChapterData);
        fetchChapterData(response.data.nextChapterID, setNextChapterData);
      }
      setChapterCompleted(false);
    } catch (error) {
      console.error('Error sending video progress:', error);
    }
  };

  // Fetch user progress and chapter data
  useEffect(() => {
    const fetchData = async () => {
      if (router.query.id && router.query.slug) {
        const userToken = localStorage.getItem("token");
        const courseID = router.query.slug;
        try {
          const { currentChapterID, nextChapterID, progressData } = await fetchUserProgressData(userToken, courseID);
          
          setProgressData({ ...progressData });
          fetchChapterList(courseID, setChapterList);
          fetchChapterData(currentChapterID, setCurrentChapterData);
          
          if (nextChapterID) {
            fetchChapterData(nextChapterID, setNextChapterData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setShowLoading(false);
        }
      }
    };

    fetchData();
  }, [router.query, chapterCompleted]);  // Trigger re-fetch when chapterCompleted changes

  return (
    <div className={styles.coursePlayerMainDiv}>
      {showLoading && <Loading />}
      
      <div className={styles.currentChapterDisplayDiv}>
        <div className={styles.videoPlayerDiv}>
          {currentChapterData?.VideoID && (
            <VideoPlayer videoID={currentChapterData.VideoID} completeChapter={sendCompletionRequest} />
          )}
        </div>
        <div className={styles.chapterDetailsDiv}>
          <h3>{currentChapterData.Name}</h3>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis explicabo suscipit quidem minima nemo necessitatibus, molestiae, voluptates omnis labore, fuga earum voluptate.</div>
        </div>
      </div>
      
      <div className={styles.allChaptersDisplayDiv}>
        <div className={styles.progressBarDiv}>
          <p>{progressData.completedChapters} out of {progressData.totalChapters} chapters</p>
          <progress id="file" value={progressData.completedChapters} max={progressData.totalChapters}> 
            {(progressData.completedChapters * 100) / progressData.totalChapters}% 
          </progress>
        </div>
        
        <div className={styles.chapterListDiv}>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {chapterList.map((e, index) => (
              <VideoChapterComponent key={index} index={index} id={e._id} name={e.Name} />
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default index;
