import React from "react";
import "./Banner.css";
import banner from "../../../img/banner.jpg";

export default function Banner() {
  return (
    <div className="banner-container">
      <div
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.3)",
          position: "absolute",
          opacity: 0.8,
          top: 100,
          left: 150,
          backgroundColor: "white",
          width: "31rem",
          color: "#00695c",
        }}
      >
        <h1>Pet-soft</h1>
        <p>
          Hacemos todo por tu mascota!.
        </p>
      </div>

      <div className="banner">
        <img className="banner-img" src={banner} alt="banner-img"></img>
      </div>
    </div>
  );
}
