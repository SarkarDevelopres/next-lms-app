import {React,useState,useEffect} from 'react'
import styles from './styles/courseComponentUser.module.css'
import {fetchCourseData} from "@/utils/fetchAPIs"
import { useRouter } from 'next/router';
import Link from 'next/link';
function CourseComp(id) {
  const router = useRouter();
    const [courseData, setCourseData] = useState({});
    useEffect(() => {
      fetchCourseData(id.id, setCourseData);
    }, [id.id])
    
  return (
    <Link href={`/user/${router.query.id}/${id.id}`} className={styles.mainCourseCardDiv}>
        <img src={courseData?.Image?.secure_url || '../../course-example-thumbnail.png'} />
        <div className={styles.courseCardDetailsDiv}>
            <h3>Example Course Long Title</h3>
            <div>
                <p>32% Completed</p>
                <progress id="file" value="32" max="100"> 32% </progress>
            </div>
        </div>
    </Link>
  )
}

export default CourseComp