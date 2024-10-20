import {React, useEffect} from 'react'
import Link from 'next/link';
import styles from './styles/studentnav.module.css'
import { useRouter } from 'next/router';
import checkSession from '@/utils/checkSession';
function StudentNav({ page }) {
  const router = useRouter();
  const id = router.query.id;
  var home = <span>Profile</span>;
  var courses = <span>Courses</span>;
  var certificates = <span>Certificates</span>;
  // var invoices = <span>Invoices</span>;
  if (page == 'home') {
    home = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Profile</span>
  }
  else if (page == 'courses') {
    courses = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Courses</span>
  }
  else if (page == 'certificates') {
    certificates = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Certificates</span>
  }
  // else if (page == 'invoices') {
  //   invoices = <span style={{ backgroundColor: 'rgba(0, 49, 53, 1)' }}>Invoices</span>
  // }

  const toHomePage = () => {
    localStorage.removeItem("token");
    router.push(`/`);
  }
  useEffect(() => {
    let validSession = checkSession("token")
    if (!validSession) {
      alert("Unauthorized Login !")
      router.push('/')
    }
    
  }, [router.query.id])
  
  return (
      <div id='studentNav' className={styles.mainDiv}>
        <Link href={`/user/${id}`}>{home}</Link>
        <Link href={`/user/${id}/courses`}>{courses}</Link>
        <Link href={'/user/certificates/01'}>{certificates}</Link>
        {/* <Link href={'/user/invoices/01'}>{invoices}</Link> */}
        <button onClick={toHomePage}>LogOut</button>
      </div>
  )
}

export default StudentNav