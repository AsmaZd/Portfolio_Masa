import masa from '../../assets/logos/logo.svg'


interface CardProps{
    title: string,
    description: string,
    image: string,
    tags: string[],
}

export default function Card({title, description, image, tags}: CardProps) {
    return(
        <div className="flex flex-col w-full aspect-[7/10] md:aspect-[5/7] text-white bg-masabeige rounded-lg shadow-lg shadow-masabrown/50 p-2">
            <img src={image} alt={"illustration_image"} 
                loading="lazy" 
                className="w-full aspect-[6/5] object-contain bg-masabrown/50 inset-shadow-sm/40 inset-shadow-masabrown"></img>

            <div className="flex flex-col flex-1 gap-1 p-2">
                <h1 className="font-bold text-masabrown md:text-xl">{title}</h1>
                <p className="text-masabrown text-sm text-justify md:flex-1 md:text-base sm:text-sm line-clamp-3">{description}</p>
                <div className="flex mt-auto gap-2 ">{tags.map((tag) => (
                    <p key={tag} className="text-[0.5rem] italic text-masabrown/70 md:text-sm"> {tag} </p>
                ))}</div>
            </div> 
        </div>

    )
}
