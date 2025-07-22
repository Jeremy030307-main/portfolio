import "./project-container.css"

const ProjectContainer = ({index, projectName, projectDescription, projectTechStack, projectImage}) => {
    
    return (
        <div className="project-container">

            <div className="project-text-container">
                <div>
                    <h2>{String(index + 1).padStart(2, '0')}/ {projectName}</h2>
                    <p>{projectDescription}</p>
                    <p>{projectTechStack}</p>
                </div>

                <div className="project-more">
                    <p>More on this project &#8599;</p>
                </div>
                
            </div>

            <div className="project-image-container">
                <img src={projectImage} alt=""/>
            </div>

        </div>
    )
}

export default ProjectContainer;