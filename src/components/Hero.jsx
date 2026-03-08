import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left:     `${Math.random() * 100}%`,
  size:     Math.random() * 3 + 1,
  duration: `${Math.random() * 15 + 10}s`,
  delay:    `${Math.random() * 10}s`,
}))

export default function Hero() {
  const scrollRef = useRef(null)

  // Reveal scroll indicator after mount
  useEffect(() => {
    const t = setTimeout(() => scrollRef.current?.classList.add('visible'), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero" id="home">
      {/* Particles */}
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-badge animate-fade-down" style={{ animationDelay: '0.2s' }}>
          Est. 2024 · Affiliated with Elisha Christian University, Chicago USA
        </div>

        <h1 className="hero-title animate-fade-down" style={{ animationDelay: '0.4s' }}>
          <span className="title-line1">Prayer Moves God</span>
          <span className="title-line2">School of Ministry</span>
        </h1>

        <p className="hero-tagline animate-fade-down" style={{ animationDelay: '0.6s' }}>
          Transforming Lives · Equipping Leaders · Advancing the Kingdom
        </p>

        <p className="hero-sub animate-fade-down" style={{ animationDelay: '0.7s' }}>
          Empowering students to become quality Theologians, Bible Teachers,
          <br />and future Pastors through holistic, Spirit-led education.
        </p>

        <div className="hero-actions animate-fade-up" style={{ animationDelay: '0.9s' }}>
          <Link to="/contact" className="btn btn-primary">Begin Your Journey</Link>
          <Link to="/programs" className="btn btn-secondary">Explore Programs</Link>
        </div>

        <div className="hero-stats animate-fade-up" style={{ animationDelay: '1.1s' }}>
          <div className="stat">
            <span className="stat-num">12+</span>
            <span className="stat-label">Programs Offered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">40+</span>
            <span className="stat-label">Years of Leadership</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Degree Levels</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="hero-scroll">
        <span>Scroll to Discover</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
