import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/student.module.css'
import CourseComp from './CourseComp';
function VideoList({ title, courseList }) {
  // const [courseList, setCourseList] = useState(['abcde1223cHJFGV','jebdjwdw1899237GWJQO']);
  const [btnContent, setBtnContent] = useState('View More');
  const purchaseVM = () => {
    if (btnContent == 'View More') {
      setStyle({ maxHeight: "605px" })
      setBtnContent('View Less')
    } else {
      setStyle({ height: '302px' })
      setBtnContent('View More')
    }
  }
  useEffect(() => {

  }, [courseList])

  return (
    <div className={styles.continueDiv}>
      <h2>{title}</h2>
      <div className={styles.videosList}>
        {courseList[0] ? (
          courseList.map((e, index) => {
            return <CourseComp key={index} id={e} />
          })
        ) : (
          <h2>No Courses under Institute yet !!</h2>
        )

        }
      </div>
      {courseList.length > 4 && (
        <button className={styles.viewMore} onClick={purchaseVM}>
          {btnContent}
        </button>
      )}
    </div>
  )
}

export default VideoList