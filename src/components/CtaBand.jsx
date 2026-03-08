import { Link } from 'react-router-dom'

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-overlay" aria-hidden="true" />
      <div className="container cta-content">
        <h2>Your Calling Awaits</h2>
        <p>
          God has deposited greatness inside you. PMGI exists to help you
          discover, develop, and deploy it.
        </p>
        <Link to="/contact" className="btn btn-primary btn-lg">
          Start Your Application Today
        </Link>
      </div>
    </section>
  )
}
