import { React, useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router';
import styles from '../styles/addCourseComp.module.css'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCourseComp({ closeWindow, showLoading, hideLoading }) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [thumbnailImage, setThumbnailImage] = useState({
        name: '',
        type: '',
        path: ''
    });
    const [courseData, setCourseData] = useState({
        Title: '',
        Image: '',
        Description: '',
        Price: ''
    })
    const [uploadDetails, setUploadDetails] = useState({})
    const router = useRouter();
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        // Programmatically trigger the click event on the input element
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        // Handle the selected file here
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setThumbnailImage(file);
            setCourseData((prevState) => ({
                ...prevState,
                Image: imageUrl,
            }));
            // console.log('Selected file:', file);
        }
    };
    const registerCourse = async () => {
        showLoading();
        let subAdminToken = localStorage.getItem('subAminIDToken');

        const formData = new FormData();
        formData.append('courseData', JSON.stringify(courseData)); // Convert courseData to string
        formData.append('thumbnailImage', thumbnailImage); // Append the actual file
        formData.append('InstituteIDToken', JSON.stringify(subAdminToken));

        // console.log(formData);

        try {
            const request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/upload`, {
                method: 'POST',
                body: formData // Send the FormData directly
            });

            let response = await request.json();
            if (response.success) {
                    localStorage.setItem('updatedCourseList', "true");
                    toast.success(`${response.message}`,{transition:Bounce});
                    closeWindow()
                    router.reload();
                } else {
                    toast.error("There was a problem retrieving data!",{transition:Bounce});
                    router.reload();
                }
        } catch (error) {
            console.error("Error while registering course:", error);
            toast.error("An error occurred. Please try again.",{transition:Bounce});
        }
        hideLoading();
    };


    return (
        <div className={styles.addCourseMainDiv} style={{ backgroundColor: 'rgba(70,70,70,0.7)', zIndex: '10' }}>
            <div className={styles.titleAndDescriptionDiv}>
                <button className={styles.closeBtn} onClick={closeWindow}><AiOutlineCloseCircle /></button>
                <div className={styles.contentDiv}>
                    <div className={styles.formElement}>
                        <label htmlFor='courseTitle'>Course Title</label>
                        <input id='courseTitle' value={courseData.Title} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Title: e.target.value, }))}></input>
                    </div>
                    <div className={styles.formElement}>
                        <label htmlFor='description'>Description</label>
                        <ReactQuill id='description' className={styles.quillOuterDiv} theme="snow" value={courseData.Description} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Description: e, }))} />
                    </div>
                </div>
                <div className={styles.imageDiv}>
                    <div className={styles.formElement + " " + styles.noMargin}>
                        <label>Course Image</label>
                        <input id='thumbnailImage' type="file" accept=".jpg, .jpeg, .png, .webp"
                            ref={fileInputRef}
                            style={{ display: 'none' }} // Hide the input
                            onChange={handleFileChange} />
                        <div className={styles.thumbnailDiv}>
                            {courseData.Image!='' ? (
                                <img src={courseData.Image} />
                            ) : (
                                <>
                                    <FaRegImage />
                                    <button onClick={handleButtonClick}>Upload file</button>
                                </>
                            )
                            }
                        </div>
                    </div>
                    <div className={styles.formElement}>
                        <label htmlFor='price'>Price</label>
                        <input id='price' type='number' value={courseData.Price} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Price: e.target.value, }))}></input>
                    </div>
                    <button className={styles.uploadBtn} onClick={registerCourse}>Register Course</button>
                </div>
            </div>
        </div>
    )
}

export default AddCourseComp