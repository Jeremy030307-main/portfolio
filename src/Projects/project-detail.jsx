import { Link, useParams } from 'react-router-dom';
import './project-detail.css';
import { Fragment, useEffect, useState } from 'react';
import { slugOf } from '../utils/slug';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    let cancelled = false;

    fetch(`/ProjectsData/${projectName}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setProjectData(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    // Pull rail meta (role / year / tagline) + the next project from the index.
    fetch('/ProjectsData/projects.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((index) => {
        if (!index || cancelled) return;
        const list = Object.values(index);
        const i = list.findIndex((p) => slugOf(p) === projectName);
        if (i === -1) return;
        setMeta(list[i]);
        setNextProject(list[(i + 1) % list.length]);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [projectName]);

  // Spy on sections so the rail index highlights the one in view.
  useEffect(() => {
    if (!projectData) return undefined;
    const sections = Array.from(document.querySelectorAll('[data-section]'));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e) => setActiveSection(e.target.getAttribute('data-section')));
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [projectData]);

  if (error)
    return (
      <div className="pd-shell" role="alert">
        Error: {error}
      </div>
    );
  if (!projectData) return <div className="pd-shell">Loading…</div>;

  const {
    title,
    summary,
    overview,
    technologies,
    thumbnail,
    keyFeatures = [],
    challenges = [],
    architecture,
    liveDemoLink,
    demoLink,
    demo,
    problem,
    solution,
    process = [],
    screens: screensData,
  } = projectData;

  const archFlow = architecture?.flow || [];
  const archExternal = architecture?.external || [];
  const hasArchitecture = archFlow.length > 0;

  const hasDemo = Boolean(demo);
  const hasProblem = Boolean(problem || solution);
  const hasProcess = process.length > 0;

  const role = meta?.role || 'Solo — design & build';
  const year = meta?.year;
  const tagline = meta?.tagline;

  // Github link(s) — JSON uses either a single githubLink or a githubLinks array.
  const githubLinks = Array.isArray(projectData.githubLinks)
    ? projectData.githubLinks
    : projectData.githubLink
    ? [{ url: projectData.githubLink, label: 'GitHub' }]
    : [];

  // Screens = the dedicated `screens` array, falling back to any key features
  // that carry a screenshot (older data shape). Normalised to { image, caption }.
  const screens = (
    Array.isArray(screensData) && screensData.length
      ? screensData.map((s) => ({ image: s.image || s.gif, caption: s.caption || s.title }))
      : keyFeatures
          .filter((f) => f.gif)
          .map((f) => ({ image: f.gif, caption: f.title }))
  )
    .filter((s) => s.image)
    .slice(0, 3);

  const toc = [
    { id: 'overview', label: 'Overview' },
    hasDemo && { id: 'demo', label: 'Demo' },
    screens.length && { id: 'screens', label: 'Screens' },
    hasProblem && { id: 'problem', label: 'Problem' },
    hasProcess && { id: 'process', label: 'Process' },
    keyFeatures.length && { id: 'features', label: 'Features' },
    hasArchitecture && { id: 'architecture', label: 'Architecture' },
    challenges.length && { id: 'learnings', label: 'Learnings' },
  ]
    .filter(Boolean)
    .map((item, i) => ({ ...item, n: String(i + 1).padStart(2, '0') }));

  const num = (id) => toc.find((t) => t.id === id)?.n || '';

  return (
    <div className="pd-shell">
      <div className="pd-layout">
        {/* ---------- sticky rail ---------- */}
        <aside className="pd-rail">
          <Link to="/projects" className="pd-back">
            <span aria-hidden="true">&larr;</span> Projects
          </Link>

          <div className="pd-railblock">
            <div className="pd-k">Project</div>
            <div className="pd-v pd-v-strong">{title}</div>
            {tagline && <div className="pd-v pd-v-muted">{tagline}</div>}
          </div>

          <div className="pd-railblock">
            <div className="pd-k">Role</div>
            <div className="pd-v">{role}</div>
          </div>

          {year && (
            <div className="pd-railblock">
              <div className="pd-k">Year</div>
              <div className="pd-v">{year}</div>
            </div>
          )}

          <div className="pd-railblock">
            <div className="pd-k">Stack</div>
            <div className="pd-v">{technologies}</div>
          </div>

          {(githubLinks.length > 0 || liveDemoLink) && (
            <div className="pd-railblock">
              <div className="pd-k">Links</div>
              <div className="pd-v pd-links">
                {githubLinks.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label || 'GitHub'} &#8599;
                  </a>
                ))}
                {liveDemoLink && (
                  <a href={liveDemoLink} target="_blank" rel="noopener noreferrer">
                    Demo &#8599;
                  </a>
                )}
              </div>
            </div>
          )}

          <nav className="pd-toc">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'cur' : ''}
              >
                <span className="n">{item.n}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {nextProject && (
            <div className="pd-nextproj">
              Next project
              <br />
              <Link to={`/projects/${slugOf(nextProject)}`}>
                {nextProject.title} &rarr;
              </Link>
            </div>
          )}
        </aside>

        {/* ---------- content column ---------- */}
        <div className="pd-content">
          {/* hero band (green) */}
          <section className="pd-band pd-band-green">
            <div className="pd-hero">
              <div className="pd-hero-text">
                <h1 className="pd-title">{title}</h1>
                {tagline && <p className="pd-tagline">{tagline}</p>}
                {technologies && (
                  <div className="pd-chips">
                    {technologies.split(',').map((t) => (
                      <span key={t.trim()} className="pd-chip">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {thumbnail && (
                <div className="pd-hero-shot">
                  <img src={thumbnail} alt={`${title} preview`} />
                </div>
              )}
            </div>
          </section>

          {/* overview */}
          <section id="overview" data-section="overview" className="pd-section">
            <div className="pd-kicker">{num('overview')} · Overview</div>
            <p className="pd-prose" style={{ whiteSpace: 'pre-line' }}>
              {overview || summary}
            </p>
          </section>

          {/* demo — video walkthrough in an iOS phone frame */}
          {hasDemo && (
            <section id="demo" data-section="demo" className="pd-section">
              <div className="pd-kicker">{num('demo')} · See it in motion</div>
              <div className="pd-demo-grid">
                <div className="pd-demo-copy">
                  <h2 className="pd-h">{demo.heading || 'A walkthrough'}</h2>
                  {demo.body && <p className="pd-prose">{demo.body}</p>}
                  {Array.isArray(demo.points) && demo.points.length > 0 && (
                    <ul className="pd-demo-points">
                      {demo.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="pd-demo-stage">
                  <div className="pd-phone-frame">
                    <span className="pd-notch" aria-hidden="true" />
                    {demo.video ? (
                      <video
                        className="pd-demo-video"
                        src={demo.video}
                        poster={demo.poster}
                        controls
                        playsInline
                        loop
                        muted
                      />
                    ) : (
                      <div className="pd-demo-video is-empty">
                        <span className="pd-demo-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5.5v13l11-6.5z" />
                          </svg>
                        </span>
                        <span className="pd-demo-hint">app demo — coming soon</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* screens (app screenshots) */}
          {screens.length > 0 && (
            <section id="screens" data-section="screens" className="pd-section">
              <div className="pd-kicker">{num('screens')} · In the app</div>
              <h2 className="pd-h">Screens</h2>
              <div className="pd-screens">
                {screens.map((s) => (
                  <figure key={s.image} className="pd-phone">
                    <img src={s.image} alt={s.caption ? `${s.caption} screen` : `${title} screen`} />
                    {s.caption && <figcaption>{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* problem → solution */}
          {hasProblem && (
            <section id="problem" data-section="problem" className="pd-section">
              <div className="pd-kicker">{num('problem')} · Problem → solution</div>
              <div className="pd-duo">
                {problem && (
                  <div>
                    <span className="pd-duo-tag">The problem</span>
                    <p className="pd-prose">{problem}</p>
                  </div>
                )}
                {solution && (
                  <div>
                    <span className="pd-duo-tag">{title}&rsquo;s answer</span>
                    <p className="pd-prose">{solution}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* process timeline */}
          {hasProcess && (
            <section id="process" data-section="process" className="pd-section">
              <div className="pd-kicker">{num('process')} · Process &amp; key decisions</div>
              <h2 className="pd-h">From sketch to ship</h2>
              <div className="pd-proc">
                {process.map((step) => (
                  <div key={step.title} className="pd-step">
                    <span className="pd-step-dot" aria-hidden="true" />
                    <h5>{step.title}</h5>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* features grid */}
          {keyFeatures.length > 0 && (
            <section id="features" data-section="features" className="pd-section">
              <div className="pd-kicker">{num('features')} · Features</div>
              <h2 className="pd-h">What&rsquo;s inside</h2>
              <div className="pd-feature-grid">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="pd-fcard">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* architecture — dark band with a client → cache → cloud flow diagram */}
          {hasArchitecture && (
            <section
              id="architecture"
              data-section="architecture"
              className="pd-band pd-band-dark pd-section"
            >
              <div className="pd-kicker">{num('architecture')} · Architecture</div>
              <h2 className="pd-h">How the pieces fit</h2>
              {architecture.summary && <p className="pd-arch-summary">{architecture.summary}</p>}

              <div className="pd-diagram">
                {/* main pipeline: client → cache → cloud */}
                <div className="pd-flow">
                  {archFlow.map((node, i) => {
                    const isLast = i === archFlow.length - 1;
                    return (
                      <Fragment key={node.label}>
                        <div className="pd-flow-cell">
                          <div className={`pd-node pd-node-${node.role || 'default'}`}>
                            <span className="pd-node-label">{node.label}</span>
                            {node.sub && <span className="pd-node-sub">{node.sub}</span>}
                          </div>

                          {/* external services hang straight off the last node */}
                          {isLast && archExternal.length > 0 && (
                            <div className="pd-branch">
                              <span className="pd-branch-drop" aria-hidden="true" />
                              <span className="pd-branch-label">external</span>
                              {archExternal.map((ext) => (
                                <div key={ext.label} className="pd-node pd-node-external">
                                  <span className="pd-node-label">{ext.label}</span>
                                  {ext.sub && <span className="pd-node-sub">{ext.sub}</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {!isLast && (
                          <span className="pd-flow-arrow" aria-hidden="true">
                            &#8644;
                          </span>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* learnings */}
          {challenges.length > 0 && (
            <section id="learnings" data-section="learnings" className="pd-section">
              <div className="pd-kicker">{num('learnings')} · Learnings</div>
              <h2 className="pd-h">Challenges &amp; what I learned</h2>
              <div className="pd-learn-grid">
                {challenges.map((c) => (
                  <div key={c.title} className="pd-learn">
                    <h4>{c.title}</h4>
                    <p>{c.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* optional embedded demo video */}
          {demoLink && (
            <section className="pd-section">
              <div className="pd-kicker">Live demo</div>
              <div className="pd-video">
                <iframe
                  src={demoLink}
                  title={`${title} demo video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </section>
          )}

          <footer className="pd-foot">
            <span>Teng Kong Cheng — {new Date().getFullYear()}</span>
            {nextProject && (
              <Link to={`/projects/${slugOf(nextProject)}`} className="pd-foot-next">
                Next: {nextProject.title} &rarr;
              </Link>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
