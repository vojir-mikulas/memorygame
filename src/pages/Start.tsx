import React, {useContext, useEffect, useRef, useState} from 'react';
import {PlayerContext} from "../App";
import Player from "../types/Player";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark,faUpload,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import ImageList from "../components/ImageList";
import { motion } from "framer-motion"
import Button from '../components/Button'

const Start = () => {
    const navigate = useNavigate();
    const playerContext: any = useContext(PlayerContext);
    const {players} = playerContext
    const [selectingPlayers, setSelectingPlayers] = useState<boolean>(true);

    const handleStartGame = () => {
        if (players.length !== 0) navigate('/game')
    }
    const handleCardSelect = () =>{
        if (players.length !== 0) setSelectingPlayers(false)
    }
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='container mx-auto flex flex-col items-center   '>
            <div className='  flex flex-col relative  gap-3  w-[38rem] items-center bg-zinc-800 p-8 my-20 rounded-md shadow-xl'>
                {!selectingPlayers && <div className='absolute top-5 right-5 cursor-pointer' onClick={()=>(setSelectingPlayers(true))}>
                    <FontAwesomeIcon icon={faArrowLeft}/> Add players
                </div>}
            <h2 className='text-4xl font-medium border-b w-full text-center py-3'>{selectingPlayers ? 'Add players' : 'Select images'}</h2>
                {selectingPlayers ? <Players/> : <CardsSelect/>}
              
                {selectingPlayers 
                ? <Button text='Select cards' onClick={()=>{handleCardSelect()}}/> 
                : < Button text='Start' onClick={()=>{handleStartGame()}}/> }   
            </div>
        </motion.div>
    );
};


const Players = () => {
    const playerContext: any = useContext(PlayerContext);
    const {players, setPlayers} = playerContext


    const handleDeleteUser = (name: string | undefined) => {
        if (!name) return;

        let arr = [...players]
        let index = arr.findIndex(player => {
            return player.name === name;
        });
        if (index !== -1) {
            arr.splice(index, 1);
            setPlayers([...arr])
        }
    }
    const handleAddUser = () => {
        if (!playerName || players.find((player: Player) => (player.name === playerName))) return

        setPlayers((prevPlayers: Array<Player>) => {
            return [...prevPlayers, {
                name: `${playerName}`,
                score: 0,
                wins: 0,
                fails: 0,
            }]
        })
        setPlayerName('')
    }
    const [playerName, setPlayerName] = useState<string>('')

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
         className='w-72 flex flex-col items-center'>
             
            <ul className='w-full'>
                {players.map((player: Player) => (
                    <li className='text-xl w-full flex justify-between' key={player.name}>{player?.name} <span
                        className='text-red-500 cursor-pointer'
                        onClick={() => handleDeleteUser(player?.name)}> <FontAwesomeIcon icon={faXmark}/> </span></li>
                ))}
            </ul>

            <div className='flex gap-3 w-full'>
                <input placeholder='Player name' className={'h-10 w-full text-xl my-4 p-2 rounded-md bg-zinc-600 text-white' }
                       onChange={(e) => (setPlayerName(e.currentTarget.value))} value={playerName ? playerName : ''}
                       type="text" onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddUser();
                }}/>

            </div>
        </motion.div>
    );
};

const CardsSelect = () => {
    const playerContext: any = useContext(PlayerContext);
    const {setImages} = playerContext
    const [selectedImages, setSelectedImages] = useState<any>();

    const handleImageChange = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImages(undefined)
            return
        }
        let files = e.currentTarget.files

        setSelectedImages(files)
    }


    useEffect(() => {
        if (!selectedImages || selectedImages.length === 0) return
        let images: Array<any> = []
        for (let i = 0; i < selectedImages.length; i++) {
            let file = selectedImages[i];
            const objectUrl = URL.createObjectURL(file)
            images.push(objectUrl)
        }
        setImages([...images])
        return () => {
            for (let i = 0; i < selectedImages.length; i++) {
                let file = selectedImages[i];
                URL.revokeObjectURL(file)
            }
        }
    }, [selectedImages])
    return (
        <>
            <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
            className='flex flex-col items-center'>
                <input onChange={handleImageChange} className="hidden" type="file"
                       id="images" name="images"
                       accept="image/png, image/jpeg" multiple/>

                       <label htmlFor="images">
                        <div className='my-5 cursor-pointer border-4 w-40 h-40 border-zinc-600 text-zinc-600 rounded-lg flex items-center justify-center text-7xl'> <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon></div>
                       </label>
                <ImageList/>
            </motion.div>
        </>
    );
};


export default Start;