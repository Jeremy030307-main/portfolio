import { Link, useParams } from 'react-router-dom';
import './project-detail.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import { slugOf } from '../utils/slug';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../utils/gsap-setup';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
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

  // Pin the preview section and convert vertical scroll into horizontal
  // movement of the strip (App Store "scroll-jacked" gallery). Only on wider
  // screens / non-reduced-motion; mobile keeps a normal vertical stack.
  useGSAP(
    () => {
      const section = galleryRef.current;
      const track = trackRef.current;
      if (!section || !track || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        // Real content width = sum of every tile + the gaps between them.
        // We compute it ourselves rather than rely on scrollWidth, which a
        // constrained parent can cap to the column width.
        const contentWidth = () => {
          const tiles = [...track.children];
          if (!tiles.length) return 0;
          const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
          const tilesW = tiles.reduce((sum, t) => sum + t.getBoundingClientRect().width, 0);
          return tilesW + gap * (tiles.length - 1);
        };
        // How far the strip must travel left so its right edge reaches the
        // viewport's right edge.
        const distance = () => Math.max(0, contentWidth() - track.parentElement.clientWidth);

        // Wrap the preview + every section after it into one block, then pin
        // the block. The whole lower page stays frozen on screen and moves as
        // one unit while the strip scrolls sideways, then releases together so
        // normal scrolling resumes.
        const parent = section.parentNode;
        const following = [];
        for (let el = section; el; el = el.nextElementSibling) following.push(el);
        const block = document.createElement('div');
        block.className = 'pd-pinblock';
        parent.insertBefore(block, section);
        following.forEach((el) => block.appendChild(el));

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true,
          },
        });

        // Images have no width until they load — recompute once each lands.
        const imgs = track.querySelectorAll('img');
        imgs.forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', ScrollTrigger.refresh, { once: true });
          }
        });

        // Unwrap on cleanup so the DOM returns to its original structure.
        return () => {
          const host = block.parentNode;
          if (!host) return;
          following.forEach((el) => host.insertBefore(el, block));
          host.removeChild(block);
        };
      });
      return () => mm.revert();
    },
    { dependencies: [projectData, projectName], revertOnUpdate: true }
  );

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
  // One horizontal row: pipeline nodes followed by external services (flagged
  // so they render with the trailing dashed style), matching the design.
  const archNodes = [
    ...archFlow,
    ...archExternal.map((ext) => ({ ...ext, external: true })),
  ];

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
  // Entries without an image are kept as captioned placeholder phones — the
  // gallery shows the device frame so the layout reads before shots land.
  const screens = (
    Array.isArray(screensData) && screensData.length
      ? screensData.map((s) => ({ image: s.image || s.gif || '', caption: s.caption || s.title }))
      : keyFeatures
          .filter((f) => f.gif)
          .map((f) => ({ image: f.gif, caption: f.title }))
  ).filter((s) => s.image || s.caption);

  // App Store pattern: the demo video and the screenshots live in one
  // swipeable Preview gallery — the demo phone is the first tile.
  const hasGallery = Boolean(demo) || screens.length > 0;

  const toc = [
    { id: 'overview', label: 'Overview' },
    hasGallery && { id: 'gallery', label: 'Preview' },
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
          {/* hero + overview band (green) — App Store style: title, tagline
              and stack chips lead, with the overview prose in the same band */}
          <section id="overview" data-section="overview" className="pd-band pd-band-green">
            <div className="pd-hero">
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
            {(overview || summary) && (
              <p className="pd-prose pd-hero-overview" style={{ whiteSpace: 'pre-line' }}>
                {overview || summary}
              </p>
            )}
          </section>

          {/* preview — App Store media strip: the demo video phone first, then
              the screenshots, all in matching iOS device frames. The section is
              pinned and vertical scroll drives the strip horizontally (GSAP). */}
          {hasGallery && (
            <section
              id="gallery"
              data-section="gallery"
              className="pd-section pd-gallery-section"
              ref={galleryRef}
            >
              <div className="pd-kicker">{num('gallery')} · Preview</div>
              <h2 className="pd-h">Demo &amp; screens</h2>
              {demo?.body && (
                <p className="pd-prose pd-gallery-lead">{demo.body}</p>
              )}
              <div className="pd-gallery-viewport">
                <div className="pd-gallery" ref={trackRef}>
                {demo && (
                  <figure className="pd-gtile pd-gtile-video">
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
                    <figcaption>
                      &#9654; {demo.heading || '60-second walkthrough'}
                    </figcaption>
                  </figure>
                )}

                {screens.map((s) => (
                  <figure key={s.caption || s.image} className="pd-gtile">
                    <div className="pd-phone-frame">
                      <span className="pd-notch" aria-hidden="true" />
                      {s.image ? (
                        <img
                          className="pd-gscreen"
                          src={s.image}
                          alt={s.caption ? `${s.caption} screen` : `${title} screen`}
                        />
                      ) : (
                        <div className="pd-gscreen is-empty">
                          <span className="pd-gscreen-label">{s.caption || 'Screen'}</span>
                        </div>
                      )}
                    </div>
                    {s.caption && <figcaption>{s.caption}</figcaption>}
                  </figure>
                ))}
                </div>
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
                {/* single horizontal flow: pipeline nodes then any external
                    services as the trailing (dashed) boxes — all in one row,
                    separated by ⇄, exactly like the design */}
                <div className="pd-flow">
                  {archNodes.map((node, i) => {
                    const isLast = i === archNodes.length - 1;
                    return (
                      <Fragment key={node.label}>
                        <div
                          className={`pd-node pd-node-${
                            node.external ? 'external' : node.role || 'default'
                          }`}
                        >
                          <span className="pd-node-label">{node.label}</span>
                          {node.sub && <span className="pd-node-sub">{node.sub}</span>}
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
