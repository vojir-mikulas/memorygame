import React from 'react';
import Player from "../types/Player";

interface props{
    players: Array<Player>
}
const Leaderboard : React.FC<props> = ({players}) => {
    return (
        <div className='bg-zinc-800 shadow-lg mobile:hidden rounded-md p-6 w-80'>
            <h3 className='text-center text-4xl border-b py-2 my-2'>Players</h3>
            <ul className='text-2xl   '>
                {players.map((player: Player) =>{
                    return(
                        <li className='flex justify-between' key={player.name}>{player.name} <span>{player.score}</span></li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Leaderboard;