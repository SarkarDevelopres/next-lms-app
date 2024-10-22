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
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCourseListForInstituteID } from '@/utils/fetchAPIs';
function courses() {
    const router = useRouter();
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const [planId, setPlanId] = useState("None");
    const [courseIdList, setCourseIdList] = useState([]);
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
    const addCourse = async () => {
        if (planId == "None") {
            toast.warning("To Add Courses You must have a Plan !!",{transition:Bounce});
            router.push('/plans')
        }
        else {
            setShowAddCourse(true)
        }
    }
    const useEffectFunction = async()=>{
        if (checkSession('subAminIDToken')) {
            let updatedList = localStorage.getItem('updatedCourseList');
            let subAdminToken = localStorage.getItem('subAminIDToken');
            let planID = localStorage.getItem('subAdminPlanIDToken');
            let courseListToken = localStorage.getItem('subAdminCourseListToken');
            let decodedplanID = jwtDecode(planID);
            let courseList = jwtDecode(courseListToken)
            setPlanId(decodedplanID.planId)
            if (updatedList==="true") {
                let response = await fetchCourseListForInstituteID(subAdminToken);
                if (response.success) {
                    setCourseIdList([...response.data])
                    localStorage.removeItem("updatedList");
                    localStorage.setItem("subAdminCourseListToken",response.tokenData);
                } else {
                    toast.error("There was a problem, Please Reload !",{transition:Bounce});
                }
            }
            else{
                
                setCourseIdList([...courseList.courseList])
            }
            setShowLoading(false);
        }
        else{
            toast.error("Sessiosn Expired!",{transition:Bounce});
            localStorage.clear();
            router.push("/login")
        }
    }
    useEffect(() => {
        useEffectFunction()
    }, [router.query.id])

    return (
        <div className={styles.mainDiv}>
            {showLoading && <Loading />}
            {showAddCourse && <AddCourseComp closeWindow={() => setShowAddCourse(false)} showLoading={() => setShowLoading(true)} hideLoading={()=> setShowLoading(false)} />}
            <InstitutetNav page={'courses'} />
            <button className={styles.menu} id='instMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.secondHeader}>
                    <h1 className={styles.normalHOne}>Courses</h1>
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