import React, {useContext} from 'react';
import {PlayerContext} from "../App";
import ImageItem from "./ImageItem";

const ImageList = () => {
    const playerContext: any = useContext(PlayerContext);
    const {images} = playerContext;
    return (
        <div className={'flex gap-2 justify-center'}>
            <div className={'flex flex-wrap md:container gap-2 justify-start'}>
            {images && images.map((image:any)=>{
                return <ImageItem image={image}/>
            })}
            </div>
        </div>
    );
};

export default ImageList;