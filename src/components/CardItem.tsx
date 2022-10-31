import React from 'react';
import Card from "../types/Card";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const CardItem: React.FC<Card> = ({id,image, selected,onClick}) => {

 
    return (
       <AnimatePresence>
         <motion.div
        
        className={`aspect-square overflow-hidden shadow-lg cursor-pointer rounded-md transition-all  `}>
            <div className='w-full h-full' >
                <div onClick={onClick} className={`w-full h-full object-cover  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ${selected ? 'hidden' : ''}`}/>

                <img src={image} alt={`${id}`} className='w-full h-full object-cover'/>
            </div>
        </motion.div>
       </AnimatePresence>
    );
};

export default CardItem;