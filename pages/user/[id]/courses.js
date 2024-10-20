import {React, useEffect, useState} from 'react'
import StudentNav from '../../../components/StudentNav'
import VideoList from '../../../components/VideoList'
import styles from '../../../styles/student.module.css'
import { CgMenuRound } from "react-icons/cg";
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
function StdCourses() {
  const router = useRouter();
  const [courseList, setCourseList] = useState([]);
  const showNav = () => {
    var nav = document.getElementById('studentNav');
    var menu = document.getElementById('stdMenu');
    if (nav.style.maxWidth === '') {
      nav.style.maxWidth = '100%';
      menu.style.color = 'rgba(2, 73, 81, 1)';
    } else {
      nav.style.maxWidth = '';
      menu.style.color = 'rgba(255, 255, 255, 1)';
    }
  }
  useEffect(() => {
    let courseListData = localStorage.getItem('courseList')
    if (courseListData&&courseListData!="") {
      let decodedCourseList = jwtDecode(courseListData);
      // console.log(decodedCourseList.courseListData);
      setCourseList([...decodedCourseList.courseListData])
    }
  }, [])
  
  return (
    <div className={styles.mainDiv}>
      <StudentNav page={"courses"} />
      <button className={styles.menu} id='stdMenu' onClick={showNav}><CgMenuRound /></button>
      <section className={styles.bodySection}>
        <div className={styles.secondHeader}>
          <h1 className={styles.normalHOne}>Courses</h1>
        </div>
        <div className={styles.content}>
          <VideoList title={"Available Courses"} courseList={courseList} />
        </div>
      </section>
    </div>
  )
}

export default StdCourses