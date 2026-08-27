import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Research from './components/Research';
import Projects from './components/Projects';
import Teaching from './components/Teaching';
import Publications from './components/Publications';
import News from './components/News';
import Footer from './components/Footer';

/**
 * Page shell. Section order on the page is the order of components below:
 * About → Interests → Selected work → Publications → Teaching → News.
 *
 * That order is meant for both PhD committees and SWE / ML hiring.
 *
 * To add a section: create src/components/YourSection.jsx, import it here,
 * and place it in the content column. Then add styles in src/index.css.
 */
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
          <Projects />
          <Publications />
          <Teaching />
          <News />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
