import React from "react";
import "./AboutUs.css";

const About = () => {
  return (
    <div className="about-us-section py-5">
      <div className="background-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center mb-4">
            <h2 className="about-us-title mb-4">About Us</h2>
            <p className="about-us-text">
              Welcome to <strong>GameZone</strong>, your number one destination
              for all things gaming. We offer a wide selection of video games,
              consoles, and accessories, all carefully curated to deliver the
              best gaming experience possible.
            </p>
            <p className="about-us-text">
              Since our inception in 2021, we have grown from a small online
              store to a trusted brand known for excellent customer service,
              quality products, and a passion for all things gaming.
            </p>
            <p className="about-us-text">
              Whether you're looking for the latest releases or nostalgic
              classics, our mission is to bring you the best, all under one
              roof.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="images/game-art.jpg"
              alt="Game Store"
              className="img-fluid rounded about-us-image shadow-lg"
            />
          </div>
        </div>

        <div className="row mt-5 text-center justify-content-around">
          <div className="cards col-md-3 mb-4">
            <h5 className="about-us-subtitle">Our Vision</h5>
            <p className="about-us-text">
              To become the leading global gaming store, offering the latest
              games and technology to gamers everywhere.
            </p>
          </div>
          <div className="cards col-md-3 mb-4">
            <h5 className="about-us-subtitle">Our Values</h5>
            <p className="about-us-text">
              Passion, innovation, and customer satisfaction drive us to
              constantly improve and deliver the best gaming experience.
            </p>
          </div>
          <div className="cards col-md-3  mb-4">
            <h5 className="about-us-subtitle">Our Team</h5>
            <p className="about-us-text">
              A team of gaming enthusiasts who are dedicated to helping you find
              exactly what you need, whether it's the latest blockbuster or a
              retro gem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
