import { useEffect, useState } from 'react';
import './about.css';
import me_transparent from '../Components/Assets/me_transparent.png';

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
        <div className="about-page">
            <div className="about-grid">

                {/* STICKY PROFILE */}
                <aside className="profile">
                    <img className="profile-photo" src={me_transparent} alt="Portrait of Teng Kong Cheng" />
                    <div>
                        <div className="profile-name">Teng Kong Cheng</div>
                        <div className="profile-role">Software Engineering Student · “Jeremy”</div>
                    </div>
                    <div className="facts">
                        <div className="fact"><span className="fk">Location</span><span className="fv">Malaysia</span></div>
                        <div className="fact"><span className="fk">Studying</span><span className="fv">B. Software Eng (Hons)</span></div>
                        <div className="fact"><span className="fk">Focus</span><span className="fv">Full-stack · Backend</span></div>
                        <div className="fact"><span className="fk">Status</span><span className="fv green">Open · July 2026</span></div>
                    </div>
                    <div className="profile-social">
                        <a href="https://github.com/Jeremy030307-main" target="_blank" rel="noopener noreferrer" className="chip">GitHub ↗</a>
                        <a href="https://linkedin.com/in/teng-kong-cheng-439bba312" target="_blank" rel="noopener noreferrer" className="chip">LinkedIn ↗</a>
                        <a href="mailto:jeremy030307@gmail.com" className="chip">Email</a>
                    </div>
                </aside>

                {/* CONTENT */}
                <div className="about-content">
                    <section className="about-block">
                        <p className="eyebrow">About</p>
                        <h1 className="about-title">A Software Engineering student building efficient, user-friendly software.</h1>
                        <p className="about-body about-lead">
                            I work across full-stack web and backend systems — from React front-ends to
                            Java and Node services. It started with a simple “Hello, World!”, and turned
                            into a habit of shipping real, useful projects.
                        </p>
                        <p className="about-body">
                            Beyond the code I care about clean design, working well in a team, and learning
                            constantly. I like challenges that push me a little past what I already know how to do.
                        </p>
                    </section>

                    <section className="about-block">
                        <h2 className="h-sec">Skills &amp; tools</h2>
                        {error && <p role="alert">{error}</p>}
                        <dl className="skills">
                            {skills.map((group) => (
                                <div className="skill-row" key={group.category}>
                                    <dt className="k">{group.category}</dt>
                                    <dd className="chips">
                                        {group.skills.map((skill) => (
                                            <span className="chip" key={skill.name}>{skill.name}</span>
                                        ))}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className="about-block">
                        <h2 className="h-sec">Journey</h2>
                        <div className="timeline">
                            {timeline.map((item) => (
                                <div className="tl-item" key={`${item.year}-${item.title}`}>
                                    <span className="node" />
                                    <div className="tl-yr">{item.year}</div>
                                    <h4>{item.title}</h4>
                                    <div className="tl-where">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default About;
