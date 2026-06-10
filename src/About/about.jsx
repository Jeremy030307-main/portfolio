import { useEffect, useRef, useState } from 'react';
import './about.css';
import Reveal from '../Components/Reveal';
import me_transparent from '../Components/Assets/me_transparent.png';
import { gsap, ScrollTrigger, useGSAP, EASE, prefersReducedMotion } from '../utils/gsap-setup';

const About = () => {
    const [timeline, setTimeline] = useState([]);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);
    const root = useRef(null);

    // Intro reveal: masked title (same move as the hero) + eyebrow. This is
    // data-independent, so it runs once on mount with no dependencies — keeping
    // it out of the data-driven hook below avoids it replaying when fetches land.
    useGSAP(() => {
        if (prefersReducedMotion()) return;
        gsap.timeline({ defaults: { ease: EASE } })
            .from('.about-intro .eyebrow', { autoAlpha: 0, y: 12, duration: 0.6 })
            .from('.about-title .line-inner', { yPercent: 115, duration: 1.05 }, '-=0.35');
    }, { scope: root });

    // Scroll reveals that depend on fetched content (skills, timeline). Re-runs
    // when data lands; revertOnUpdate fully cleans up the previous run first so
    // nothing is left stranded at its hidden start state. immediateRender:false
    // keeps scroll-triggered "from" tweens from hiding content before they fire.
    useGSAP(() => {
        if (prefersReducedMotion()) return;

        gsap.from('.profile', {
            autoAlpha: 0,
            x: -40,
            duration: 1,
            ease: EASE,
            immediateRender: false,
            scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
        });

        // Skill chips: a lively batched pop-in as the skills section enters.
        const chips = gsap.utils.toArray('.skills .chip');
        if (chips.length) {
            gsap.set(chips, { autoAlpha: 0, y: 16, scale: 0.9 });
            ScrollTrigger.batch(chips, {
                start: 'top 90%',
                onEnter: (batch) =>
                    gsap.to(batch, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.55,
                        ease: 'back.out(1.7)',
                        stagger: 0.04,
                        overwrite: true,
                    }),
            });
        }

        // Journey: each entry reveals in sequence, its node scaling in like a
        // pin dropping onto the line — the timeline reads as a story unfolding.
        gsap.utils.toArray('.tl-item').forEach((item) => {
            gsap.timeline({
                defaults: { ease: EASE, immediateRender: false },
                scrollTrigger: { trigger: item, start: 'top 88%' },
            })
                .from(item, { autoAlpha: 0, x: -24, duration: 0.7 })
                .from(item.querySelector('.node'), {
                    scale: 0,
                    transformOrigin: 'center',
                    duration: 0.5,
                    ease: 'back.out(2)',
                }, '-=0.45');
        });
    }, { scope: root, dependencies: [timeline, skills], revertOnUpdate: true });

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
        <div className="about-page" ref={root}>

            {/* OPENING STATEMENT */}
            <header className="about-intro">
                <p className="eyebrow">About</p>
                <h1 className="about-title">
                    <span className="line">
                        <span className="line-inner">
                            I'm a Software Engineering student who likes turning ideas into
                            things people <span className="ink">actually use.</span>
                        </span>
                    </span>
                </h1>
            </header>

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
                    <Reveal className="about-block" as="section">
                        <p className="about-body about-lead">
                            I work across full-stack web and backend systems, from React front-ends to
                            Java and Node services. It started with a simple “Hello, World!”, and turned
                            into a habit of shipping real, useful projects.
                        </p>
                        <p className="about-body">
                            Beyond the code I care about clean design, working well in a team, and learning
                            constantly. I like challenges that push me a little past what I already know how to do.
                        </p>
                    </Reveal>

                    <Reveal className="about-block" as="section">
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
                    </Reveal>

                    <Reveal className="about-block" as="section">
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
                    </Reveal>
                </div>

            </div>
        </div>
    );
};

export default About;
