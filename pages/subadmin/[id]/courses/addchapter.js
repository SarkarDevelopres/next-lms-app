import { React, useState, useEffect, useMemo, useRef } from 'react'
import styles from '@/styles/institute.module.css'
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import { FaRegImage } from "react-icons/fa6";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
function addchapter() {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const [showLoading, setShowLoading] = useState(false);
    const [value, setValue] = useState('');
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        // Programmatically trigger the click event on the input element
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        // Handle the selected file here
        const file = event.target.files[0];
        console.log('Selected file:', file);
    };
    return (
        <div className={styles.mainDiv}>
            {showLoading && <Loading />}
            <section className={styles.bodySection} style={{ width: '100%' }}>
                <div className={styles.header}>
                    <div className={styles.header}>
                        <h1>Add Chapter</h1>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default addchapter