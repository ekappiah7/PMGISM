import { useState, useEffect } from 'react'

const links = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#programs',   label: 'Programs' },
  { href: '#leadership', label: 'Leadership' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={close}>
          <div className="logo-emblem"><img src="/image.png" alt="PMGI Logo" className="logo-img" /></div>
          <div className="logo-text">
            <span className="logo-abbr">PMGI</span>
            <span className="logo-sub">School of Ministry</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav-link" onClick={close}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#register" className="nav-link nav-cta" onClick={close}>Register Now</a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-toggle${open ? ' active' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
