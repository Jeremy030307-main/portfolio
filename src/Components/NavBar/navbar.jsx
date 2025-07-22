import React, { useState, useRef } from 'react';
import './navbar.css';
import logo from '../Assets/logo_kc.svg'
import { useScroll, motion, useMotionValueEvent } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [menu, setMenu] = useState("");
    const navigate = useNavigate()
    const ref = useRef(null)
    const {scrollYProgress} = useScroll({
      target : ref,
    })

    const [scrolledClass, setScrolledClass] = useState("");
    useMotionValueEvent(scrollYProgress, "change", (pos) => {
        setScrolledClass(pos === 0 ? "" : "scrolled");
    });

    const handleNavigate = (pathName) => {
      setMenu(pathName)
      navigate("/"+pathName)
    }
    
    return (
        <motion.div className={`navbar ${scrolledClass}`}>
            <div className='nav-logo'>
                <img onClick={() => {handleNavigate("")}} src={logo} alt=''/>
            </div>

            <ul className='nav-menu'>
                <li  className={menu === "about" ? "active" : ""}
                     onClick={() => {handleNavigate("about")}}>
                        About
                </li>

                <li  className={menu === "projects" ? "active" : ""}
                     onClick={() => {handleNavigate("projects")}}>
                        Projects
                </li>

                <li  className={menu === "blogs" ? "active" : ""}
                     onClick={() => {handleNavigate("blogs")}}>
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