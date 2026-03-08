const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-cross">✝</span>
              <div>
                <strong>PMGI</strong>
                <span>School of Ministry</span>
              </div>
            </div>
            <p>Transformative education in theology, ministry, and biblical studies. Empowering the leaders of tomorrow.</p>
            <p className="footer-affiliation">Affiliated with <strong>Elisha Christian University</strong>, Chicago USA</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {['#home', '#about', '#programs', '#leadership', '#register'].map(href => (
                <li key={href}><a href={href}>{href.slice(1).replace(/^\w/, c => c.toUpperCase())}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Programs</h4>
            <ul>
              <li><a href="#register">Undergraduate</a></li>
              <li><a href="#register">Graduate</a></li>
              <li><a href="#register">Post-Graduate</a></li>
              <li><a href="#programs">All Courses</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📧 <a href="mailto:pmgischoolofministry2026@gmail.com">pmgischoolofministry2026@gmail.com</a></p>
            <p>💬 <a href="https://wa.me/233205199736" target="_blank" rel="noopener noreferrer">+233 20 519 9736 (WhatsApp)</a></p>
            <div className="footer-verse">
              <p>"Train up a child in the way he should go: and when he is old, he will not depart from it."</p>
              <span>— Proverbs 22:6</span>
            </div>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {year} Prayer Moves God School of Ministry (PMGI). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
