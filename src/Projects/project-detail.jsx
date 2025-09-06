import { useParams } from 'react-router-dom';
import './project-detail.css';
import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';

const ProjectDetail = () => {

  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/ProjectsData/${projectName}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => setProjectData(data))
      .catch((err) => setError(err.message));
  }, [projectName]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!projectData) return <div>Loading...</div>;

return (
    <div className='project-detail-container'>
        <h1>{String(projectData.id).padStart(2, '0')}/ {projectData.title}</h1>
        
        <div className='project-header-content'>
            <div>
                <img src={projectData.thumbnail} alt={projectData.title} />
            </div>
            
            <div className='project-text-content'>
                <div>
                    <p>{projectData.summary}</p>
                    <p style={{color:"#606060", paddingTop:"10px"}}>{projectData.technologies}</p>
                </div>

                <div className='project-link'>
                {projectData.githubLink && (
                    <a href={projectData.githubLink} target="_blank" rel="noopener noreferrer">
                    Github &#8599;
                    </a>
                )}
                
                {projectData.liveDemoLink && (
                    <a href={projectData.liveDemoLink} target="_blank" rel="noopener noreferrer">
                    Website &#8599;
                    </a>
                )}
                </div>
                
            </div>
        </div>

        <div>
            <h2>Overview</h2>
            <p>{projectData.overview}</p>
        </div>

        <hr className="project-content-divider" />

        <div className="key-features">
            <h2>Key Features</h2>
            <ul className="feature-list">
            {projectData.keyFeatures.map((feature, index) => (
                <li key={index} className="feature-item">
                <Collapsible
                    trigger={
                        <span className="feature-title">
                            <span>{feature.title}</span>
                            <span className="material-symbols-outlined">keyboard_arrow_right</span>
                        </span>
                    }
                    triggerWhenOpen={
                        <span className="feature-title" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>{feature.title}</span>
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </span>
                    }
                    transitionTime={200}
                >                    
                    <div className="feature-description">
                        {feature.gif && (
                            <div className='feature-image'>
                                <img src={feature.gif} alt={projectData.title} />
                            </div>
                        )}
                        <p>{feature.description}</p>
                    </div> 
                </Collapsible>
                </li>
                
            ))}
            </ul>
        </div>

        <hr className="project-content-divider" />

        <div>
            <h2>Tech Stacks</h2>
            <ul className="tech-stack-list">
                {projectData.techStacks.map((tech, index) => (
                <li key={index} className="tech-stack-item">
                    <p>
                    <strong className="tech-name">{tech.name}</strong> - 
                     {tech.description}
                    </p>
                    
                </li>
                ))}
            </ul>
        </div>


        <hr className="project-content-divider" />

        <div className="key-features">
            <h2>Challenges & Learning</h2>
            <ul className="feature-list">
            {projectData.challenges.map((feature, index) => (
                <li key={index} className="feature-item">
                <Collapsible
                    trigger={
                        <span className="feature-title">
                            <span>{feature.title}</span>
                            <span className="material-symbols-outlined">keyboard_arrow_right</span>
                        </span>
                    }
                    triggerWhenOpen={
                        <span className="feature-title" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>{feature.title}</span>
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                        </span>
                    }
                    transitionTime={200}
                >                    
                    <div className="feature-description">
                        <p>{feature.description}</p>
                    </div>
                </Collapsible>
                </li>
                
            ))}
            </ul>
        </div>

        <hr className="project-content-divider" />

        <div className="key-features">
            <h2>Live Demo</h2>
            <iframe width="560" height="315" src={projectData.liveDemoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  
        </div>

        <br /><br /><br />
    </div>
);
};

export default ProjectDetail;