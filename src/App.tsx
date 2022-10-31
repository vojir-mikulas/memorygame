import React, {useState} from "react";
import Game from "./pages/Game";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Start from "./pages/Start";
import Player from "./types/Player";
import SplashScreen from "./pages/SplashScreen";
import { AnimatePresence } from "framer-motion"

export const PlayerContext = React.createContext({})

function App() {
    const [players,setPlayers] = useState<Array<Player>>([])
    const [images,setImages] = useState<any>();
  return <div className=' h-screen w-screen text-white bg-zinc-900  overflow-scroll' >
   <Router>
       <PlayerContext.Provider value={{
           players,
           setPlayers,
           images,
           setImages
       }}>
          <AnimatePresence>
            <Routes>
                <Route path={'/'} element={<SplashScreen/>}/>
                <Route path={'/start'} element={<Start/>}/>
                <Route path={'/game'} element={<Game/>}/>
            </Routes>
          </AnimatePresence>
       </PlayerContext.Provider>
   </Router>
  </div>;
}

export default App;
