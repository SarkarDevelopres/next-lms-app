import { React, useState } from 'react'
import styles from '../../../styles/institute.module.css'
import { CgMenuRound } from "react-icons/cg";
import { MdInfoOutline, MdDelete } from "react-icons/md";
import InstitutetNav from '@/components/instittueComponents/InstituteNav';
import CourseComponent from '@/components/instittueComponents/CourseComponent';

export function StudentComp({ index, name, id, phone }) {
    var whiteColor = 'rgb(255,255,255)'
    var greyColor = 'rgb(238 238 238)'
    return (
        <div className={styles.studentCompDiv} style={{ backgroundColor: `${index % 2 == 0 ? whiteColor : greyColor}` }}>
            <span>{index + 1}</span>
            <p>{id}</p>
            <p className={styles.name}>{name}</p>
            <p>{phone}</p>
            <MdDelete />
        </div>
    )
}

function students() {
    const [studentList, setStudentList] = useState([{ _id: '789209hnw', Name: "Rakesh Pandey", Phone: 9582372038 }, { _id: '786429ebe', Name: "Kirty Patel", Phone: 9749272056 }, { _id: '712356tev', Name: "Sanjay Sharma", Phone: 934657727 }, { _id: '793345tev', Name: "Gaurav Birla", Phone: 9366859541 }]);
    const [studentData, setStudentData] = useState({
        FirstName: 'Sagnik',
        LastName: 'Sarkar',
        Phone: "9715863498",
        Email: "sarkar123@gmail.com",
        Password: '',
        ConfirmPassword: ''
    })
    const handleUpdate = (e) => {
        setStudentData((s) => ({ ...s, [e.target.name]: e.target.value }))
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
    const doItLater = () => { }
    return (
        <div className={styles.mainDiv}>
            <InstitutetNav page={'students'} />
            <button className={styles.menu} id='instMenu' onClick={showNav}><CgMenuRound /></button>
            <section className={styles.bodySection}>
                <div className={styles.header}>
                    <h1>Students</h1>
                </div>
                <div className={styles.coursesList}>
                    {studentList.map((e, index) => {
                        return <StudentComp key={index} index={index} name={e.Name} id={e._id} phone={e.Phone} />
                    })}
                </div>
                <div className={styles.content}>
                    <div className={styles.studentAddSection}>
                        <h2>Add Single Student</h2>
                        <div className={styles.detailsDiv}>
                            <div className={styles.detailsFieldsDiv}>
                                <p>First Name</p>
                                <div className={styles.input}>
                                    <input value={studentData.FirstName} name='FirstName' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Last Name</p>
                                <div className={styles.input}>
                                    <input value={studentData.LastName} name='LastName' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Email</p>
                                <div className={styles.input}>
                                    <input value={studentData.Email} name='Email' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Phone</p>
                                <div className={styles.input}>
                                    <input value={studentData.Phone} name='Phone' type='number' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            <div className={styles.detailsFieldsDiv}>
                                <p>Password</p>
                                <div className={styles.input}>
                                    <input value={studentData.Password} name='Password' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                            
                            <div className={styles.detailsFieldsDiv}>
                                <p>Confirm Password</p>
                                <div className={styles.input}>
                                    <input value={studentData.ConfirmPassword} name='ConfirmPassword' type='text' onChange={(e) => handleUpdate(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonDiv + " " + styles.coursesBtn}>
                        <button>Add Student</button>
                    </div>
                    <div className={styles.studentAddSection}>
                        <div className={styles.addSectionHeading}><h2>Add Multiple Students</h2> <MdInfoOutline/></div>
                        <div className={styles.addMultipleStudentInput}>
                            <label htmlFor='studentFile'>
                                <span>Click to add file .csv , .xls or .xlsm file</span>
                            </label>
                            <input id='studentFile' accept=".csv,.xls,.xlsm" style={{display:'none'}} type='file' onChange={doItLater}/>
                            <button>Add Students</button>
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    )
}

export default students