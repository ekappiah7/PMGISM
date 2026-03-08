import { useScrollReveal } from '../hooks/useScrollReveal'
import { Ornament } from './About'

const degrees = [
  {
    level: 'Undergraduate',
    icon: '🎓',
    title: 'Bachelor of Theology',
    desc: 'A foundational degree building your theological knowledge and ministry skills from the ground up.',
    courses: ['Biblical Studies', 'Church History', 'Practical Ministry', 'Christian Leadership'],
  },
  {
    level: 'Graduate',
    icon: '📜',
    title: 'Master of Divinity',
    desc: 'Advanced studies equipping you for pastoral leadership, academic teaching, and global ministry.',
    courses: ['Systematic Theology', 'Homiletics & Preaching', 'Missiology', 'Pastoral Counselling'],
    featured: true,
  },
  {
    level: 'Post-Graduate',
    icon: '🏛️',
    title: 'Doctor of Ministry',
    desc: 'The pinnacle of ministry education, designed for experienced leaders seeking scholarly depth.',
    courses: ['Advanced Theology', 'Research & Dissertation', 'Chaplaincy', 'Christian Business'],
  },
]

export default function Degrees() {
  const ref = useScrollReveal()

  return (
    <section className="degrees">
      <div className="degrees-overlay" aria-hidden="true" />
      <div className="container">
        <div className="section-header light">
          <span className="section-tag">Academic Structure</span>
          <h2 className="section-title">Degree Programs</h2>
          <Ornament light />
        </div>

        <div ref={ref} className="degrees-grid reveal">
          {degrees.map(({ level, icon, title, desc, courses, featured }) => (
            <div key={title} className={`degree-card${featured ? ' featured' : ''}`}>
              {featured && <div className="degree-badge">Most Popular</div>}
              <div className="degree-level">{level}</div>
              <div className="degree-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul>
                {courses.map(c => <li key={c}>{c}</li>)}
              </ul>
              <a href="#register" className="degree-btn">Apply Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
