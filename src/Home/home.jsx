import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './home.css';
import useProjects from '../hooks/useProjects';
import { projectSlug } from '../utils/slug';
import me_transparent from '../Components/Assets/me_transparent.png';

const ABOUT_ICONS = [
    {
        word: 'Hooping',
        label: 'Basketball',
        paths: [
            { type: 'circle', cx: 12, cy: 12, r: 9 },
            { d: 'M12 3 V21' },
            { d: 'M3 12 H21' },
            { d: 'M5.6 5.6 Q12 12 5.6 18.4' },
            { d: 'M18.4 5.6 Q12 12 18.4 18.4' },
        ],
    },
    {
        word: 'Over-caffeinated',
        label: 'Coffee',
        paths: [
            { d: 'M6 8.5 H15 V14 a4 4 0 0 1 -4 4 H10 a4 4 0 0 1 -4 -4 Z' },
            { d: 'M15 10 h2 a2.5 2.5 0 0 1 0 5 h-2' },
            { d: 'M9 3.4 q -1 1.4 0 2.8' },
            { d: 'M12 3.4 q -1 1.4 0 2.8' },
        ],
    },
    {
        word: 'Building things',
        label: 'Code',
        paths: [
            { d: 'M8.5 8 L4 12 L8.5 16' },
            { d: 'M15.5 8 L20 12 L15.5 16' },
            { d: 'M13.4 6.5 L10.6 17.5' },
        ],
    },
    {
        word: 'Music always on',
        label: 'Music',
        paths: [
            { d: 'M5 13 v-1 a7 7 0 0 1 14 0 v1' },
            { d: 'M6.6 13 A1.8 1.8 0 0 1 8 14.7 V17.5 A1.8 1.8 0 0 1 4.4 17.5 V14.7 A1.8 1.8 0 0 1 6.6 13 Z' },
            { d: 'M17.4 13 A1.8 1.8 0 0 0 16 14.7 V17.5 A1.8 1.8 0 0 0 19.6 17.5 V14.7 A1.8 1.8 0 0 0 17.4 13 Z' },
        ],
    },
    {
        word: 'Always exploring',
        label: 'Travel',
        paths: [
            { d: 'M21 3 L3 10.5 L9.5 13 L12 20 Z' },
            { d: 'M21 3 L9.5 13' },
        ],
    },
];

const AboutMeArt = () => {
    const [active, setActive] = useState(0);
    const [prev, setPrev] = useState(-1);
    const timerRef = useRef(null);

    const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    const startTimer = () => {
        if (reduceMotion) return;
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActive((cur) => {
                setPrev(cur);
                return (cur + 1) % ABOUT_ICONS.length;
            });
        }, 2600);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className="hero-art" aria-label="A little about me">
            <div className="ln-stage">
                {ABOUT_ICONS.map((icon, i) => {
                    const cls =
                        i === active ? 'ln-icon draw' : i === prev ? 'ln-icon erase' : 'ln-icon';
                    return (
                        <div className={cls} key={icon.word} data-word={icon.word}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                {icon.paths.map((p, j) =>
                                    p.type === 'circle' ? (
                                        <circle
                                            className="ln"
                                            key={j}
                                            cx={p.cx}
                                            cy={p.cy}
                                            r={p.r}
                                            pathLength="100"
                                        />
                                    ) : (
                                        <path className="ln" key={j} d={p.d} pathLength="100" />
                                    )
                                )}
                            </svg>
                        </div>
                    );
                })}
            </div>
            <span className="ln-word show" key={ABOUT_ICONS[active].word}>
                {ABOUT_ICONS[active].word}
            </span>
        </aside>
    );
};

const Home = () => {
    const { projects, error } = useProjects();
    const selected = projects.slice(0, 3);

    return (
        <div className="home">

            {/* HERO */}
            <section className="home-hero">
                <div className="hero-grid">
                    <div className="hero-lead">
                        <p className="eyebrow">Software Engineering Student · Monash Malaysia</p>

                        <h1 className="display">
                            Building <span className="green">useful</span>, well-made software.
                        </h1>

                        <div className="hero-meta">
                            <img className="hero-portrait" src={me_transparent} alt="Portrait of Teng Kong Cheng" />
                            <p>
                                I'm Teng Kong Cheng (Jeremy) — a full-stack &amp; backend developer based in
                                Malaysia who likes turning ideas into things people actually use. Open to
                                full-time roles from July 2026.
                            </p>
                        </div>

                        <div className="hero-cta">
                            <Link to="/projects" className="btn btn-primary">
                                View my work <span className="arr">↓</span>
                            </Link>
                            <a href="mailto:jeremy030307@gmail.com" className="btn">Get in touch</a>
                        </div>
                    </div>

                    <AboutMeArt />
                </div>
            </section>

            {/* RECENT WORK */}
            <section className="home-work" id="work">
                <div className="work-head">
                    <h2 className="h-sec">Recent work</h2>
                    <Link to="/projects" className="work-all">All projects ↗</Link>
                </div>

                {error && <p role="alert">Couldn't load projects: {error}</p>}

                <div className="hi-list">
                    {selected.map((project) => (
                        <Link
                            key={project.title}
                            to={`/projects/${projectSlug(project.title)}`}
                            className="hi-row"
                        >
                            <span className="hi-thumb">
                                <img src={project.image} alt={`${project.title} preview`} />
                            </span>
                            <span className="hi-name">{project.title}</span>
                            <span className="hi-desc">{project.tagline || project.description}</span>
                            <span className="hi-meta">
                                {project.year && <span className="hi-year">{project.year}</span>}
                                <span className="hi-arr">↗</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Home;
