import { useState, useRef, useEffect } from 'react';
import './navbar.css';
import logo from '../Assets/logo_kc.svg';
import darkLogo from '../Assets/logo_kc_dark.svg';
import { useScroll, motion, useMotionValueEvent } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

const Navbar = () => {
    const { pathname } = useLocation();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const { theme, toggle } = useTheme();

    const [scrolledClass, setScrolledClass] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollYProgress, 'change', (pos) => {
        setScrolledClass(pos === 0 ? '' : 'scrolled');
    });

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

    const themeButton = (
        <button
            type="button"
            className='theme-toggle'
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggle}
        >
            <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
        </button>
    );

    return (
        <motion.div className={`navbar ${scrolledClass} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className='nav-logo'>
                <Link to="/" aria-label="Home">
                    <img src={theme === 'dark' ? darkLogo: logo} alt="KC Teng logo" />
                </Link>
            </div>

            <ul className='nav-menu'>
                <li className={isActive('/about') ? 'active' : ''}>
                    <Link to="/about">About</Link>
                </li>
                <li className={isActive('/projects') ? 'active' : ''}>
                    <Link to="/projects">Projects</Link>
                </li>
                <li className='nav-theme-item'>
                    {themeButton}
                </li>
            </ul>

            <div className='nav-mobile-actions'>
                {themeButton}
                <button
                    type="button"
                    id="nav-icon1"
                    className={mobileOpen ? 'open' : ''}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setMobileOpen((v) => !v)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {mobileOpen && (
                <ul id="mobile-menu" className='mobile-menu'>
                    <li className={isActive('/about') ? 'active' : ''}>
                        <Link to="/about">About</Link>
                    </li>
                    <li className={isActive('/projects') ? 'active' : ''}>
                        <Link to="/projects">Projects</Link>
                    </li>
                </ul>
            )}
        </motion.div>
    );
};

export default Navbar;
