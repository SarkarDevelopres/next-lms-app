import Link from 'next/link'
import React from 'react'
import styles from './styles/footer.module.css'
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaGooglePlusG } from "react-icons/fa";
function Footer() {
  return (
    <div className={styles.mainDiv}>
      <div className={styles.primaryFooter}>
        <h3>EduVoy-LMS</h3>
        <div className={styles.footerDesc}>
          <p className={styles.headPara}>Where the journey of learning begins.</p>
          <p>The industry best safety courses are now in your grasp. Become a certified safety personnel and advance your career with comprehensive training recognized by top organizations</p>
        </div>
        <div className={styles.linksDiv}>
          <Link href='/'>Home</Link>
          <Link href='/plan'>Pricings</Link>
          <Link href='/contact'>Contact Us</Link>
          <Link href='/user/login'>Student Portal</Link>
          <Link href='/login'>Institute Portal</Link>
        </div>
        <div className={styles.socialDiv}>
          <Link href='/'><FaFacebookSquare /></Link>
          <Link href='/'><FaInstagram /></Link>
          <Link href='/'><FaLinkedin /></Link>
          <Link href='/'><FaGooglePlusG /></Link>
        </div>
      </div>
      <div className={styles.secondaryFooter}>
        <p>
          <span>Copyright 2024 © reserved by <b>Eduvoylms</b>.</span>
          <span> | Privacy Policy & Terms of Service | </span>
          <span>Developed by <a href='https://www.sarkardevelopers.co.in' target="_blank">Sarkar Developers</a></span>
        </p>
      </div>
    </div>
  )
}

export default Footer