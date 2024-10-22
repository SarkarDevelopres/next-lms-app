import { React, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import Link from 'next/link';
import styles from './styles/navbar.module.css'
function Navbar() {
  const [style, setStyle] = useState({ maxHeight: '150px' })
  const showNav = () => {
    const resNav = document.getElementById('resNav');
    const menu = document.getElementById('menu');
    if (resNav.style.maxHeight == '') {
      resNav.style.maxHeight = '150px';
      menu.style.border = '2px solid rgb(210,210,210)';
    } else {
      resNav.style.maxHeight = '';
      menu.style.border = 'none';
    }
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.mainNavbar}>
        <h2>EduVoy-LMS</h2>
        <div className={styles.navLinks}>
          <Link href={"/"}>Home</Link>
          <Link href={"/plans"}>Plans</Link>
          <Link href={"/shop"}>Shop</Link>
          <Link href={"/contact"}>Contact Us</Link>
          <Link href={"/login"}>Login</Link>
        </div>
        <div className={styles.menuBtn} id='menu'>
          <IoMenu onClick={showNav} />
        </div>
      </div>
      <div id='resNav' className={styles.secondaryNavbar}>
        <div className={styles.secondaryNavLinks}>
          <Link href={"/"}>Home</Link>
          <Link href={"/plans"}>Plans</Link>
          <Link href={"/shop"}>Shop</Link>
          <Link href={"/contact"}>Contact Us</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar