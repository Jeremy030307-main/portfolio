import React from 'react';
import './project.css';
import ProjectContainer from './project-container';
import useProjects from '../hooks/useProjects';

const Project = () => {
    const { projects, error, loading } = useProjects();

    return (
        <div className="projects-window">

            <div className='project-header'>
                <h1>Projects.</h1>
                <p className="project-lead">
                    A selection of things I've designed, built, and shipped — from native iOS apps to game AI.
                </p>
            </div>

            <div>
                {loading && <p>Loading projects…</p>}
                {error && <p role="alert">Couldn't load projects: {error}</p>}

                {projects.map((project, index) => (
                    <React.Fragment key={project.title}>
                        <ProjectContainer
                            index={index}
                            projectName={project.title}
                            projectDescription={project.description}
                            projectTechStack={project.skillset}
                            projectImage={project.image}
                        />
                        {index !== projects.length - 1 && <hr className="project-divider" />}
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};

export default Project;
