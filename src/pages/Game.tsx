import React, {useContext, useEffect, useState} from 'react';
import shuffle from "../utilities/shuffle";
import CardItem from "../components/CardItem";
import Card from "../types/Card";
import {PlayerContext} from "../App";
import {useNavigate} from "react-router-dom";
import Player from "../types/Player";
import Dashboard from "../components/Dashboard";
import Leaderboard from "../components/Leaderboard";
import { motion, AnimatePresence } from "framer-motion"
import ImageList from '../components/ImageList';

const Game: React.FC = () => {
    const navigate = useNavigate();

    const playerContext: any = useContext(PlayerContext);
    const {players,setPlayers,images:assets} = playerContext
    const [currentPlayer,setCurrentPlayer] = useState<Player>(players[0])

    const [cards, setCards] = useState<Array<Card>>(()=>(shuffle(assets))); // Cards array from assets
    const [pickFirst, setPickFirst] = useState<Card | null>(null); // First selection
    const [pickSecond, setPickSecond] = useState<Card | null>(null); // Second selection
    const [disabled, setDisabled] = useState<boolean>(false); // Delay handler
    const [winner, setWinner] = useState<Player | null>(null) // Set winner



    const handleCardSelect = (card: Card) => {
        if (!disabled) pickFirst ? setPickSecond(card) : setPickFirst(card);
    }
    const handleTurn = () => {
        setPickFirst(null);
        setPickSecond(null);
        setDisabled(false);
    };
    const handleNextPlayer = () =>{
        let index = players.findIndex((player : Player) => (player.name === currentPlayer.name));
        index += 1;
        if((index + 1) > players.length) index = 0;
        // Set next player
        setCurrentPlayer({...players[index]})
    }
    const handlePropIncrement = (prop : string) =>{
        setPlayers((prevPlayers:Array<Player>)=>{
            return prevPlayers.map((player : Player) =>{
                //Increment score to current player that just matched
                if(player.name === currentPlayer.name){
                    let playerTemp : Player = {...player};
                    // @ts-ignore
                    playerTemp[prop] += 1;
                    return playerTemp;
                }
                return player
            })
        })
    }
    const handleGameReset = () =>{
        //reset all data
        setWinner(null)
        setPlayers((prevPlayers : Array<Player>) =>{
            return prevPlayers.map((player)=>{
                return {
                    name: player.name,
                    score: 0,
                    wins: player.wins,
                    fails:0,
                }
            })
        })
        handleTurn();
        setCards(()=>(shuffle(assets)));
    }

    useEffect(() => {
        if(players.length === 0 || currentPlayer === undefined) navigate('/')

        let pickTimer : string | number | NodeJS.Timeout | undefined;
        //If two cards have been clicked
        if (pickFirst && pickSecond) {
            let matched : boolean = false;
            // If cards are the same
            if (pickFirst.image === pickSecond.image) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.image === pickFirst.image) {
                            // Update card property
                            return {...card, matched: true}
                        }
                        // If no match, return card
                        return card
                    })
                })
                handlePropIncrement('score');
                matched = true;
            }
            //Disable user input to prevent user input spam
            setDisabled(true)
            pickTimer = setTimeout(() => {
                if(!matched) {
                    handlePropIncrement('fails')
                    handleNextPlayer();
                }
                handleTurn();
            }, matched ? 0 : 1000)
        }

        return () => {
            if(pickTimer) clearTimeout(pickTimer);
        };
    }, [ pickFirst, pickSecond])
    useEffect(() => {
        // Check for any remaining card matches
        const checkWin = cards.filter((card) => !card.matched);

        // All matches made, handle win/badge counters
        if (cards.length && checkWin.length < 1) {
            let highestScore = Math.max(...players.map((player : Player) => player.score))
            let winner = players.find((player : Player)=> player.score === highestScore)
            setWinner({...winner});
            setCurrentPlayer({...winner});
            handlePropIncrement('wins')
        }
    }, [cards]);
    useEffect(()=>{
        if(assets === undefined || assets.length === 0) navigate('/')
        handleGameReset()
    },[])

    const handleGridCalc = ()=>{
        if(Math.sqrt(cards.length) % 1 === 0) {
        return Math.sqrt(cards.length)
        } else {
          if(cards.length > 40)  return  Math.ceil(Math.sqrt(cards.length) )  + 2;
          return  Math.ceil(Math.sqrt(cards.length) )  
        }

       
    }
    if(!currentPlayer) return <div></div>
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
         className=' h-full mx-auto flex flex-col items-center   '>
             <Dashboard players={players} handleGameReset={handleGameReset} winner={winner} />
            <motion.h1 
            key={currentPlayer.name}
            initial={{ opacity: 0, scale:0 }}
            animate={{ opacity: 1, scale:1 }}
            exit={{ opacity: 0, scale:0  }}
            transition={{ type: "spring", stiffness: 400 }}
            className='font-extrabold text-6xl mt-2 mb-5 text-center'>Its  <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>{currentPlayer.name}'s</span> turn</motion.h1>
           <div className='flex gap-10   w-full  justify-around flex-wrap'>
          
            <div className='grid gap-2 w-2/3   '
            style={{gridTemplateColumns: `repeat(${handleGridCalc()}, minmax(2rem, 10rem))`,}}
                >
                {
                    cards.map((card) => {
                        const {id, image, matched} = card;
                        return (
                            <CardItem
                                key={id}
                                image={image}
                                selected={card === pickFirst || card === pickSecond || matched !== undefined}
                                onClick={() => handleCardSelect(card)}
                            />
                        )
                    })
                }
            </div>
            <Leaderboard players={players}/>
           </div>
        </motion.div>
    );
};

export default Game;