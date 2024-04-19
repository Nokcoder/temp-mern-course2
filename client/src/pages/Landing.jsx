import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
// import logo from "../assets/images/logo.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/* <img src={logo} alt="jobify" className="logo" /> */} <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby pug scenester distillery neutra, fit meh portland
            vexillologist organic fanny pack blue bottle glossier. Air plant
            semiotics twee chia yes plz craft beer cardigan tote bag ugh blue
            bottle vexillologist keytar pitchfork. Pour-over marxism fixie
            edison bulb. Normcore chambray man bun paleo taxidermy 90's neutral
            milk hotel hammock drinking vinegar ramps whatever wolf keffiyeh.
            Retro live-edge meggings glossier flannel taxidermy fit food truck.
            Gorpcore hexagon quinoa, iceland affogato pop-up artisan ascot
            keytar.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

// const Wrapper = styled.div`
//   background: red;
//   h1 {
//     color: white;
//   }
//   .content {
//     background: blue;
//     color: yellow;
//   }
// `;

export default Landing;
