import React from 'react';
import heroImage from '../../../assets/images/hero.svg';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Amazing Product</h1>
        <p>Transform your ideas into reality with our innovative solutions.</p>
        <a href="#contact" className="cta-button">Get Started</a>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;