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

            <div className='slide'>
            </div>

            <div className='slide'>
            </div>

            <div className='slide'>
            </div>

        </div>
    )
}

export default Home;
