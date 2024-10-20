import React from 'react'
import styles from './styles/courseCard.module.css'
import { useRouter } from 'next/router';
function CourseCard() {
  const navigate = useRouter();
    const head = "Web Development";
    const para = "Lorem ipsum dolor sit amet conse ctetur adipisicing elit."
    const price = 4999;
    const openCourse = ()=>{
      navigate.push(`/course/100`);
    }
  return (
    <div onClick={openCourse} className={styles.mainDiv}>
        <div className={styles.courseImg}></div>
        <div className={styles.courseContent}>
            <h3>{head}</h3>
            <p>{para}</p>
            <span className={styles.prices}>₹{price} <span>only</span></span>
        </div>
    </div>
  )
}

export default CourseCard