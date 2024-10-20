import React from 'react'
import Link from 'next/link';
import styles from '../styles/studentnav.module.css'
import { useRouter } from 'next/router';
function InstitutetNav({ page }) {
  const navigate = useRouter();
  const id = navigate.query.id;
  var home = <span>Profile</span>;
  var courses = <span>Courses</span>;
  var students = <span>Students</span>;
  var invoices = <span>Orders</span>;
  if (page == 'home') {
    home = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Profile</span>
  }
  else if (page == 'courses') {
    courses = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Courses</span>
  }
  else if (page == 'students') {
    students = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Students</span>
  }
  else if (page == 'orders') {
    invoices = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Orders</span>
  }

  const toHomePage = () => {
    localStorage.removeItem('subAdminListToken');
    localStorage.removeItem('subAdminToken');
    navigate.push(`/`);
    // localStorage.removeItem('')
  }
  return (
      <div id='instituteNav' className={styles.mainDiv}>
        <Link href={`/subadmin/${id}`}>{home}</Link>
        <Link href={`/subadmin/${id}/courses`}>{courses}</Link>
        <Link href={`/subadmin/${id}/students`}>{students}</Link>
        <Link href={`/subadmin/${id}/orders`}>{invoices}</Link>
        <button onClick={toHomePage}>LogOut</button>
      </div>
  )
}

export default InstitutetNav