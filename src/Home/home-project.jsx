import { useScroll, useTransform, motion } from 'motion/react';
import './home-project.css';
import 'animate.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import { projectSlug } from '../utils/slug';

const HomeProject = () => {
    const ref = useRef(null);
    const { projects, error } = useProjects();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const projectDisplay = [
        useTransform(scrollYProgress, (pos) => (pos > 0.1 ? "none" : "")),
        useTransform(scrollYProgress, (pos) => (pos > 0.45 || pos < 0.1 ? "none" : "")),
        useTransform(scrollYProgress, (pos) => (pos < 0.45 ? "none" : "")),
    ];

    const imageOpacity = [
        useTransform(scrollYProgress, [0, 0.1], [1, 0]),
        useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [0, 1, 1, 0]),
        useTransform(scrollYProgress, [0.45, 0.6], [0, 1]),
    ];

    const imageScale = [
        useTransform(scrollYProgress, [0, 0.1], [1, 0.95]),
        useTransform(scrollYProgress, [0.1, 0.2, 0.35, 0.45], [1.05, 1, 1, 0.95]),
        useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [1.05, 1, 1, 0.95]),
    ];

    const textTranslateY = [
        useTransform(scrollYProgress, [0, 0.1], ["0%", "-20%"]),
        useTransform(scrollYProgress, [0.1, 0.45], ["80%", "-20%"]),
        useTransform(scrollYProgress, [0.45, 0.6], ["80%", "0%"]),
    ];

    return (
        <div ref={ref} className='home-project-scrollable-container'>
            <div className='home-project-container'>

                <div className='home-project-header'>
                    <h1>Projects</h1>
                </div>

                {error && <p role="alert">Couldn't load projects: {error}</p>}

                {projects.slice(0, 3).map((project, index) => (
                    <motion.div key={project.title} className='home-project-content' style={{ display: projectDisplay[index] }}>
                        <motion.div className="home-project-image" style={{ opacity: imageOpacity[index], scale: imageScale[index] }}>
                            <img src={project.image} alt={`${project.title} preview`} />
                        </motion.div>

                        <motion.div className="home-project-introduction" style={{ y: textTranslateY[index], opacity: imageOpacity[index] }}>
                            <div>
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                <p>{Array.isArray(project.skillset) ? project.skillset.join(', ') : project.skillset}</p>
                            </div>

                            <div className='home-project-link'>
                                <Link to={`/projects/${String(index + 1).padStart(2, '0')}-${projectSlug(project.title)}`}>More on this project &#8599;</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}

                <div className='more-projects'>
                    <Link to="/projects">More Projects &gt;</Link>
                </div>

            </div>
        </div>
    );
};

export default HomeProject;
