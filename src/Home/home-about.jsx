import './home-about.css';
import 'animate.css';
import side_head from '../Components/Assets/side-head.png';
import side_head_dark from '../Components/Assets/side-head-black.png';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const HomeAbout = () => {
    const { theme } = useTheme();
    return (
        <div className='about-container'>

            <div className="about-greeting">
                <div
                    className='about-greeting-empty-contianer-1'
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}
                >
                    <img
                        src={theme === 'dark' ? side_head_dark : side_head}
                        alt="Stylized side-profile portrait of Teng"
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain"
                        }}
                    />
                </div>
            </div>


            <div className="about-introduction">

                <div className='about-greeting-empty-contianer-2'>
                    <h1 className='about-gretting-hello-container'>Hello World,<br />I'm Teng.</h1>
                </div>

                <div className='about-introduction-content'>

                    <h2>
                        A final-year software engineering student who trying to specialize in full stack development.
                    </h2>

                    <div className='status-pill' role="status">
                        <span className='status-dot' aria-hidden="true" />
                        <span>Open to full-time backend / full-stack software engineer  &mdash; July 2026</span>
                    </div>

                    <ul className='contact-method'>
                        <li>
                            <a href="https://github.com/Jeremy030307-main" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className='icon-link'>
                                <i className="fa-brands fa-github fa-2xl"></i>
                            </a>
                        </li>

                        <li>
                            <a href="https://linkedin.com/in/teng-kong-cheng-439bba312" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className='icon-link'>
                                <i className="fa-brands fa-linkedin fa-2xl"></i>
                            </a>
                        </li>

                        <li>
                            <a href="mailto:jeremy030307@gmail.com" aria-label="Email" className="icon-link">
                                <i className="fa-solid fa-envelope fa-2xl"></i>
                            </a>
                        </li>

                    </ul>

                </div>

                <div className='about-me'>
                    <Link to="/about">About Me &gt;</Link>
                </div>

            </div>
        </div>
    );
};

export default HomeAbout;
