import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MagicHeading from '../components/MagicHeading'
import { motion, AnimatePresence } from "framer-motion"
const SplashScreen = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
        navigate('/start')
        },4500)
    },[])
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
         className='h-screen w-screen flex justify-center items-center '>
            <MagicHeading text={'Epic memory game'}/> 
        </motion.div>
    );
};

export default SplashScreen;