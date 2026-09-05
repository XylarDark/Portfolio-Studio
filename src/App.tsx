import { works, experience } from './data'
import './App.css'

const heroImage = '/media/hero.jpg'

function App() {
  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top">
          Portfolio Studio
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="Introduction">
          <div className="hero-media" aria-hidden="true">
            <img
              className="hero-image"
              src={heroImage}
              alt=""
              width={2400}
              height={1600}
            />
            <div className="hero-veil" />
          </div>

          <div className="hero-copy">
            <p className="brand">Portfolio Studio</p>
            <h1>Media made with quiet precision.</h1>
            <p className="lede">
              A focused resume of film, photography, and motion for brands that
              value craft over noise.
            </p>
            <div className="cta-row">
              <a className="cta primary" href="#work">
                View selected work
              </a>
              <a className="cta ghost" href="#contact">
                Start a project
              </a>
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="section-intro">
            <h2>Selected work</h2>
            <p>Recent direction, stills, and finishing across brand and editorial.</p>
          </div>

          <ul className="work-list">
            {works.map((item, index) => (
              <li
                key={item.id}
                className={`work-item ${index % 2 === 1 ? 'offset' : ''}`}
              >
                <figure className="work-figure">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={1600}
                    height={1067}
                    loading="lazy"
                  />
                </figure>
                <div className="work-meta">
                  <h3>{item.title}</h3>
                  <p>
                    {item.role} · {item.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="section resume" id="resume">
          <div className="section-intro">
            <h2>Resume</h2>
            <p>Experience shaped around picture, pace, and clear storytelling.</p>
          </div>

          <ol className="resume-list">
            {experience.map((item) => (
              <li key={item.id} className="resume-item">
                <div className="resume-head">
                  <h3>{item.role}</h3>
                  <span>{item.period}</span>
                </div>
                <p className="resume-org">{item.org}</p>
                <p className="resume-detail">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-panel">
            <h2>Let’s make the next frame.</h2>
            <p>
              Available for select collaborations in film, photography, and
              motion. Share a brief and timeline — we’ll reply within a few days.
            </p>
            <a className="cta primary" href="mailto:hello@portfoliostudio.example">
              hello@portfoliostudio.example
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Portfolio Studio</p>
        <p>Simple elegant media-resume</p>
      </footer>
    </div>
  )
}

export default App
