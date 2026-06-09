import React from 'react';
import './project.css';
import ProjectContainer from './project-container';
import useProjects from '../hooks/useProjects';
import Reveal from '../Components/Reveal';

const Project = () => {
    const { projects, error, loading } = useProjects();

    return (
        <div className="projects-window">

            <header className='project-header'>
                <p className="eyebrow">Work</p>
                <h1>Projects.</h1>
                <p className="project-lead">
                    A selection of things I've designed, built, and shipped, from native iOS apps to game AI.
                </p>
            </header>

            <div>
                {loading && <p>Loading projects…</p>}
                {error && <p role="alert">Couldn't load projects: {error}</p>}

                {projects.map((project, index) => (
                    <React.Fragment key={project.title}>
                        <Reveal>
                            <ProjectContainer
                                index={index}
                                flip={index % 2 === 1}
                                projectName={project.title}
                                projectDescription={project.description}
                                projectTechStack={project.skillset}
                                projectImage={project.image}
                            />
                        </Reveal>
                        {index !== projects.length - 1 && <hr className="project-divider" />}
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};

export default Project;
