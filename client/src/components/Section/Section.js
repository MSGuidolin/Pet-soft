import Banner from "./Banner/Banner.js";
import Services from "./Services/Services";
import "./Section.css"

import React from "react";

function Section() {
  return (
    <div className='container-main'>
      <div className='container'>
        <Banner />
        <Services />
      </div>
    </div>
  );
}

export default Section;


