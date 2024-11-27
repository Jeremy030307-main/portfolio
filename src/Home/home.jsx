import HomeAbout from "./home-about";
import HomeProjects from "./home-projects";
import "./home.css"

const Home = () => {

    return (
        <div className="container">

            <div className='slide'>
                <HomeAbout/>
            </div>

            <div className='slide'>  
                <HomeProjects/>
            </div>

            <div className='slide'>
            </div>

            <div className='slide'>
            </div>

        </div>
    )
}

export default Home;
