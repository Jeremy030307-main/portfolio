import './home-about.css';
import 'animate.css';
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

const HomeAbout = () => {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"]
    });


    const scale = useTransform(scrollYProgress, [0.5,0.2], [0.8, 1])

    return (
        <>
        <motion.div ref={ref} className='about-home'>
            <motion.div style={{scale}} className='about-container' >
                <div className='about'>
                    <div className="about-greeting">
                        <h1><span>Hello,</span><br/><span>I'm Jeremy.</span></h1>
                    </div>

                    <div className="about-introduction">
                        <h2>
                        A senior-year software engineering student who trying to specialize in full stack development. 
                        </h2>
                        
                        <ul className='contact-method'>
                            <li><i className="fa-brands fa-github fa-2xl"></i></li>
                            <li><i className="fa-brands fa-linkedin fa-2xl"></i></li>
                            <li><i className="fa-solid fa-envelope fa-2xl"></i></li>
                        </ul>

                        <p className='about-me'>About Me &gt; </p>
                    </div>
                </div>              
            </motion.div>
        </motion.div>
        </>
    )
}

export default HomeAbout;


