import './about.css';

const timelineData = [
  {
    year: "2022",
    title: "Monash University Malaysia",
    description: "Bachelor of Software Engineering (Honors)",
    position: "top",
  },
  {
    year: "2024",
    title: "ERS Energy SDN BHD",
    description: "Odoo Developer (Academic Collaboration Project)",
    position: "bottom",
  },
  {
    year: "2024",
    title: "ERS Energy SDN BHD",
    description: "Odoo Developer (Academic Collaboration Project)",
    position: "top",
  },
  {
    year: "2024",
    title: "ERS Energy SDN BHD",
    description: "Odoo Developer (Academic Collaboration Project)",
    position: "bottom",
  }
];

const About = () => {

    return (
        <div className="about-page-container">

            <div className='about-introduction-container'>
                
                <div className='about-text-content'> 
                    <div>
                        <h1>I'm Teng Kong Cheng, a</h1>
                        <h1>Software Engineering Student</h1>
                    </div>
                    <p>
                    Hi! I'm Teng Kong Cheng, or you can call me Jeremy. A passionate Software Engineering student with a strong curiosity for building efficient, user-friendly, and impactful software solutions. I'm currently studying, where I'm gaining hands-on experience in full-stack development, object-oriented programming, and collaborative software projects.
                    From the first time I wrote a simple "Hello, World!" program, I knew I was hooked. Since then, I’ve been exploring everything from web and mobile development to data structures, algorithms, and cloud technologies. I enjoy turning ideas into real-world applications and constantly strive to improve my coding skills and problem-solving abilities.
                    Beyond code, I’m a firm believer in lifelong learning, teamwork, and clean design. I’ve worked on several academic and personal projects, and I’m always eager to take on new challenges that push me outside my comfort zone.
                    </p>
                </div>

                <div className='about-image-container'>
                    <img src="https://i.pinimg.com/736x/b8/96/b4/b896b4c31ad2a1009fe791e0fa54ea89.jpg" alt="" />
                </div>
            </div>

            <div className='about-slide'>
                <div className="timeline-container">
                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-container top'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                        <div className='timeline-content-empty'/>
                    </div>

                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-empty'/>
                        <div className='timeline-content-container bottom'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                    </div>

                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-container top'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                        <div className='timeline-content-empty'/>
                    </div>

                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-empty'/>
                        <div className='timeline-content-container bottom'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                    </div>

                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-container top'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                        <div className='timeline-content-empty'/>
                    </div>

                    <div className='timeline-content-wrapper'>
                        <div className='timeline-content-empty'/>
                        <div className='timeline-content-container bottom'>
                            <div className='timeline-content-year'><p>2024</p></div>
                            <div className='timeline-content-description'>
                                <h2>Monash University Malaysia</h2>
                                <p>Bachelor of Software Engineering (Honors)</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
             
        </div>
    )
}

export default About;