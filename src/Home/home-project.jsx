import { useScroll, useTransform, motion } from 'motion/react';
import './home-project.css';
import 'animate.css';
import pic1 from '../Components/Assets/picture1.jpg'
import pic2 from '../Components/Assets/picture2.jpg'
import pic3 from '../Components/Assets/picture3.jpg'
import { useRef } from 'react';


const HomeProject = () => {

    const ref = useRef(null);
    
    const projects = [
        {
            image: pic1,
            title: "Project 1",
            description: "blah blah blah",
            skillset: "blah blah blah"
        },
        {
            image: pic2,
            title: "Project 2",
            description: "blah blah blah",
            skillset: "blah blah blah"
        },
        {
            image: pic3,
            title: "Project 3",
            description: "blah blah blah",
            skillset: "blah blah blah"
        }
    ]

    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const projectDisplay = [
        useTransform(scrollYProgress, (pos) => {
            return  pos > 0.1 ? "none": ""
        }),
        useTransform(scrollYProgress, (pos) => {
            return pos > 0.45 || pos < 0.1 ? "none": ""
        }),
        useTransform(scrollYProgress, (pos) => {
            return 0.45 > pos > 0.6  ? "none": ""
        }),
    ]

    const imageOpacity = [
        useTransform(scrollYProgress, [0, 0.1], [1, 0]),
        useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0,1,1, 0]),
        useTransform(scrollYProgress, [0.45, 0.6], [0,1])
    ]

    const imageScale = [
        useTransform(scrollYProgress, [0, 0.1], [1, 0.95]),
        useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [1.05, 1, 1, 0.95]),
        useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [1.05, 1, 1, 0.95]),
    ]

    const textTranslateY = [
        useTransform(scrollYProgress, [0, 0.1], ["0%", "-20%"]),
        useTransform(scrollYProgress, [0.1, 0.45], ["80%", "-20%"]),
        useTransform(scrollYProgress, [0.45, 0.6], ["80%", "0%"])
    ]

    return (
        <div ref={ref} className='home-project-scrollable-container'>
            <div  className='home-project-container' >

                <div className='home-project-header'>
                    <h1>Projects</h1>
                </div>

                {projects.map((project, index) => (
                    <motion.div className='home-project-content' style={{display: projectDisplay[index]}}>
                        <motion.div className="home-project-image" style={{
                                    opacity: imageOpacity[index],
                                    scale: imageScale[index]
                            }}>
                            <img src={project.image} alt=""/>
                        </motion.div>

                        <motion.div  className="home-project-introduction" style={{y: textTranslateY[index], opacity: imageOpacity[index]}}>
                            <h2>{project.title}</h2>
                            <p>
                                {project.description} <br />
                                {project.skillset} <br />
                            </p>
                            
                        </motion.div>
                    </motion.div>  
                ))}

            <p>More Projects &gt;</p>

            </div>
        </div>
    )
}

export default HomeProject;


