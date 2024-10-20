import React from 'react'
import styles from './styles/faq.module.css'
import { FaChevronDown } from "react-icons/fa";

function FAQ() {
  return (
    <div className={styles.mainDiv}>
      <h2>Frequently Asked Questions</h2>
      <div className={styles.question}>
        <p>A sample question for testing purpose?</p>
        <span><FaChevronDown/></span>
      </div>
      <div className={styles.question}>
        <p>A sample question for testing purpose?</p>
        <span><FaChevronDown/></span>
      </div>
      <div className={styles.question}>
        <p>A sample question for testing purpose?</p>
        <span><FaChevronDown/></span>
      </div>
      <div className={styles.question}>
        <p>A sample question for testing purpose?</p>
        <span><FaChevronDown/></span>
      </div>
    </div>
  )
}

export default FAQ