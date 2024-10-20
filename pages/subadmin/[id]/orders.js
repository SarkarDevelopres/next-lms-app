import React from 'react'
import styles from '../../../styles/institute.module.css'
import { CgMenuRound } from "react-icons/cg";
import InstitutetNav from '@/components/instittueComponents/InstituteNav';
import CourseComponent from '@/components/instittueComponents/CourseComponent';
function orders() {
    const showNav = () => {
        var nav = document.getElementById('instituteNav');
        var menu = document.getElementById('instMenu');
        if (nav.style.maxWidth === '') {
            nav.style.maxWidth = '100%';
            menu.style.color = 'rgba(2, 73, 81, 1)';
        } else {
            nav.style.maxWidth = '';
            menu.style.color = 'rgba(255, 255, 255, 1)';
        }
    }
    return (
        <div className={styles.mainDiv}>
            <InstitutetNav page={'orders'} />
            <button className={styles.menu} id='instMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.header}>
                    <h1>Orders</h1>
                </div>
                {/* <div className={styles.content}>
                    <div className={styles.coursesList}>
                        <CourseComponent />
                        <CourseComponent />
                    </div>
                </div>
                <div className={styles.buttonDiv+" "+styles.coursesBtn}>
                    <button>Add Courses</button>
                </div> */}
            </section>
        </div>
    )
}

export default orders