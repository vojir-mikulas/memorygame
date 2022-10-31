import { motion } from "framer-motion"

interface props{
    text: string;
    onClick: () => void;
}
const Button : React.FC<props> = ({text,onClick})=>{

    return(
        <motion.a
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        transition={{duration: 0.1}}
        className="rounded-lg bg-blue-500 w-72 p-3 flex items-center justify-center  cursor-pointer"
        onClick={onClick}
        >
            {text}
        </motion.a>
    )
}

export default Button