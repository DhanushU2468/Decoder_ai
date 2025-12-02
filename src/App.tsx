import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
