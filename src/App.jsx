import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Research from './components/Research';
import Publications from './components/Publications';
import News from './components/News';
import Footer from './components/Footer';

function App() {
  return (
    <div className="site">
      <a className="skip-link" href="#content">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <div className="page">
        <Sidebar />
        <div className="content" id="content">
          <Hero />
          <Research />
          <Publications />
          <News />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
