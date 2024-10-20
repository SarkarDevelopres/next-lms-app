import {React, useState, useEffect} from "react"
import styles from '@/styles/coursePlayer.module.css'
import Accordion from 'react-bootstrap/Accordion';
import { fetchChapterData } from "@/utils/fetchAPIs";
function VideoChapterComponent({index, name, id}) {
    const [chapterData, setChapterData] = useState({
        Description:'Loading....'
    });
  useEffect(() => {
    fetchChapterData(id,setChapterData)
  }, [id])
  
    return (
      <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header className={styles.accordianHeader}>{name}</Accordion.Header>
        <Accordion.Body>
          <p>{chapterData.Description}</p>
        </Accordion.Body>
      </Accordion.Item>
    )
  }

export default VideoChapterComponent