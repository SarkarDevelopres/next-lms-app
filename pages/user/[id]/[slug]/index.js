import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { fetchChapterData, fetchChapterList, fetchUserProgressData } from '@/utils/fetchAPIs';
import styles from '@/styles/coursePlayer.module.css'
import Accordion from 'react-bootstrap/Accordion';
import VideoChapterComponent from '@/components/VideoChapterComponent';
import Loading from '@/components/Loading';
import { CldVideoPlayer } from 'next-cloudinary';
import VideoPlayer from '@/components/VideoPlayer';
import 'next-cloudinary/dist/cld-video-player.css';

function index() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(true)
  const [chapterList, setChapterList] = useState([]);
  const [progressData, setProgressData] = useState({
    completedChapters:0,
    totalChapters:10
  });
  const [currentChapterData, setCurrentChapterData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (router.query.id && router.query.slug) {
        const userToken = localStorage.getItem("token");
        const courseID = router.query.slug;
        try {
          const {currentChapterID, progressData} = await fetchUserProgressData(userToken, courseID);
          console.log(currentChapterID);
          setProgressData({...progressData})
          fetchChapterList(courseID, setChapterList);
          fetchChapterData(currentChapterID, setCurrentChapterData);
          console.log(currentChapterData.Name);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setShowLoading(false);
        }
      }
    };

    fetchData();
  }, [router.query]);
{/* <CldVideoPlayer width={"100%"} height={"100%"} src={currentChapterData.VideoID} /> */}
  return (
    <div className={styles.coursePlayerMainDiv}>
      {showLoading && <Loading />}
      <div className={styles.currentChapterDisplayDiv}>
        <div className={styles.videoPlayerDiv}>
          {currentChapterData?.VideoID && (
            <VideoPlayer videoID={currentChapterData.VideoID} />
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
          <progress id="file" value={progressData.completedChapters} max={progressData.totalChapters}> {(progressData.completedChapters*100)/progressData.totalChapters}% </progress>
        </div>
        <div className={styles.chapterListDiv}>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {
              chapterList.map((e, index) => {
                return <VideoChapterComponent key={index} index={index} id={e._id} name={e.Name} />
              })
            }
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default index