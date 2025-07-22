import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/navbar'
import Home from './Home/home';
import Project from './Projects/project';
import About from './About/about';

function App() {

  return (
    <BrowserRouter >

        <NavBar/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/blogs" element={<Home />} />
        </Routes>


    </BrowserRouter>
  );
}

export default App;
