import React, { useRef } from 'react';
import './project.css';
import ProjectContainer from './project-container';
import useProjects from '../hooks/useProjects';
import { slugOf } from '../utils/slug';
import { gsap, useGSAP, EASE, prefersReducedMotion } from '../utils/gsap-setup';

const Project = () => {
    const { projects, error, loading } = useProjects();
    const root = useRef(null);

    // Each project block slides in from the side it sits on (alternating L/R via
    // the .flip class) as it scrolls into view, and its image gets a subtle
    // scrub parallax — the signature "agency portfolio" feel. Depends on
    // `projects` so it (re)runs once data has loaded and the DOM exists.
    useGSAP(() => {
        if (prefersReducedMotion()) return;

        gsap.utils.toArray('.project-container').forEach((el) => {
            const fromX = el.classList.contains('flip') ? 60 : -60;

            gsap.from(el, {
                autoAlpha: 0,
                x: fromX,
                duration: 1,
                ease: EASE,
                immediateRender: false,
                scrollTrigger: { trigger: el, start: 'top 82%' },
            });

            const img = el.querySelector('.project-image-container img');
            if (img) {
                gsap.set(img, { scale: 1.18 });
                gsap.fromTo(
                    img,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    }
                );
            }
        });
    }, { scope: root, dependencies: [projects], revertOnUpdate: true });

    return (
        <div className="projects-window" ref={root}>

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
                        <ProjectContainer
                            index={index}
                            flip={index % 2 === 1}
                            projectSlug={slugOf(project)}
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
