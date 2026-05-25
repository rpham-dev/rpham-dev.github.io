import './App.css';
import CursorGlow from './components/CursorGlow';
import LeftPanel from './components/LeftPanel';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Gallery from './components/Gallery';

function App() {
  return (
    <>
      <CursorGlow />
      <div className="layout container">
        <div className="layout__left">
          <LeftPanel />
        </div>
        <main className="layout__right">
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Gallery />
        </main>
      </div>
    </>
  );
}

export default App;
