// src/About.js
import React from 'react';
import NavBar from '../components/home/navBar';
const About = () => {
  return (
    <div>
      <NavBar />
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      <p>This is a fitness application designed to help you reach your fitness goals.</p>
    </div>
  );
};

export default About;
