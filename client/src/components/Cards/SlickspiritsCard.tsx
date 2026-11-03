import React from 'react';
import logoMasa from '../../assets/logos/logo_dark.svg'


interface CardProps {
    title: string,
    description: string,
    image: string,
    tags: string[],
}

export default function SlickSpiritsCard({title, description, image, tags}: CardProps) {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <>
        <div onClick={() => setIsOpen(true)} className="flex flex-col w-full aspect-[5/7] text-white bg-black shadow-sm/80 shadow-gray-500">
            <img src={image} alt={"illustration_image"} 
                loading="lazy" 
                className="w-full aspect-[6/5] object-contain bg-black border-b-2 border-b-white"></img>

            <div className="flex flex-col flex-1 gap-1 p-2">
                <h1 className="font-bold md:text-xl">{title}</h1>
                <p className="text-xs text-justify line-clamp-2 md:text-base md:line-clamp-3">{description}</p>
                <button onClick={() => setIsOpen(true)} className="text-xs font-bold text-center hover:text-white/60 md:text-sm">
                    Lire la suite →
                </button>
                <div className="flex mt-auto gap-2 ">{tags.map((tag) => (
                    <p key={tag} className="text-[0.5rem] italic text-white/70 md:text-sm"> {tag} </p>
                ))}</div>
            </div> 
        </div>

        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                <div className="flex flex-col w-full aspect-[5/7] text-white bg-black shadow-sm/80 shadow-gray-500 md:w-1/4 z-60">
                    <img src={image} alt={"illustration_image"} 
                        loading="lazy" 
                        className="w-full aspect-[6/5] object-contain bg-black border-b-2 border-b-white"></img>

                    <div className="flex flex-col flex-1 gap-1 p-2">
                        <h1 className="font-bold md:text-xl">{title}</h1>
                        <p className="text-xs text-justify md:flex-1 md:text-base">{description}</p>
                        <button onClick={() => setIsOpen(false)} className="text-xs font-bold text-center hover:text-white/60">
                            Retour
                        </button>
                        <div className="flex mt-auto gap-2 ">{tags.map((tag) => (
                            <p key={tag} className="text-[0.5rem] italic text-white/70 md:text-sm"> {tag} </p>
                        ))}</div>
                    </div> 
                </div>
                <div onClick={() => setIsOpen(false)} className='absolute w-full h-full z-40'>
                        
                </div>
            </div>

        )}

        </>
    )
}