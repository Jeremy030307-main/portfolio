import { useRef } from "react";
import HomeAbout from "./home-about";
import HomeProject from "./home-project";
import "./home.css"

const Home = () => {

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const forthRef = useRef(null);
    const fifthRef = useRef(null);
    
    return (
        <div className="container">

            <div ref={firstRef}className='slide'>
                <HomeAbout firstRef={firstRef}/>
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
