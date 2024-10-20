import { React, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router';
import styles from '@/styles/institute.module.css'
import { CgMenuRound } from "react-icons/cg";
import InstitutetNav from '@/components/instittueComponents/InstituteNav';
import CourseComponent from '@/components/instittueComponents/CourseComponent';
import { jwtDecode } from 'jwt-decode';
import checkSession from '@/utils/checkSession';
import Loading from '@/components/Loading';
import AddCourseComp from '@/components/instittueComponents/AddCourseComp';
function courses() {
    const router = useRouter();
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [planId, setPlanId] = useState("None");
    const [courseIdList, setCourseIdList] = useState(['abc']);
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
    const addCourse = async()=>{
        if (planId == "None") {
            alert("To Add Courses You must have a Plan !!");
            router.push('/plans')
        }
        else{
            setShowAddCourse(true)
        }
    }
    
    useEffect(() => {
        if (checkSession('subAdminListToken')) {
            let token = localStorage.getItem('subAdminListToken')
            let decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setCourseIdList([...decodedToken.courseIdList])
            setPlanId(decodedToken.planId)
            setShowLoading(false);
        }
    }, [])

    return (
        <div className={styles.mainDiv}>
            {showLoading && <Loading />}
            {showAddCourse&&<AddCourseComp closeWindow={()=>setShowAddCourse(false)} showLoading={()=>setShowLoading} />}
            <InstitutetNav page={'courses'} />
            <button className={styles.menu} id='instMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.header}>
                    <h1>Courses</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.coursesList}>
                        {courseIdList.length > 0 ? (
                            courseIdList.map((e, index) => (
                                <CourseComponent key={index} id={e._id} />
                            ))
                        ) : (
                            <h2>No Courses yet!</h2>
                        )}
                    </div>
                </div>
                <div className={styles.buttonDiv + " " + styles.coursesBtn}>
                    <button onClick={addCourse}>Add Courses</button>
                </div>
            </section>
        </div>
    )
}

export default courses