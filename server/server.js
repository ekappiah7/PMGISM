require('dotenv').config()

const express    = require('express')
const cors       = require('cors')
const nodemailer = require('nodemailer')

const app  = express()
const PORT = process.env.PORT || 3001

/* ── MIDDLEWARE ── */
// Allow requests from the Firebase-hosted frontend (set ALLOWED_ORIGIN in .env)
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }))
app.use(express.json())

/* ── NODEMAILER ── */
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'pmgischoolofministry2026@gmail.com',
    pass: process.env.SMTP_PASS || '',
  },
})

const programLabels = {
  undergraduate: 'Undergraduate – Bachelor of Theology',
  graduate:      'Graduate – Master of Divinity',
  postgrad:      'Post-Graduate – Doctor of Ministry',
}

const courseLabels = {
  'bible-studies':       'Bible Studies (OT/NT, Languages)',
  'theology':            'Theology (Systematic, Historical)',
  'ministry-skills':     'Practical Ministry Skills / Homiletics',
  'pastoral-care':       'Pastoral Care',
  'evangelism':          'Evangelism',
  'worship-counselling': 'Worship & Counselling',
  'christian-leadership':'Christian Leadership',
  'church-history':      'Church History',
  'missiology':          'Missiology (Missions)',
  'chaplaincy':          'Chaplaincy',
  'youth-ministry':      'Youth Ministry',
  'christian-business':  'Christian Business',
}

/* ── REGISTRATION ENDPOINT ── */
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, phone, program, course, message } = req.body

  if (!firstName || !lastName || !email || !program) {
    return res.status(400).json({ error: 'Required fields missing.' })
  }

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1A0533;color:#fff;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#C9A84C,#9A7A30);padding:24px 32px;text-align:center">
        <h1 style="margin:0;color:#1A0533">✝ PMGI School of Ministry</h1>
        <p style="margin:4px 0 0;color:#1A0533;font-size:.85rem">New Registration Interest</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#C9A84C;margin-top:0">Applicant Details</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#aaa;width:140px">Full Name</td><td style="padding:8px 0;font-weight:bold">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0;color:#aaa">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#C9A84C">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#aaa">Phone/WhatsApp</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#aaa">Program</td><td style="padding:8px 0">${programLabels[program] || program}</td></tr>
          ${course ? `<tr><td style="padding:8px 0;color:#aaa">Course</td><td style="padding:8px 0">${courseLabels[course] || course}</td></tr>` : ''}
        </table>
        ${message ? `<div style="margin-top:20px;padding:16px;background:rgba(201,168,76,.1);border-left:3px solid #C9A84C;border-radius:0 8px 8px 0"><p style="color:#aaa;font-size:.82rem;margin:0 0 6px">Personal Statement</p><p style="margin:0">${message.replace(/\n/g,'<br>')}</p></div>` : ''}
      </div>
      <div style="background:rgba(201,168,76,.1);padding:16px 32px;text-align:center;font-size:.8rem;color:rgba(255,255,255,.5)">Received via PMGI Website</div>
    </div>`

  const confirmHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1A0533;color:#fff;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#C9A84C,#9A7A30);padding:24px 32px;text-align:center">
        <h1 style="margin:0;color:#1A0533">✝ PMGI School of Ministry</h1>
        <p style="margin:4px 0 0;color:#1A0533;font-size:.85rem">Application Received</p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#C9A84C">Dear ${firstName},</h2>
        <p>Thank you for your interest in <strong>Prayer Moves God School of Ministry</strong>! We have received your registration and our admissions team will contact you within <strong>24–48 hours</strong>.</p>
        <p style="color:rgba(255,255,255,.75)">Reach us on WhatsApp anytime: <a href="https://wa.me/233205199736" style="color:#C9A84C">+233 20 519 9736</a></p>
        <p style="margin-top:24px;color:rgba(255,255,255,.75);font-style:italic">"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future." — Jeremiah 29:11</p>
      </div>
      <div style="background:rgba(201,168,76,.1);padding:16px 32px;text-align:center;font-size:.8rem;color:rgba(255,255,255,.5)">Prayer Moves God School of Ministry · pmgischoolofministry2026@gmail.com</div>
    </div>`

  try {
    if (process.env.SMTP_PASS) {
      await Promise.all([
        transporter.sendMail({ from: `"PMGI" <${process.env.SMTP_USER}>`, to: 'pmgischoolofministry2026@gmail.com', subject: `New Registration – ${firstName} ${lastName}`, html: adminHtml }),
        transporter.sendMail({ from: `"PMGI" <${process.env.SMTP_USER}>`, to: email, subject: 'Thank you for your interest in PMGI School of Ministry', html: confirmHtml }),
      ])
    } else {
      console.log(`\n📬 [DEV] Registration from ${firstName} ${lastName} <${email}> — SMTP not configured\n`)
    }
    res.json({ success: true })
  } catch (err) {
    console.error('Email error:', err)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`\n✝  PMGI API running on http://localhost:${PORT}\n`))

module.exports = app
