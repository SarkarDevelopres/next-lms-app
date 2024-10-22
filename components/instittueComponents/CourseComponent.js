import { React, useState, useEffect } from 'react'
import styles from '../styles/courseCompInst.module.css'
import { MdModeEdit, MdDelete } from "react-icons/md";
import { fetchCourseData } from '@/utils/fetchAPIs';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
function CourseComponent({ id }) {
    const router = useRouter();
    const [courseData, setCourseData] = useState({
        Title: 'Example Course Title Long',
        Image: '/../../course-example-thumbnail.png',
        Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.',
        PublishedOn: '01.10.2024',
        Price: '350',
    })
    const editCourse = ()=>{
        localStorage.setItem('currentCourse',id);
        let subadminIdToken = localStorage.getItem('subAminIDToken');
        let subAdminID = jwtDecode(subadminIdToken);
        router.push(`/subadmin/${subAdminID.id}/courses/addcourse`);
    }
    useEffect(() => {
        fetchCourseData(id, setCourseData);
    }, [id])
    return (
        <div className={styles.mainDiv}>
            <div className={styles.imageDiv} style={{backgroundImage:`url(${courseData?.Image?.secure_url || courseData.Image})`}}></div>
            <div className={styles.detailsDiv}>
                <h2>{courseData.Title}</h2>
                <div className={styles.descDiv} dangerouslySetInnerHTML={{ __html: courseData.Description }}></div>
                <p className={styles.publishedOn}>{`Published On: ${courseData.PublishedOn}`}</p>
                <div className={styles.priceBtnsDiv}>
                    <p>{`$ ${courseData.Price}`}</p>
                    <div className={styles.btnDiv}>
                        <button onClick={editCourse} className={styles.editButton}>Edit Course <MdModeEdit/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseComponent