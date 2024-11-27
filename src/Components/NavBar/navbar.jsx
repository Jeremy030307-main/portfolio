import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from '../Assets/logo.png'

const Navbar = () => {

    const [menu, setMenu] = useState("");

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
        <div className='navbar'>
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
        </div>

    );

}

export default Navbar;