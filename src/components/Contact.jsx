import { useState } from 'react'
import { Ornament } from './About'

const programOptions = [
  { value: 'undergraduate', label: 'Undergraduate – Bachelor of Theology' },
  { value: 'graduate',      label: 'Graduate – Master of Divinity' },
  { value: 'postgrad',      label: 'Post-Graduate – Doctor of Ministry' },
]

const courseOptions = [
  { value: 'bible-studies',       label: 'Bible Studies (OT/NT, Languages)' },
  { value: 'theology',            label: 'Theology (Systematic, Historical)' },
  { value: 'ministry-skills',     label: 'Practical Ministry Skills / Homiletics' },
  { value: 'pastoral-care',       label: 'Pastoral Care' },
  { value: 'evangelism',          label: 'Evangelism' },
  { value: 'worship-counselling', label: 'Worship & Counselling' },
  { value: 'christian-leadership',label: 'Christian Leadership' },
  { value: 'church-history',      label: 'Church History' },
  { value: 'missiology',          label: 'Missiology (Missions)' },
  { value: 'chaplaincy',          label: 'Chaplaincy' },
  { value: 'youth-ministry',      label: 'Youth Ministry' },
  { value: 'christian-business',  label: 'Christian Business' },
]

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', program: '', course: '', message: '' }

export default function Contact() {
  const [form, setForm]     = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const apiBase = import.meta.env.VITE_API_URL || ''

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`${apiBase}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">

          {/* Info */}
          <div className="contact-info">
            <span className="section-tag">Get In Touch</span>
            <h2>Register &amp; Connect</h2>
            <Ornament />
            <p>
              Ready to begin your journey? Send us your interest and one of our admissions
              team will reach out to walk you through the enrollment process.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="cm-icon">📧</div>
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:pmgischoolofministry2026@gmail.com">
                    pmgischoolofministry2026@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-method">
                <div className="cm-icon">💬</div>
                <div>
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/233205199736" target="_blank" rel="noopener noreferrer">
                    +233 20 519 9736
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-verse">
              <p>"Call to me and I will answer you and tell you great and unsearchable things you do not know."</p>
              <span>— Jeremiah 33:3</span>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap" id="register">
            <h3>Registration Interest Form</h3>

            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h4>Thank you! We'll be in touch soon.</h4>
                <p>Our admissions team will contact you within 24–48 hours.</p>
                <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setStatus('idle')}>
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input id="firstName" name="firstName" type="text" placeholder="Your first name"
                      value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input id="lastName" name="lastName" type="text" placeholder="Your last name"
                      value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" name="phone" type="tel" placeholder="+233 XX XXX XXXX"
                    value={form.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="program">Program of Interest *</label>
                  <select id="program" name="program" value={form.program} onChange={handleChange} required>
                    <option value="">— Select a program —</option>
                    {programOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="course">Course of Interest</label>
                  <select id="course" name="course" value={form.course} onChange={handleChange}>
                    <option value="">— Select a course —</option>
                    {courseOptions.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell Us About Yourself</label>
                  <textarea id="message" name="message" rows={4}
                    placeholder="Share your ministry background, calling, and what draws you to PMGI..."
                    value={form.message} onChange={handleChange} />
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    <p>
                      Something went wrong. Please email us directly at{' '}
                      <a href="mailto:pmgischoolofministry2026@gmail.com">pmgischoolofministry2026@gmail.com</a>
                    </p>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-full" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Submit Interest'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
