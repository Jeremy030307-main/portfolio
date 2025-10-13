import HomeAbout from "./home-about";
import HomeProject from "./home-project";
import "./home.css"

const Home = () => {
    
    return (
        <div className="container">

            <div className='slide'>
                <HomeAbout />
            </div>

            <HomeProject/>

        </div>
    )
}

export default Home;
