import { useScrollReveal } from '../hooks/useScrollReveal'

const pillars = [
  { icon: '📖', title: 'Biblical Depth',   desc: 'Rigorous study of Old and New Testament, languages and theology' },
  { icon: '🕊️', title: 'Spirit-Led',       desc: 'Education rooted in prayer and spiritual formation' },
  { icon: '🌍', title: 'Global Impact',    desc: 'Distance & on-site learning reaching students worldwide' },
  { icon: '🎓', title: 'Accredited',       desc: 'Affiliated with Elisha Christian University, Chicago USA' },
]

export default function About() {
  const leftRef  = useScrollReveal()
  const rightRef = useScrollReveal()

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">Who We Are</h2>
          <Ornament />
        </div>

        <div className="about-grid">
          {/* Visual */}
          <div ref={leftRef} className="about-visual reveal">
            <div className="about-img-frame">
              <div className="about-img-inner">
                <div className="about-icon-display">
                  <div className="cross-display">✝</div>
                  <p className="about-icon-verse">
                    "For God hath not given us the spirit of fear; but of power,
                    and of love, and of a sound mind."
                  </p>
                  <p className="about-icon-ref">— 2 Timothy 1:7</p>
                </div>
              </div>
            </div>
            <div className="about-accent-card">
              <span className="accent-num">2026</span>
              <span className="accent-text">Year of Excellence</span>
            </div>
          </div>

          {/* Content */}
          <div ref={rightRef} className="about-content reveal">
            <p className="about-lead">
              <strong>Prayer Moves God School of Ministry (PMGI)</strong> is a distinguished
              institution dedicated to transformative education in theology, ministry, and
              biblical studies.
            </p>
            <p className="about-body">
              Affiliated with <strong>Elisha Christian University in Chicago, USA</strong>, we
              offer flexible programs including Undergraduate, Graduate, and Post-Graduate
              degrees. Our innovative approach combines distance education and on-site
              instruction, empowering students to become quality Theologians, Bible Teachers,
              and future Pastors.
            </p>
            <p className="about-body">
              We master in training our students to stand out in every endeavour they get
              themselves into. We foster a deep understanding of faith and produce high-quality
              Bible scholars — guiding you on a journey of holistic growth and excellency,
              unleashing the true demonstration of the potentials God has deposited inside you.
            </p>

            <div className="about-pillars">
              {pillars.map(({ icon, title, desc }) => (
                <div className="pillar" key={title}>
                  <div className="pillar-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Ornament({ light = false }) {
  return (
    <div className={`title-ornament${light ? ' light' : ''}`}>
      <span /><span className="cross-icon">✝</span><span />
    </div>
  )
}
