import "./project.css"
import ProjectContainer from './project-container';
import { useEffect, useState } from "react";

const Project = () => {

        const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
    fetch(`/ProjectsData/projects.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => setError(err.message));
  }, []);
    
    return (
        <div className="projects-window">

            <div className='project-header'>
                    <h1>Projects.</h1>
            </div>

            <div>
                {projects.map((project, index) => (
                    <>
                        <ProjectContainer key={project.id || index} project={project} index={index} projectName={project.title} projectDescription={project.description} projectTechStack={project.skillset} projectImage={project.image}/>
                        {index !== projects.length - 1 && <hr className="project-divider" />}
                    </>
                ))}
                

            </div>

        </div>
    )
}

export default Project;