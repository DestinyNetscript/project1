import logo1 from '../images/logos/1.png';
import logo2 from '../images/logos/2.png';
import logo3 from '../images/logos/3.png';
import logo4 from '../images/logos/4.png';
import logo5 from '../images/logos/5.png';
import logo6 from '../images/logos/6.png';
import logo7 from '../images/logos/7.png';
import logo8 from '../images/logos/8.png';
import { NavLink } from 'react-router-dom';

function Hero() {
  return (
    <>
      <section className="heroSec">
        <div className="container">
          <div className="hero">
            <h2>We Accelerate The Growth Of 8-Figure DTC Brands.</h2>
            <p>We Plug The Worlds Best CRO Experts & Protocols Into Your Brand To Increase Your Revenue, Scalability & Profitability. </p>
            <b><i>Without You Spending A Single Cent More On Traffic... Guaranteed. </i></b>
            <div className="heroVideo">
              <iframe width="100%" height="500" src="https://www.youtube.com/embed/V2QZb4Xa5-M?si=DxhYAuZaIJebhxdg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <NavLink to="/form" className="demo">Schedule A Demo Here.</NavLink>
          </div>
        </div>
        <div className="marquee">
          <h3>Trusted by:</h3>
          <div className="marqueeDiv">
            <div className="marqueeContent">
              
                <img src={logo1} alt="" />
                <img src={logo2} alt="" />
                <img src={logo3} alt="" />
                <img src={logo4} alt="" />
                <img src={logo5} alt="" />
                <img src={logo6} alt="" />
                <img src={logo7} alt="" />
                <img src={logo8} alt="" />
              
            </div>
            <div className="marqueeContent">
              
                <img src={logo1} alt="" />
                <img src={logo2} alt="" />
                <img src={logo3} alt="" />
                <img src={logo4} alt="" />
                <img src={logo5} alt="" />
                <img src={logo6} alt="" />
                <img src={logo7} alt="" />
                <img src={logo8} alt="" />
              
            </div>
          </div>
        </div>
      </section>
    </>
  ); 
}
 
export default Hero;