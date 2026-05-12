import { useEffect, useState } from 'react';
import './about.css';
import me from '../Components/Assets/me.png';

const About = () => {
    const [timeline, setTimeline] = useState([]);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('/AboutData/timeline.json').then((r) => {
                if (!r.ok) throw new Error('timeline');
                return r.json();
            }),
            fetch('/AboutData/skills.json').then((r) => {
                if (!r.ok) throw new Error('skills');
                return r.json();
            }),
        ])
            .then(([timelineData, skillsData]) => {
                setTimeline(timelineData);
                setSkills(skillsData);
            })
            .catch((err) => setError(`Failed to load ${err.message}`));
    }, []);

    return (
        <div className="about-page-container">

            <div className='about-introduction-container'>

                <div className='about-headings'>
                    <h1>I'm Teng Kong Cheng, a</h1>
                    <h1>Software Engineering Student</h1>
                </div>

                <div className='about-image-container'>
                    <img src={me} alt="Portrait of Teng Kong Cheng" />
                </div>

                <div className='about-description'>
                    <p>
                        Hi! I'm Teng Kong Cheng, or you can call me Jeremy. A passionate Software Engineering student with a strong curiosity for building efficient, user-friendly, and impactful software solutions. I'm currently studying, where I'm gaining hands-on experience in full-stack development, object-oriented programming, and collaborative software projects.
                        From the first time I wrote a simple "Hello, World!" program, I knew I was hooked. Since then, I’ve been exploring everything from web and mobile development to data structures, algorithms, and cloud technologies. I enjoy turning ideas into real-world applications and constantly strive to improve my coding skills and problem-solving abilities.
                        Beyond code, I’m a firm believer in lifelong learning, teamwork, and clean design. I’ve worked on several academic and personal projects, and I’m always eager to take on new challenges that push me outside my comfort zone.
                    </p>
                </div>
            </div>

            <section className='skills-section' aria-labelledby='skills-heading'>
                <h2 id='skills-heading' className='skills-heading'>Skills &amp; Tools</h2>

                {error && <p role='alert'>{error}</p>}

                <div className='skills-grid'>
                    {skills.map((group) => (
                        <div className='skills-group' key={group.category}>
                            <h3 className='skills-group-title'>{group.category}</h3>
                            <ul className='skills-list'>
                                {group.skills.map((skill) => (
                                    <li className='skill-chip' key={skill.name}>
                                        {skill.icon && <i className={skill.icon} aria-hidden="true" />}
                                        <span>{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <div className='scroll-hint' aria-hidden="true">
                <span className='material-symbols-outlined scroll-hint-arrow'>keyboard_arrow_down</span>
            </div>

            <div className='about-slide'>
                <div className="timeline-container">

                    <div className='timeline-content-wrapper' aria-hidden="true">
                        <div className='timeline-content-empty' />
                        <div className='timeline-content-container bottom timeline-spacer' />
                    </div>

                    {timeline.map((item, index) => {
                        const position = index % 2 === 0 ? 'top' : 'bottom';
                        const content = (
                            <div className={`timeline-content-container ${position}`}>
                                <div className='timeline-content-year'><p>{item.year}</p></div>
                                <div className='timeline-content-description'>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        );

                        return (
                            <div className='timeline-content-wrapper' key={index}>
                                {position === 'top' ? (
                                    <>
                                        {content}
                                        <div className='timeline-content-empty' />
                                    </>
                                ) : (
                                    <>
                                        <div className='timeline-content-empty' />
                                        {content}
                                    </>
                                )}
                            </div>
                        );
                    })}

                    <div className='timeline-content-wrapper' aria-hidden="true">
                        <div className='timeline-content-empty' />
                        <div className='timeline-content-container bottom timeline-spacer' />
                    </div>

                </div>

                <div className='timeline-flow' aria-hidden="true">
                    <span className='timeline-flow-pulse' />
                    <span className='timeline-flow-arrow'>&rsaquo;</span>
                </div>
            </div>

        </div>
    );
};

export default About;
