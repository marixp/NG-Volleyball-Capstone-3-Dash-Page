
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../index.css';


const Home = () => {
    
    
    useEffect(() => {
        
        axios
            .get('http://localhost:5555/')
            .then((response) => {
                              
            })
            .catch((error) => {
                console.log(error);
                
            });
    },[]);
  return (
    <div className = "container mx-auto mt-10 bg-gradient-to-br from-gray-300 to-gray-500 p-8 rounded-lg shadow-xl">
      <div className= "flex flex-col lg:flex-row justify-between items-center gap-10">  
        <div className ="lg:w-1/2">
          <h1 className = "text-6xl lg:text:6xl font-bold text-gray-800 mb-4">
            Hello! Welcome to Volleyball Tournament
          </h1>
          <p className = "text-lg lg:text-xl text-gray-600 mb-8">
            Get Started with our exciting tournamnets and compete with the best.
          </p>
         
          <Link 
            to = "/signup"
            className = "bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-lg"
           >
          Get Started
          </Link>

        </div >
        <div  >
          <img className =" h-auto max-w-xl rounded-lg " src='/src/images/7229702.jpg'>
          </img>
        </div>
      </div >
    </div>
  )
}

export default Home