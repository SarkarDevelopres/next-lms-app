import {React,useState,useEffect} from 'react'
import styles from './styles/courseComponentUser.module.css'
import {fetchCourseData,fetchUserProgressData} from "@/utils/fetchAPIs"
import { useRouter } from 'next/router';
import Link from 'next/link';
function CourseComp(id) {
  const router = useRouter();
    const [courseData, setCourseData] = useState({});
    const [progressData, setProgressData] = useState({
      completedChapters:0,
      totalChapters:10
    });
    const fetchCourseProgressData = async() =>{
      let userToken = localStorage.getItem("token")
      let courseID = id.id
      const {currentChapterID, nextChapterID, progressData} = await fetchUserProgressData(userToken, courseID);
      setProgressData({...progressData})
    }
    useEffect(() => {
      fetchCourseData(id.id, setCourseData);
      fetchCourseProgressData();
    }, [id.id])
    
  return (
    <Link href={`/user/${router.query.id}/${id.id}`} className={styles.mainCourseCardDiv}>
        <img src={courseData?.Image?.secure_url || '../../course-example-thumbnail.png'} />
        <div className={styles.courseCardDetailsDiv}>
            <h3>{courseData.Title}</h3>
            <div>
            <p>{progressData.completedChapters} out of {progressData.totalChapters} chapters</p>
          <progress id="file" value={progressData.completedChapters} max={progressData.totalChapters}> {(progressData.completedChapters*100)/progressData.totalChapters}% </progress>
            </div>
        </div>
    </Link>
  )
}

export default CourseComp