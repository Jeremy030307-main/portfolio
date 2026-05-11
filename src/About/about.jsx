import { useEffect, useState } from 'react';
import './about.css';

const About = () => {
    const [timeline, setTimeline] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/AboutData/timeline.json')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load timeline');
                return res.json();
            })
            .then((data) => setTimeline(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="about-page-container">

            <div className='about-introduction-container'>

                <div className='about-text-content'>
                    <div>
                        <h1>I'm Teng Kong Cheng, a</h1>
                        <h1>Software Engineering Student</h1>
                    </div>
                    <p>
                        Hi! I'm Teng Kong Cheng, or you can call me Jeremy. A passionate Software Engineering student with a strong curiosity for building efficient, user-friendly, and impactful software solutions. I'm currently studying, where I'm gaining hands-on experience in full-stack development, object-oriented programming, and collaborative software projects.
                        From the first time I wrote a simple "Hello, World!" program, I knew I was hooked. Since then, I’ve been exploring everything from web and mobile development to data structures, algorithms, and cloud technologies. I enjoy turning ideas into real-world applications and constantly strive to improve my coding skills and problem-solving abilities.
                        Beyond code, I’m a firm believer in lifelong learning, teamwork, and clean design. I’ve worked on several academic and personal projects, and I’m always eager to take on new challenges that push me outside my comfort zone.
                    </p>
                </div>

                <div className='about-image-container'>
                    <img src="https://i.pinimg.com/736x/b8/96/b4/b896b4c31ad2a1009fe791e0fa54ea89.jpg" alt="" />
                </div>
            </div>

            <div className='scroll-hint' aria-hidden="true">
                <span className='material-symbols-outlined scroll-hint-arrow'>keyboard_arrow_down</span>
            </div>

            <div className='about-slide'>
                <div className="timeline-container">

                    <div className='timeline-content-wrapper' aria-hidden="true">
                        <div className='timeline-content-empty' />
                        <div className='timeline-content-container bottom timeline-spacer' />
                    </div>

                    {error && <p role="alert">Couldn't load timeline: {error}</p>}

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
