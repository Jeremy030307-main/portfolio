import { Link } from 'react-router-dom';
import './home.css';
import useProjects from '../hooks/useProjects';
import { projectSlug } from '../utils/slug';
import Reveal from '../Components/Reveal';
import me_transparent from '../Components/Assets/me_transparent.png';

const FOCUS = [
    {
        k: '01',
        title: 'Full-stack web',
        body: 'React and React Native front-ends wired to Node, Express and FastAPI services.',
    },
    {
        k: '02',
        title: 'Backend systems',
        body: 'Java and Python services, REST APIs, auth and relational data done properly.',
    },
    {
        k: '03',
        title: 'Shipping products',
        body: 'End to end, from a Figma file to a real app people can actually open and use.',
    },
];

const Home = () => {
    const { projects, error } = useProjects();
    const selected = projects.slice(0, 4);

    return (
        <div className="home">

            {/* HERO */}
            <section className="hero">
                <p className="hero-eyebrow">
                    <span className="dot" aria-hidden="true" />
                    Open to full-time roles, July 2026
                </p>

                <h1 className="hero-title">
                    I build <span className="ink">useful,</span>
                    <br />
                    well-made <span className="ink">software.</span>
                </h1>

                <div className="hero-foot">
                    <div className="hero-id">
                        <img className="hero-portrait" src={me_transparent} alt="Portrait of Teng Kong Cheng" />
                        <p>
                            Teng Kong Cheng <span className="alias">(Jeremy)</span>, a full-stack and backend
                            developer and Software Engineering student at Monash University Malaysia.
                        </p>
                    </div>

                    <div className="hero-cta">
                        <Link to="/projects" className="btn btn-primary">View work</Link>
                        <a href="mailto:jeremy030307@gmail.com" className="btn">Get in touch</a>
                    </div>
                </div>
            </section>

            {/* FOCUS */}
            <section className="focus" aria-label="What I do">
                <div className="focus-grid">
                    {FOCUS.map((item, i) => (
                        <Reveal className="focus-card" key={item.k} delay={i * 90}>
                            <span className="focus-k">{item.k}</span>
                            <h3 className="focus-title">{item.title}</h3>
                            <p className="focus-body">{item.body}</p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* SELECTED WORK */}
            <section className="work" id="work">
                <Reveal className="work-head" as="header">
                    <h2 className="work-title">Selected work</h2>
                    <Link to="/projects" className="work-all">All projects ↗</Link>
                </Reveal>

                {error && <p role="alert">Couldn't load projects: {error}</p>}

                <ol className="index">
                    {selected.map((project, i) => (
                        <Reveal as="li" className="index-item" key={project.title} delay={i * 70}>
                            <Link
                                to={`/projects/${projectSlug(project.title)}`}
                                className="index-row"
                            >
                                <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="index-name">{project.title}</span>
                                <span className="index-tag">{project.tagline || project.description}</span>
                                <span className="index-meta">
                                    {project.year && <span className="index-year">{project.year}</span>}
                                    <span className="index-arr" aria-hidden="true">↗</span>
                                </span>
                                <span className="index-thumb" aria-hidden="true">
                                    <img src={project.image} alt="" loading="lazy" />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </ol>
            </section>

            {/* CONTACT */}
            <Reveal className="contact" as="section">
                <h2 className="contact-title">Let's build something.</h2>
                <p className="contact-sub">
                    I'm looking for a full-time role from July 2026. The fastest way to reach me is email.
                </p>
                <div className="contact-links">
                    <a href="mailto:jeremy030307@gmail.com" className="btn btn-primary">Email me</a>
                    <a href="https://github.com/Jeremy030307-main" target="_blank" rel="noopener noreferrer" className="btn">GitHub ↗</a>
                    <a href="https://linkedin.com/in/teng-kong-cheng-439bba312" target="_blank" rel="noopener noreferrer" className="btn">LinkedIn ↗</a>
                </div>
            </Reveal>

        </div>
    );
};

export default Home;
