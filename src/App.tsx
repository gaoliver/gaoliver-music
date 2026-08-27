import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Releases from './pages/Releases';
import Contact from './pages/Contact';
import MainLayout from './templates/MainLayout';
import { PageContentSurface, PageTitle } from './components/design-system';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={(
            <MainLayout>
              <PageTitle>Page not found</PageTitle>
              <PageContentSurface>
                <p className="text-[var(--shell-muted-light)]">The page you requested does not exist.</p>
              </PageContentSurface>
            </MainLayout>
          )}
        />
      </Routes>
    </Router>
  );
}

export default App;
