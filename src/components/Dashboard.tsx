import React from "react";
import { useNavigate } from "react-router-dom";
import Player from "../types/Player";
import DashboardPlayerItem from "./DashboardPlayerItem";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion"

interface props {
  winner: Player | null;
  players: Array<Player>;
  handleGameReset: () => void;
}
const Dashboard: React.FC<props> = ({ winner, handleGameReset, players }) => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence>
      {winner && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="z-50 absolute w-screen h-screen flex flex-col items-center justify-center backdrop-blur-xl ">
          <motion.h1 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="drop-shadow-md my-10 text-8xl text-center font-bold ">
            {" "}
            <span className="background-pan   text-8xl text-transparent bg-[length:200%] bg-clip-text bg-gradient-to-r from-purple-400 via-pink-600 h-40 to-purple-400 ">
              {winner?.name}
            </span>{" "}
            has won!
          </motion.h1>
          <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
          className="bg-zinc-800 w-[36rem] shadow-xl rounded-md p-5 text-2xl">
            <div className="">
              <div className="grid grid-cols-4 border-b py-1 my-1">
                <span className="font-bold">Name</span>
                <span className="font-bold">Score</span>
                <span className="font-bold">Fails</span>
                <span className="font-bold">Wins</span>
              </div>

              {players.map((player) => (
                <DashboardPlayerItem player={player} />
              ))}
            </div>

            <div>
              <div className="flex  gap-4 my-5">
                <Button text="Again" onClick={handleGameReset} />
                <Button
                  text="Menu"
                  onClick={() => {
                    handleGameReset();
                    navigate("/start");
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
