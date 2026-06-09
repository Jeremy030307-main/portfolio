import { Link } from 'react-router-dom';
import './project-container.css';
import { projectSlug } from '../utils/slug';

const ProjectContainer = ({ index, flip = false, projectName, projectDescription, projectTechStack, projectImage }) => {
    const techStack = Array.isArray(projectTechStack) ? projectTechStack.join(', ') : projectTechStack;

    return (
        <div className={`project-container${flip ? ' flip' : ''}`}>

            <h2 className="project-title">
                <span className="project-num">{String(index + 1).padStart(2, '0')}/</span> {projectName}
            </h2>

            <div className="project-image-container">
                <img src={projectImage} alt={`${projectName} preview`} />
            </div>

            <div className="project-body">
                <p className="project-desc">{projectDescription}</p>
                <p className="project-stack">{techStack}</p>
                <div className="project-more">
                    <Link to={`/projects/${projectSlug(projectName)}`}>
                        More on this project <span className="project-arr">&#8599;</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectContainer;
