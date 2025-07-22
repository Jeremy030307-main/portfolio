import './home-about.css';
import 'animate.css';
import side_head from '../Components/Assets/side-head.png'
import { useNavigate } from 'react-router-dom';

const HomeAbout = () => {

    const navigate = useNavigate()

    return (
        <div className='about-container' >

            <div  className="about-greeting">
                <div className='about-greeting-empty-contianer-1' 
                    style={{
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center", 
                        overflow: "hidden"
                    }}
                >
                    <img 
                        src={side_head} 
                        alt="Side Head"
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
            

            <div  className="about-introduction">

                <div className='about-greeting-empty-contianer-2'>
                    <h1 className='about-gretting-hello-container'>Hello World,<br/>I'm Teng.</h1>
                </div>
                
                <div className='about-introduction-content'>

                    <h2>
                    A senior-year software engineering student who trying to specialize in full stack development. 
                    </h2>
                    
                    <ul className='contact-method'>
                        <li>
                            <a href="https://github.com/Jeremy030307-main" target="_blank" rel="noopener noreferrer" className='icon-link'>
                                <i className="fa-brands fa-github fa-2xl"></i>
                            </a>
                         </li>

                         <li>
                            <a href="https://www.linkedin.com/in/jeremy-teng-439bba312/" target="_blank" rel="noopener noreferrer" className='icon-link'>
                                <i className="fa-brands fa-linkedin fa-2xl"></i>
                            </a>
                         </li>

                         <li>
                            <a href="mailto:jeremy030307@email.com" className="icon-link">
                                <i className="fa-solid fa-envelope fa-2xl"></i>
                            </a>
                         </li>

                    </ul>

                </div>

                <div className='about-me'>
                    <p onClick={() => {navigate('about')}}>About Me &gt; </p>
                </div>

            </div>
        </div>  

    )
}

export default HomeAbout;


