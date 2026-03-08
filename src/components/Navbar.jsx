import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/about',      label: 'About' },
  { to: '/programs',   label: 'Programs' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/contact',    label: 'Contact' },
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
        <Link to="/" className="nav-logo" onClick={close}>
          <div className="logo-emblem"><img src="/image.png" alt="PMGI Logo" className="logo-img" /></div>
          <div className="logo-text">
            <span className="logo-abbr">PMGI</span>
            <span className="logo-sub">School of Ministry</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/contact" className="nav-link nav-cta" onClick={close}>Register Now</Link>
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
