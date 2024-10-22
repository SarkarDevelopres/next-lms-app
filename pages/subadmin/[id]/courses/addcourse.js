import { React, useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from '@/styles/institute.module.css'
import { CgMenuRound } from "react-icons/cg";
import { deleteChapterAPI, deleteCourseAPI, fetchChapterList, fetchCourseData, fetchUpdateCourse } from '@/utils/fetchAPIs';
import Loading from '@/components/Loading';
import ChapterEditComp from '@/components/instittueComponents/ChapterEditComp';
import { FaRegImage } from "react-icons/fa6";
import { MdModeEdit, MdDelete, MdDrafts } from "react-icons/md";
import { Bounce, Slide, Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export function ChapterComponent({ id, index, name, setShowChapterEditComp, setShow, setModal }) {
    const router = useRouter();
    const editChapter = () => {
        localStorage.setItem("currentChapterID", id);
        localStorage.setItem("currentChapterName", name);
        setShowChapterEditComp(true)
    }
    const deleteChapter = async () => {
        setShow(true);
        setModal({
            type: 'chapter',
            heading: 'Delete Chapter!',
            body: `Are you sure you wish to delete the chapter "${name}"? This action is irreversible.`,
            option: 'Delete',
            id: id, // Store the chapter ID here for reference
        });
    }
    return (
        <div className={styles.chapterComponent}>
            <span>{index + 1}</span>
            <span>{name}</span>
            <div className={styles.actionBtns}>
                <MdModeEdit onClick={editChapter} />
                <MdDelete onClick={() => deleteChapter()} />
            </div>
        </div>
    )
}

function addcourse() {
    const router = useRouter();
    // const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState({ type: "chapter", heading: "Delete Chapter !", body: "You sure you wish to delete the chapter? Knowing this is ireversible.", option: "Delete" })
    const fileInputRef = useRef(null); // Create a reference to the input element
    const [showLoading, setShowLoading] = useState(false);
    const [showChapterEditComp, setShowChapterEditComp] = useState(false)
    const [courseData, setCourseData] = useState({
        Title: 'Example Course Title Long',
        Image: '',
        Description: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>',
        PublishedOn: '01.10.2024',
        Price: '350',
        Published: false
    })
    const [currentChapter, setCurrentChapter] = useState({ Name: "", _id: "" });
    const [chapterList, setChapterList] = useState([]);
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const id = router.query.id;
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
                updated: true
            }));
            // console.log('Selected file:', file);
        }
    };
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
    const addChapter = async () => {
        let courseID = localStorage.getItem('currentCourse')
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/chapter/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ courseID: courseID, Name: currentChapter.Name })
        })
        let response = await request.json();
        if (response.success == true) {
            setChapterList((prevState) => [
                ...prevState,
                response.data
            ])
            setCurrentChapter({ Name: "", _id: "" });
        }
    }
    const updateCourse = async () => {
        setShowLoading(true);
        if (courseData.updated) {
            let courseID = localStorage.getItem('currentCourse')
            if (thumbnailImage) {
                // setAlert({show:true, message:"Yes it is there!!", variant:"success"})
                const formData = new FormData();
                formData.append('thumbnailImage', thumbnailImage);
                formData.append('courseID', courseID);
                const request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/uploadCourseImage`, {
                    method: 'POST',
                    body: formData // Send the FormData directly
                });

                let response = await request.json();
                console.log(response.success);
                const courseNewData = {
                    Title: courseData.Title,
                    Description: courseData.Description,
                }
                let otherResponse = await fetchUpdateCourse(courseID, courseNewData);

                if (response.success && otherResponse) {
                    toast.success('Course Updated Successfully !', {
                        transition: Bounce,
                    });

                }
                else {
                    alert('There was a problem try again !');
                    toast.error('Course Updated Successfully !', {
                        transition: Bounce,
                    });
                }
            } else {
                const courseNewData = {
                    Title: courseData.Title,
                    Description: courseData.Description,
                }
                let response = await fetchUpdateCourse(courseID, courseNewData);

                if (response) {
                    toast.success('Course Updated Successfully !', {
                        transition: Bounce,
                    });

                }
                else {
                    alert('There was a problem try again !');
                    toast.error('Course Updated Successfully !', {
                        transition: Bounce,
                    });
                }
            }
            setShowLoading(false)
        }
        else {
            setTimeout(() => {
                toast.success('Course Updated Successfully !', {
                    transition: Bounce,
                });
                setShowLoading(false)
            }, 2000);
        }
        router.push(`/subadmin/${id}/courses`);
        // setTimeout(() => {
        //     setAlert((prev) => ({ ...prev, show: false }));
        // }, 3000);
    }
    const publishCourse = async () => {
        let courseID = localStorage.getItem('currentCourse')
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/publish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: courseID, Published: true })
        })
        let response = await request.json();

        if (response.error == false) {
            toast.success('Course Published Successfully !', {
                transition: Bounce,
            });
        }
    }
    const getChapterList = async () => {
        let courseID = localStorage.getItem('currentCourse');
        fetchCourseData(courseID, setCourseData);
        fetchChapterList(courseID, setChapterList);
    }
    const deleteCourseSetup = () => {
        setShow(true);
        setModal({
            type: 'course',
            heading: 'Delete Course!',
            body: `Are you sure you wish to delete the course "${courseData.Title}"? This action is irreversible.`,
            option: 'Delete'
        });
    }
    const deleteData = async () => {
        setShow(false)
        setShowLoading(true);
        if (modal.id) {
            let response = await deleteChapterAPI(modal.id)
            if (response.success == true) {
                toast.success(`${response.message}`, {
                    transition: Bounce,
                });
                router.reload()
            } else {
                toast.error(`${response.message}`, {
                    transition: Bounce,
                });
            }
        } else {
            let courseID = localStorage.getItem('currentCourse')
            let response = await deleteCourseAPI(courseID)
            if (response.success == true) {
                toast.success(`${response.message}`, {
                    transition: Bounce,
                });
                router.push(`/subadmin/${id}/courses`);
                localStorage.setItem('updatedCourseList', "true");
                localStorage.removeItem("currentCourse");
            } else {
                toast.error(`${response.message}`, {
                    transition: Bounce,
                });
            }
        }
        setShowLoading(false)

    }
    useEffect(() => {
        getChapterList();
    }, [router.query.id])

    return (
        <div className={styles.mainDiv}>
            {showLoading && <Loading />}
            {showChapterEditComp && <ChapterEditComp closeWindow={() => setShowChapterEditComp(false)} showLoading={(isLoading) => setShowLoading(isLoading)} />}
            {
                <Modal id="deleteModal" show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modal.heading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modal.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => deleteData()}>
                            {modal.option}
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
            <section className={styles.bodySection} style={{ width: '100%' }}>
                <div className={styles.secondHeader}>
                    <h1 className={styles.normalHOne}>Edit Course</h1>
                </div>
                <div className={styles.content}>
                    <div className={styles.courseCreationDiv}>
                        <div className={styles.titleAndDescriptionDiv}>
                            <div className={styles.formElement}>
                                <label htmlFor='courseTitle'>Course Title</label>
                                <input id='courseTitle' value={courseData.Title} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Title: e.target.value, updated: true }))}></input>
                            </div>
                            <div className={styles.formElement}>
                                <label htmlFor='description'>Description</label>
                                <ReactQuill id='description' className={styles.quillOuterDiv} theme="snow" value={courseData.Description} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Description: e, updated: true }))} />
                            </div>
                            <div className={styles.formElement + " " + styles.noMargin}>
                                <label>Course Image</label>
                                <input id='thumbnailImage' type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }} // Hide the input
                                    onChange={handleFileChange} />
                                <div className={styles.thumbnailDiv}>
                                    {courseData.Image.secure_url != undefined || courseData.Image != '' ? (
                                        <img src={courseData.Image.secure_url || courseData.Image} onClick={handleButtonClick} />
                                    ) : (
                                        <>
                                            <FaRegImage />
                                            <button onClick={handleButtonClick}>Upload file</button>
                                        </>
                                    )
                                    }
                                    {/* <img src={thumbnailImage} altText='Thumbnail Image' /> */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.addChapterAndPrice}>
                            <div className={styles.formElement}>
                                <label>Add Chapters</label>
                                <div className={styles.thumbnailDiv + " " + styles.chapterDiv}>
                                    <input type='text' placeholder='Enter Chapter name here...' value={currentChapter.Name} onChange={(e) => setCurrentChapter((prevState) => ({ ...prevState, Name: e.target.value }))} />
                                    <button className={styles.addChapterBtn} onClick={addChapter}> + Add Chapter </button>
                                </div>
                            </div>
                            <div className={styles.formElement}>
                                <label>Edit Chapters</label>
                                <div className={styles.thumbnailDiv + " " + styles.chapterEditableListDiv}>
                                    <div className={styles.chaptersList} >
                                        {chapterList[0] ? (
                                            chapterList.map((e, index) => {
                                                return <ChapterComponent key={index} index={index} id={e._id} name={e.Name} setShowChapterEditComp={setShowChapterEditComp} setShow={setShow} setModal={setModal} />
                                            })
                                        ) :
                                            (
                                                <h3>No Chapters Yet !!</h3>
                                            )
                                        }
                                    </div >
                                    {/* <Link href={`/subadmin/${id}/courses/addchapter`} className={styles.addChapterBtn}>+ Add Chapter</Link> */}
                                </div>
                            </div>
                            <div className={styles.formElement}>
                                <label>Set Price</label>
                                <input type='number' value={courseData.Price} onChange={(e) => setCourseData((prevState) => ({ ...prevState, Price: e.target.value, }))} />
                            </div>
                            <div className={styles.deleteDraftBtnDiv}>
                                <button onClick={publishCourse}>{courseData.Published ? "Un-Publish" : "Publish"} Course <MdDrafts /></button>
                                <button onClick={deleteCourseSetup}>Delete Course <MdDelete /></button>
                            </div>
                            <button className={styles.uplopadBtn} onClick={updateCourse}>Update Course</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default addcourse

