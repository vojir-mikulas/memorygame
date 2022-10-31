import React from 'react';
import Player from "../types/Player";

interface props {
    player: Player;
}

const DashboardPlayerItem: React.FC<props> = ({player}) => {
    return (
        <div className="grid grid-cols-4 my-2 ">
            <span>{player.name}</span>
            <span>{player.score}</span>
            <span>{player.fails}</span>
            <span>{player.wins}</span>
        </div>
    );
};

export default DashboardPlayerItem;