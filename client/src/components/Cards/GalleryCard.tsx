import React from 'react';
import masa from '../../assets/logos/logo.svg'

interface CardProps{
    // isEditModalOpen: boolean
    index: number,
    title: string,
    description: string,
    image: string,
    tags: string[],
}

export default function Card({index, title, description, image, tags}: CardProps) {

    // const [isArtworkModalOpenn, setIsArtworkModalOpen] = React.useState(isEditModalOpen);

    return(
        // <div className="grid grid-cols-1 xs:grid-cols-2 p-2 gap-6 md:flex md:flex-col md:items-center">
        //                             {filteredArtworksByTags.map((artwork, index) => (
            <div className=' md:flex md:flex-col md:items-center '>
                <div className={`max-w-[300px] justify-self-center rounded-lg bg-masabeige shadow-lg shadow-masabrown/50 p-2 
                            md:flex md:flex-row md:max-w-full md:w-4/5 md:px-6 md:gap-4
                            ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                    <img src={masa} alt={"illustration_image"} className="w-full aspect-[6/5] object-contain bg-masabrown/50 inset-shadow-sm/40 inset-shadow-masabrown md:w-1/3"></img>

                    <div className="gap-1 md:w-2/3 md:flex md:flex-col">
                        <h1 className="font-bold text-masabrown md:text-xl">{title}</h1>
                        <p className="text-masabrown text-sm text-justify md:flex-1 md:text-base">{description}</p>
                        <div className="flex gap-2 ">{tags.map((tag) => (
                            <p className="text-[0.7rem] italic text-masabrown/70 md:text-sm"> {tag} </p>
                        ))}</div>
                    </div> 
                </div>
                                        
        </div>
                                //     ))}
                                // </div> 
    )
}