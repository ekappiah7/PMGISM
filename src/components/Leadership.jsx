import { useScrollReveal } from '../hooks/useScrollReveal'
import { Ornament } from './About'

const features = [
  { icon: '⏳', title: '40+ Years of Experience', desc: 'Our faculty brings decades of proven, real-world ministry experience to the classroom.' },
  { icon: '🎯', title: 'Targeted Skills Development', desc: 'Practical, applicable skills that prepare you to lead confidently in any ministry context.' },
  { icon: '🌱', title: 'Holistic Mentorship', desc: "Personal investment in every student's spiritual, academic, and leadership growth." },
  { icon: '🏆', title: 'Proven Results', desc: 'Graduates who stand out and make lasting impact in every sphere of life and ministry.' },
]

export default function Leadership() {
  const quoteRef = useScrollReveal()
  const listRef  = useScrollReveal()

  return (
    <section className="leadership" id="leadership">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Our Team</span>
          <h2 className="section-title">Seasoned Leadership</h2>
          <Ornament />
          <p className="section-sub">
            Men and women who have walked in ministry for over four decades,
            pouring their wisdom into the next generation
          </p>
        </div>

        <div className="leadership-banner">
          <div ref={quoteRef} className="leadership-quote-wrap reveal">
            <div className="quote-icon">"</div>
            <blockquote>
              One of the major challenges of the modern-day church has to do with leadership.
              If we solve the problem of leadership, we will make great impact in life.
              At PMGI, we have men and women who have been in ministry for over four decades —
              ensuring the right training and skills are imparted into your life, so you can
              become the leader you have always dreamed to be.
            </blockquote>
          </div>

          <div ref={listRef} className="leadership-features reveal">
            {features.map(({ icon, title, desc }) => (
              <div className="lf-item" key={title}>
                <div className="lf-icon">{icon}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
