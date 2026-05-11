import { Link } from 'react-router-dom';
import './project-container.css';
import { projectSlug } from '../utils/slug';

const ProjectContainer = ({ index, projectName, projectDescription, projectTechStack, projectImage }) => {
    const techStack = Array.isArray(projectTechStack) ? projectTechStack.join(', ') : projectTechStack;

    return (
        <div className="project-container">

            <div className="project-text-container">
                <div>
                    <h2>{String(index + 1).padStart(2, '0')}/ {projectName}</h2>
                    <p>{projectDescription}</p>
                    <p>{techStack}</p>
                </div>

                <div className="project-more">
                    <Link to={`/projects/${projectSlug(projectName)}`}>More on this project &#8599;</Link>
                </div>
            </div>

            <div className="project-image-container">
                <img src={projectImage} alt={`${projectName} preview`} />
            </div>

        </div>
    );
};

export default ProjectContainer;
