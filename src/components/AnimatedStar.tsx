import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedStar = () => {
  const starRef: any = useRef(null);

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(()=>{
    const random = rand(1,4);
    setTimeout(() => {
        setInterval(() => {
          if (starRef && starRef.current) {
            starRef.current.style.top = `${rand(-5, 30)}%`;
            starRef.current.style.left = `${rand(-10, 100)}%`;
    
            starRef.current.style.animation = 'none'
        
            let xd = starRef.current.offsetHeight;
            starRef.current.style.animation = ''
          }
        }, 2000);
      }, (2000 / 4) * random)
  },[])

  return (
    <div
      ref={starRef}
      className="block absolute text-xl opacity-80 text-violet-700 scale-animation"
    >
      <div className="rotate-animation origin-center">
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>
  );
};

export default AnimatedStar;
