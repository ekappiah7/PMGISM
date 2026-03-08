import { useEffect, useRef } from 'react'
import { Ornament } from './About'

const courses = [
  { num: '01', icon: '📖', title: 'Bible Studies',           desc: 'Old & New Testament, Biblical Languages — deep textual study and hermeneutics for scholars and teachers.',    tags: ['OT / NT', 'Languages', 'Hermeneutics'] },
  { num: '02', icon: '🧠', title: 'Theology',                desc: 'Systematic and Historical Theology — understanding God, doctrine, and the development of Christian thought.',   tags: ['Systematic', 'Historical'] },
  { num: '03', icon: '🎤', title: 'Practical Ministry Skills',desc: 'Homiletics — the art and science of preaching and communicating the Gospel with power and clarity.',          tags: ['Homiletics', 'Preaching'] },
  { num: '04', icon: '🤲', title: 'Pastoral Care',           desc: 'Equipping leaders to shepherd congregations with compassion, wisdom, and biblical understanding.',             tags: ['Shepherding', 'Community'] },
  { num: '05', icon: '🌎', title: 'Evangelism',              desc: 'Training in soul-winning strategies, gospel presentation, and outreach that transforms communities.',          tags: ['Soul-Winning', 'Outreach'] },
  { num: '06', icon: '🎵', title: 'Worship & Counselling',   desc: 'Leading authentic worship and providing godly counsel to individuals and families in need.',                    tags: ['Worship', 'Counselling'] },
  { num: '07', icon: '👑', title: 'Christian Leadership',    desc: 'Developing servant leaders who lead with integrity, vision, and Christ-centred authority.',                    tags: ['Leadership', 'Management'] },
  { num: '08', icon: '🏛️', title: 'Church History',          desc: 'A journey through two millennia of Christian heritage, reformation, and global expansion of the faith.',       tags: ['History', 'Reformation'] },
  { num: '09', icon: '✈️', title: 'Missiology',              desc: 'The theology and practice of missions — cross-cultural ministry and global kingdom advancement.',              tags: ['Missions', 'Cross-Cultural'] },
  { num: '10', icon: '🏥', title: 'Chaplaincy',              desc: 'Ministry in hospitals, prisons, military, and institutional settings — bringing Christ to every corner.',      tags: ['Hospital', 'Military', 'Prison'] },
  { num: '11', icon: '⚡', title: 'Youth Ministry',          desc: 'Equipping the next generation of believers — discipleship, mentorship, and engaging young people for God.',    tags: ['Youth', 'Discipleship'] },
  { num: '12', icon: '💼', title: 'Christian Business',      desc: 'Integrating faith and marketplace — entrepreneurship, stewardship, and Kingdom-minded business principles.',   tags: ['Business', 'Stewardship'] },
]

function CourseCard({ course, delay }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="course-card reveal">
      <div className="course-header">
        <div className="course-num">{course.num}</div>
        <div className="course-icon">{course.icon}</div>
      </div>
      <h3>{course.title}</h3>
      <p>{course.desc}</p>
      <div className="course-tags">
        {course.tags.map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  )
}

export default function Programs() {
  return (
    <section className="programs" id="programs">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Curriculum</span>
          <h2 className="section-title">Courses We Offer</h2>
          <Ornament />
          <p className="section-sub">
            Twelve comprehensive disciplines crafted to shape well-rounded, Spirit-filled ministers
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((c, i) => (
            <CourseCard key={c.num} course={c} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
