import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/navbar'
import Home from './Home/home';
import Project from './Projects/project';
import ProjectDetail from './Projects/project-detail';
import About from './About/about';
import ScrollToTop from './Components/scrollToTop';
import Footer from './Components/footer';

function App() {

  return (
    <BrowserRouter >
        <ScrollToTop />

        <NavBar/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/:projectName" element={<ProjectDetail />} />

          <Route path="/blogs" element={<Home />} />
        </Routes>

        <Footer />

    </BrowserRouter>
  );
}

export default App;
