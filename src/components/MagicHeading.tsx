import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedStar from "./AnimatedStar"

interface props {
  text: string;
}
const MagicHeading: React.FC<props> = ({ text }) => {
//@ts-ignore
return ( <div className="inline-block relative">
        <AnimatedStar/> 
        <AnimatedStar/> 
        <AnimatedStar/> 
        <AnimatedStar/> 
      <h1 className="background-pan text-8xl font-bold text-transparent bg-[length:200%] bg-clip-text bg-gradient-to-r from-purple-400 via-pink-600 h-40 to-purple-400 ">
        {text}
      </h1>
    </div>
  );
};

 

export default MagicHeading;
