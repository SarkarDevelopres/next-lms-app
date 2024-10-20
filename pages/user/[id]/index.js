import React, { useState, useRef, useEffect } from 'react'
import StudentNav from '../../../components/StudentNav'
import styles from '../../../styles/student.module.css'
import { BiSolidPencil } from "react-icons/bi";
import { useRouter } from 'next/router';
import { CgMenuRound } from "react-icons/cg";
import { fetchCourseListForInstituteID, fetchUserDetails } from '@/utils/fetchAPIs';
function Student() {
    const router = useRouter();
    const [mainImg, setMainImg] = useState('')
    const [userData, setUserData] = useState({
        FirstName: 'Sagnik',
        Image: { secure_url: '../profile.png' },
        LastName: 'Sarkar',
        Phone: "9715863498",
        Email: "sarkar123@gmail.com",
    });
    const [updateData, setUpdateData] = useState({
        Name: '',
        Phone: "",
        Email: "",
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
    })
    const handleUpdate = (e) => {
        setUpdateData((s) => ({ ...s, [e.target.name]: e.target.value }))
    }
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
    const doItLater = () => { }
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            fetchUserDetails(token, setUserData);
            fetchCourseListForInstituteID(token)
        }
    }, [router.query.id])

    return (
        <div className={styles.mainDiv}>
            <StudentNav page={"home"} />
            <button className={styles.menu} id='stdMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.header}>
                    <div className={styles.innerHeader}>
                        <label htmlFor='profilePic'>
                            <img src={userData.Image.secure_url || '../profile.png'} alt='profile pic' />
                        </label>
                        <input id='profilePic' name='mainImg' type='file' style={{ display: 'none' }} onChange={doItLater} />
                        <div className={styles.headDetailsDiv}>
                            <h1>{userData.FirstName + " " + userData.LastName}</h1>
                            <p>{userData.Email}</p>
                            <p>{userData.Phone}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.updateSection}>
                        <h2>Update Profile</h2>
                        <div className={styles.detailsDiv}>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Name</p>
                                <div className={styles.input}>
                                    <input value={updateData.Name} name='Name' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Email</p>
                                <div className={styles.input}>
                                    <input value={updateData.Email} name='Email' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Phone</p>
                                <div className={styles.input}>
                                    <input value={updateData.Phone} name='Phone' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Old Password</p>
                                <div className={styles.input}>
                                    <input value={updateData.OldPassword} name='OldPassword' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>New Password</p>
                                <div className={styles.input}>
                                    <input value={updateData.NewPassword} name='NewPassword' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Confirm Password</p>
                                <div className={styles.input}>
                                    <input value={updateData.ConfirmPassword} name='ConfirmPassword' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                        </div>
                        <button className={styles.viewMore}>Update</button>
                    </div>
                    <div className={styles.continueDiv}>
                        <p>Continue Watching</p>
                        <div className={styles.videosList}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Student