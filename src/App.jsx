import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import About from './components/About'
import Degrees from './components/Degrees'
import Programs from './components/Programs'
import Leadership from './components/Leadership'
import CtaBand from './components/CtaBand'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Degrees />
        <Programs />
        <Leadership />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
