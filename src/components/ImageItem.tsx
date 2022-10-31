import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {PlayerContext} from "../App";

const ImageItem : React.FC<{ image : any }> = ({image}) => {
    const playerContext: any = useContext(PlayerContext);
    const {images,setImages} = playerContext;
    const [deleteCheck, setDeleteCheck] = useState<boolean>(false);

    const handleDelete = () =>{
        let assets = [...images]
        let index = assets.findIndex(asset => {
            return asset === image;
        });
        setDeleteCheck(false)
        if (index !== -1) {
            assets.splice(index, 1);
            setImages([...assets])
        }

    }

    return (
        <div className={'w-32 h-32 overflow-hidden cursor-pointer relative'} onMouseLeave={()=> setDeleteCheck(false)}>
            {deleteCheck && <div onClick={handleDelete} className='absolute bg-black w-full h-full transition-all opacity-80  text-red-500 flex items-center justify-center text-8xl'>  <FontAwesomeIcon icon={faXmark}/> </div>}
            <img src={image} alt="" className='w-full h-full object-cover' draggable={false} onClick={()=> {
                setDeleteCheck(true)
            }}/>
        </div>
    );
};

export default ImageItem;