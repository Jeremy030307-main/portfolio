import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import './App.css';
import NavBar from './Components/NavBar/navbar';
import Home from './Home/home';
import Project from './Projects/project';
import ProjectDetail from './Projects/project-detail';
import About from './About/about';
import ScrollToTop from './Components/scrollToTop';
import Footer from './Components/footer';
import NotFound from './Components/NotFound';
import PageTransition from './Components/PageTransition';
import { ThemeProvider } from './hooks/useTheme';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Project /></PageTransition>} />
        <Route path="/projects/:projectName" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
