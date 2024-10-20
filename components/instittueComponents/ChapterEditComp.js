import { React, useState, useEffect, useMemo, useRef } from 'react'
import styles from '@/styles/institute.module.css'
import { useRouter } from 'next/router';
import { FaRegImage } from "react-icons/fa6";
import { AiOutlineCloseCircle } from "react-icons/ai";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { fetchChapterData } from '@/utils/fetchAPIs';
function ChapterEditComp({ closeWindow, showLoading }) {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [chapterData, setChapterData] = useState({
        _id: '',
        Name: '',
        Description: '',
        VideoURL: ''
    })
    const [file, setfile] = useState(null)
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        // Programmatically trigger the click event on the input element
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        // Handle the selected file here
        const file = event.target.files[0];
        const videoURL = URL.createObjectURL(file);
        setfile(file);
        setChapterData((prevState => ({ ...prevState, VideoURL: videoURL })));
        console.log('Selected file:', file);
    };
    const closePopUpBox = () => {
        localStorage.removeItem("currentChapterName");
        localStorage.removeItem("currentChapterID");
        closeWindow();
    }
    const uploadFile = async () => {
        showLoading(true);
        const chapterDataID = {
            _id: chapterData._id,
            Name: chapterData.Name,
            Description: chapterData.Description
        }
        if (file) {
            const formData = new FormData();
            formData.append('chapterData', JSON.stringify(chapterDataID)); // Convert chapterData to string
            formData.append('videoFile', file); // Append the actual file
    
            try {
                const request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/chapter/upload`, {
                    method: 'POST',
                    body: formData // Send the FormData directly
                });
                const response = await request.json();
                if (response.success == true) {
                    alert(response.message);
                    showLoading(false)
                    closePopUpBox();
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            const request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/chapter/update`, {
                    method: 'POST',
                    body: JSON.stringify(chapterDataID) // Send the FormData directly
                });
                const response = await request.json();
                if (response.success == true) {
                    alert(response.message);
                    showLoading(false)
                    closePopUpBox();
                }
        }
    }
    useEffect(() => {
        let id = (localStorage.getItem("currentChapterID"))
        fetchChapterData(id, setChapterData)
    }, [])

    return (
        <div className={styles.greatMaskDiv}>
            <div className={styles.contentAbsolute}>
                <div className={styles.courseCreationDiv}>
                    <div className={styles.titleAndDescriptionDiv}>
                        <button className={styles.closeBtn} onClick={closePopUpBox}><AiOutlineCloseCircle /></button>
                        <div className={styles.formElement}>
                            <label htmlFor='courseTitle'>Chapter Name</label>
                            <input id='courseTitle' value={chapterData.Name} onChange={(e) => setChapterData((prevState => ({ ...prevState, Name: e.target.value })))}></input>
                        </div>
                        <div className={styles.formElement}>
                            <label htmlFor='description'>Description</label>
                            <ReactQuill id='description' className={styles.quillOuterDiv + " " + styles.chpaterQuill} theme="snow" value={chapterData.Description} onChange={(value) => setChapterData((prevState) => ({ ...prevState, Description: value, }))} />
                        </div>
                    </div>
                    <div className={styles.formElement + " " + styles.videoDiv}>
                        <div>
                            <label>Video</label>
                            <input id='thumbnailImage' type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }} // Hide the input
                                onChange={handleFileChange}
                                accept=".mp4, .mkv" />
                            <div className={styles.thumbnailDiv} style={{ marginBottom: '15px' }}>
                                {!chapterData.VideoURL ? (
                                    <>
                                        <FaRegImage />
                                        <button onClick={handleButtonClick}>Upload file</button>
                                    </>
                                ) : (
                                    <video controls>
                                        <source src={chapterData.VideoURL} />
                                    </video>
                                )}
                                {/* <img src={thumbnailImage} altText='Thumbnail Image' /> */}
                            </div>
                        </div>
                        <button className={styles.uplopadBtn} onClick={() => uploadFile()}>Upload Chapter</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChapterEditComp
