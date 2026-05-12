import { Link } from 'react-router-dom';
import './project-container.css';
import { projectSlug } from '../utils/slug';

const ProjectContainer = ({ index, projectName, projectDescription, projectTechStack, projectImage }) => {
    const techStack = Array.isArray(projectTechStack) ? projectTechStack.join(', ') : projectTechStack;

    return (
        <div className="project-container">

            <h2 className="project-title">
                {String(index + 1).padStart(2, '0')}/ {projectName}
            </h2>

            <div className="project-image-container">
                <img src={projectImage} alt={`${projectName} preview`} />
            </div>

            <div className="project-body">
                <p>{projectDescription}</p>
                <p>{techStack}</p>
                <div className="project-more">
                    <Link to={`/projects/${projectSlug(projectName)}`}>More on this project &#8599;</Link>
                </div>
            </div>

        </div>
    );
};

export default ProjectContainer;
