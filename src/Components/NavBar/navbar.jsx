import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import logo from '../Assets/logo_kc.svg'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'motion/react';

const Navbar = () => {

    const [menu, setMenu] = useState("");

    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
      target : ref,
    })

    const [scrolledClass, setScrolledClass] = useState("");
    useMotionValueEvent(scrollYProgress, "change", (pos) => {
        setScrolledClass(pos === 0 ? "" : "scrolled");
    });

    
    useEffect(() => {
        const navIcons = document.querySelectorAll('#nav-icon1');
    
        const handleToggleClass = (event) => {
          event.currentTarget.classList.toggle('open');
        };
    
        // Add event listeners
        navIcons.forEach((icon) => {
          icon.addEventListener('click', handleToggleClass);
        });
    
        // Cleanup function
        return () => {
          navIcons.forEach((icon) => {
            icon.removeEventListener('click', handleToggleClass);
          });
        };
      }, []);
    
    return (
        <motion.div className={`navbar ${scrolledClass}`}>
            <div className='nav-logo'>
                <img onClick={() => {setMenu("home")}} src={logo} alt=''/>
            </div>

            <ul className='nav-menu'>
                <li  className={menu === "about" ? "active" : ""}
                     onClick={() => {setMenu("about")}}>
                        About
                </li>

                <li  className={menu === "projects" ? "active" : ""}
                     onClick={() => {setMenu("projects")}}>
                        Projects
                </li>

                <li  className={menu === "blogs" ? "active" : ""}
                     onClick={() => {setMenu("blogs")}}>
                        Blogs
                </li>
            </ul>

            <div id="nav-icon1">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </motion.div>

    );

}

export default Navbar;