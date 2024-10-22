import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
import { easeLinear } from "d3-ease";
import AnimatedProgressProvider from "@/circularProgressBar/AnimatedProgressProvider";
import Loading from '@/components/Loading'
import styles from '@/styles/institute.module.css'
import { BiSolidPencil } from "react-icons/bi";
import { CgMenuRound } from "react-icons/cg";
import checkSession from '@/utils/checkSession';
import InstitutetNav from '@/components/instittueComponents/InstituteNav';
import { jwtDecode } from 'jwt-decode';
function index() {
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(true)
    const [mainImg, setMainImg] = useState('../react.svg');
    const [dataUsed, setDataUsed] = useState(0)
    const [subAdminData, setSubAdminData] = useState({
        Name: 'ABC Training Institute',
        Phone: "9715863498",
        Email: "sarkar123@gmail.com",
        Address: {
            BuildingNo: '112/A',
            LaneAddress: 'Lathi Lane',
            City: 'Gandhinagar',
            State: 'TamilNadu',
            Country: 'India',
            Pincode: '789223'
        },
        PlanId: 'No Plan Purchased',
        Courses: [],
        Students: [],
        Videos: [],
        Data: 'No Plan Purchased',
        Certificates: [],
        CurrentMonthRevenue: 'No Plan Purchased',
        TotalRevenue: 'No Plan Purchased'
    });
    const [updateData, setUpdateData] = useState({
        Name: '',
        Phone: "",
        Email: "",
        Address: {
            BuildingNo: '',
            LaneAddress: '',
            City: '',
            State: '',
            Country: '',
            Pincode: ''
        },
    })
    const handleUpdate = (e) => {
        setUpdateData((s) => ({ ...s, [e.target.name]: e.target.value }))
    }
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
    const fetchAccountDetails = async () => {

        let token = localStorage.getItem('subAminIDToken');
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/subadmin/fetchAccountDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ token: token })
        })
        let response = await request.json();
        if (response.success === true) {
            // Update the subAdminData state by merging the new data
            setSubAdminData(prevData => ({
                ...prevData,  // Keep the existing data
                ...response.data,
            }));
            setShowLoading(false);
            let courseListToken = localStorage.getItem("subAdminCourseListToken")
            let courseList = jwtDecode(courseListToken);
            let studentListToken = localStorage.getItem("subAdminStudentListToken")
            let studentList = jwtDecode(studentListToken);
            let planIDToken = localStorage.getItem("subAdminPlanIDToken")
            let planID = jwtDecode(planIDToken);
            setSubAdminData(prevData=>({
                ...prevData,
                Courses:courseList.courseList,
                Students:studentList.studentList,
                PlanId:planID.planId
            }))
        }
        else {
            alert(response.message);
        }

    }
    const doItLater = () => { }
    useEffect(() => {
        let sessionValid = checkSession('subAminIDToken')
        if (sessionValid) {
            fetchAccountDetails();
        } else {
            alert("Session Expired !!");
            router.push('/login');
        }
    }, [])

    return (
        <div className={styles.mainDiv}>
            {showLoading && <Loading />}
            <InstitutetNav page={'home'} />
            <button className={styles.menu} id='instMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.header}>
                    <div className={styles.innerHeader}>
                        <label htmlFor='profilePic'>
                            <img src={mainImg} alt='profile pic' />
                        </label>
                        <input id='profilePic' name='mainImg' type='file' style={{ display: 'none' }} onChange={doItLater} />
                        <div className={styles.headDetailsDiv}>
                            <h1>{subAdminData.Name}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.instituteNameDetails}>
                        <h2>{subAdminData.Name}</h2>
                        <div className={styles.instituteDetails}>
                            <div className={styles.addressDiv}>
                                {subAdminData.Address.BuildingNo == "" ? (
                                    <h3>No Address Added Yet !</h3>
                                ) : (
                                    <>
                                        <p>{`${subAdminData.Address.BuildingNo}, ${subAdminData.Address.LaneAddress}, ${subAdminData.Address.City}, ${subAdminData.Address.State},`}</p>
                                        <p>{`${subAdminData.Address.Country}, ${subAdminData.Address.Pincode}`}</p>
                                    </>
                                )}
                            </div>
                            <div>
                                <p>{subAdminData.Email}</p>
                                <p>{`+91 ${subAdminData.Phone}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accountDetailsAndGraph}>
                        <div className={styles.accountDetails}>
                            <li><span>{`Total Courses:`}</span><span>{subAdminData.Courses?.length ?? 0}</span></li>
                            <li><span>{`Total Students:`}</span><span>{subAdminData.Students?.length ?? 0}</span></li>
                            <li><span>{`Certificate Generated:`}</span><span>{subAdminData.Certificates?.length ?? 0}</span></li>
                        </div>

                        <div className={styles.dataUsedDiv}>
                            <li>Total Data Used:</li>
                            <AnimatedProgressProvider
                                valueStart={0}
                                valueEnd={dataUsed}
                                duration={100} // Duration should now be exactly 5 seconds
                                easingFunction={easeLinear} // Linear easing for consistent timing
                                repeat={false} // Ensure it runs only once
                            >
                                {value => {
                                    const roundedValue = Math.round(value);
                                    return (
                                        <CircularProgressbar
                                            value={value}
                                            text={`${roundedValue}%`}
                                            styles={buildStyles({
                                                pathTransitionDuration: 0.5, // Keep transitions between steps smooth
                                            })}
                                        />
                                    );
                                }}
                            </AnimatedProgressProvider>
                        </div>
                        <div className={styles.subscriptionPlan}>
                            {subAdminData.PlanId != "None" ? (
                                <>
                                    <li>Subscription Plan:</li>
                                    <p>{subAdminData.PlanId}</p>
                                </>
                            )
                                : (
                                    <>
                                        <li>Subscription Plan:</li>
                                        <h3>No Plan Bought !</h3>
                                    </>
                                )
                            }
                            <button>{subAdminData.PlanId != "None" ?"Upgrade Plan":"Buy Plan"}</button>
                        </div>
                    </div>
                    <div className={styles.updateSection}>
                        <h2>Update Profile</h2>
                        <div className={styles.updateForm}>
                            <div className={styles.detailsFieldsDiv + ` ` + styles.nameInput}>
                                <p>Name</p>
                                <div className={styles.input}>
                                    <input value={updateData.Name} name='Name' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv + ` ` + styles.phoneInput}>
                                <p>Phone</p>
                                <div className={styles.input}>
                                    <input value={updateData.Phone} name='Phone' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Email</p>
                                <div className={styles.input}>
                                    <input value={updateData.Email} name='Email' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>

                            <div className={styles.detailsFieldsDiv}>
                                <p>Building No.</p>
                                <div className={styles.input}>
                                    <input value={updateData.Address.BuildingNo} name='BuildingNo' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Lane Address</p>
                                <div className={styles.input}>
                                    <input value={updateData.Address.LaneAddress} name='LaneAddress' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>City</p>
                                <div className={styles.input}>
                                    <input value={updateData.Address.City} name='City' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>State</p>
                                <div className={styles.input}>
                                    <input value={updateData.Address.State} name='State' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Pincode</p>
                                <div className={styles.input}>
                                    <input value={updateData.Address.Pincode} name='Pincode' type='number' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.buttonDiv}>
                                <button>Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default index