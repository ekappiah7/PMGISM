require('dotenv').config();

const express  = require('express');
const path     = require('path');
const cors     = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── MIDDLEWARE ── */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/* ── NODEMAILER TRANSPORT ── */
// Set SMTP credentials in your .env file:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// Defaults fall back to a simple Gmail-style setup using the school's address.
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'pmgischoolofministry2026@gmail.com',
    pass: process.env.SMTP_PASS || '',
  },
});

/* ── REGISTRATION ENDPOINT ── */
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, phone, program, course, message } = req.body;

  if (!firstName || !lastName || !email || !program) {
    return res.status(400).json({ error: 'Required fields missing.' });
  }

  const programLabels = {
    undergraduate: 'Undergraduate – Bachelor of Theology',
    graduate:      'Graduate – Master of Divinity',
    postgrad:      'Post-Graduate – Doctor of Ministry',
  };

  const courseLabels = {
    'bible-studies':      'Bible Studies (OT/NT, Languages)',
    'theology':           'Theology (Systematic, Historical)',
    'ministry-skills':    'Practical Ministry Skills / Homiletics',
    'pastoral-care':      'Pastoral Care',
    'evangelism':         'Evangelism',
    'worship-counselling':'Worship & Counselling',
    'christian-leadership':'Christian Leadership',
    'church-history':     'Church History',
    'missiology':         'Missiology (Missions)',
    'chaplaincy':         'Chaplaincy',
    'youth-ministry':     'Youth Ministry',
    'christian-business': 'Christian Business',
  };

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A0533; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #C9A84C, #9A7A30); padding: 24px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 1.4rem; color: #1A0533;">✝ PMGI School of Ministry</h1>
        <p style="margin: 4px 0 0; color: #1A0533; font-size: 0.85rem;">New Registration Interest</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #C9A84C; font-size: 1.1rem; margin-top: 0;">Applicant Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #aaa; width: 140px;">Full Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding: 8px 0; color: #aaa;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; color: #aaa;">Phone/WhatsApp</td>
              <td style="padding: 8px 0;">${phone}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #aaa;">Program</td>
              <td style="padding: 8px 0;">${programLabels[program] || program}</td></tr>
          ${course ? `<tr><td style="padding: 8px 0; color: #aaa;">Course Interest</td>
              <td style="padding: 8px 0;">${courseLabels[course] || course}</td></tr>` : ''}
        </table>
        ${message ? `
        <div style="margin-top: 20px; padding: 16px; background: rgba(201,168,76,0.1); border-left: 3px solid #C9A84C; border-radius: 0 8px 8px 0;">
          <p style="color: #aaa; font-size: 0.82rem; margin: 0 0 6px;">Personal Statement</p>
          <p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
        </div>` : ''}
      </div>
      <div style="background: rgba(201,168,76,0.1); padding: 16px 32px; text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.5);">
        Received via PMGI Website Registration Form
      </div>
    </div>
  `;

  // Confirmation email to the applicant
  const confirmHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1A0533; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #C9A84C, #9A7A30); padding: 24px 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 1.4rem; color: #1A0533;">✝ PMGI School of Ministry</h1>
        <p style="margin: 4px 0 0; color: #1A0533; font-size: 0.85rem;">Application Received</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #C9A84C;">Dear ${firstName},</h2>
        <p>Thank you for your interest in the <strong>Prayer Moves God School of Ministry</strong>! We have received your registration and our admissions team will be in touch with you within <strong>24–48 hours</strong>.</p>
        <p style="color: rgba(255,255,255,0.75);">In the meantime, feel free to reach us on WhatsApp:</p>
        <p><a href="https://wa.me/233205199736" style="color: #C9A84C;">+233 20 519 9736</a></p>
        <p style="margin-top: 24px; color: rgba(255,255,255,0.75); font-style: italic;">
          "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you,
          plans to give you hope and a future." — Jeremiah 29:11
        </p>
      </div>
      <div style="background: rgba(201,168,76,0.1); padding: 16px 32px; text-align: center; font-size: 0.8rem; color: rgba(255,255,255,0.5);">
        Prayer Moves God School of Ministry · pmgischoolofministry2026@gmail.com
      </div>
    </div>
  `;

  try {
    // Only attempt to send emails if SMTP credentials are configured
    if (process.env.SMTP_PASS) {
      await Promise.all([
        transporter.sendMail({
          from:    `"PMGI School of Ministry" <${process.env.SMTP_USER}>`,
          to:      'pmgischoolofministry2026@gmail.com',
          subject: `New Registration Interest – ${firstName} ${lastName}`,
          html:    htmlBody,
        }),
        transporter.sendMail({
          from:    `"PMGI School of Ministry" <${process.env.SMTP_USER}>`,
          to:      email,
          subject: 'Thank you for your interest in PMGI School of Ministry',
          html:    confirmHtml,
        }),
      ]);
    } else {
      // Log to console in dev mode when no SMTP is configured
      console.log('\n📬 [DEV] New Registration (email not sent – SMTP_PASS not set):');
      console.log(`  Name: ${firstName} ${lastName}`);
      console.log(`  Email: ${email}`);
      console.log(`  Phone: ${phone || '—'}`);
      console.log(`  Program: ${programLabels[program] || program}`);
      console.log(`  Course: ${courseLabels[course] || '—'}`);
      console.log(`  Message: ${message || '—'}\n`);
    }

    res.json({ success: true, message: 'Registration received.' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

/* ── HEALTH CHECK ── */
app.get('/api/health', (_, res) => res.json({ status: 'ok', school: 'PMGI School of Ministry' }));

/* ── CATCH-ALL ── */
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✝  PMGI School of Ministry server running on http://localhost:${PORT}\n`);
});

module.exports = app;
