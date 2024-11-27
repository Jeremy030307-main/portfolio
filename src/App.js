import './App.css';
import NavBar from './Components/NavBar/navbar'
import Home from './Home/home';
import HomeAbout from './Home/home-about';
import HomeProjects from './Home/home-projects';


function App() {

  return (
    <div className="App">

        <NavBar/>
        <Home/>
    </div>

  );
}

export default App;
