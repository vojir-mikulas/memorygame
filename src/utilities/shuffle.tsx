import Card from "../types/Card";

const shuffle = (images : any) => {
    const assets : Array<Card> = [];
    if(!images) return []

    //load the images
    images.forEach((image : any)=>{
        assets.push({image});
    })

    return [...assets, ...assets]
        .sort(() => Math.random() - 0.5)
        .map((card) => (
        {
            ...card,
            id: Math.random()
        }
    ))
}

export default shuffle;