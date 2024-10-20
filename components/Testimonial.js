import React from 'react'
import styles from './styles/testimonial.module.css'
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";
function Testimonial() {
  return (
    <div className={styles.mainDiv}>
      <h2>Our Customers' Say</h2>
      <div className={styles.list}>
        <div className={styles.testimonyCard}>
          <div className={styles.clientDetails}>
            <img src='./user_profile.webp' />
            <div className={styles.clientAbout}>
              <span className={styles.clientName}>Deepak Chowdary</span>
              <span>Trainer at XYZ Institute</span>
            </div>
          </div>
          <p>“As a long-time administrator in the public sector, I've seen various training tools and platforms
            come and go, but this Learning Management System truly stands out. Our agency has been
            using it for over a year, and the impact on our training efficiency and effectiveness is
            unmistakable. The user interface is intuitive and easy to navigate, which significantly reduces
            the learning curve for our staff.” </p>
        </div>
      </div>
      <div className={styles.navButtons}>
        <FaCircleArrowLeft />
        <FaCircleArrowRight />
      </div>
    </div>
  )
}

export default Testimonial