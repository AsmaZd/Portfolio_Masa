import { useEffect, useRef, useState } from "react";
import { getArtworks } from "../../services/api";
import type { Artwork } from "../../types/artwork";
import React from "react";
import api from "../../api";
import hero from "../../assets/react.svg";
import masa from "../../assets/logos/logo.svg";
// import useEmblaCarousel from 'embla-carousel-react'
import { Carousel } from "../../components/Carousel";
import { Link, NavLink } from "react-router";
import { FaArrowTrendDown } from "react-icons/fa6";

enum ArtworkCategory {
    ILLU = "illustration",
    DESIGN = "design",
    CROCHET = "crochet"
}

export default function Gallery(){
    const [artworks, setArtworks] = React.useState<Artwork[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const [category, setCategory] = React.useState<ArtworkCategory>(ArtworkCategory.ILLU);
    const [selectedTag, setSelectedTag] = React.useState(null);

    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)

    React.useEffect(() => {
        api.get('/artworks')
            .then((res) => {setArtworks(res.data)})
            .catch(() => setError("Impossible de charger Artwork"))
            .finally(() => setLoading(false));
    }, []);

    const filteredArtworks = artworks.filter(
        (artwork) => artwork.category === category
    ) 

    const filteredArtworksByTags = selectedTag
        ? filteredArtworks.filter((artwork) => artwork.tags?.includes(selectedTag))
        : filteredArtworks ;

    const uniqueTags = [...new Set(filteredArtworks.flatMap((artwork) => artwork.tags || []))]

    const handleCategoryChange = (category) => {
        setCategory(category);
        setSelectedTag(null);
    }

    const handleLoad = () => {
        const iframeDoc = iframeRef.current?.contentDocument;
        if(iframeDoc){
            const style = iframeDoc.createElement('style');
            style.innerHTML = `
            *{
                pointer-events: none !important;
                user-select: none !important;
            } html, body {
                pointer-events: auto !important;
            }
            `;
            iframeDoc.head.appendChild(style);
        }
    }

    const tagListBlock = (
        <div className="flex flex-row overflow-x-auto no-scrollbar items-center border-y-1 border-masabeige text-xs text-masabrown/80 py-1 gap-2 
                        md:flex-col md:border-0 md:text-base md:py-0">
        {uniqueTags.map((tag) => {
        const isSelected = selectedTag === tag;
        console.log(`Tag: "${tag}" | Selected: "${selectedTag}" | Est-ce égal ?`, isSelected);
        return (
        <button 
            key={tag} 
            onClick={() => setSelectedTag(isSelected ? null : tag)} 
            className={`hover:text-masabrown
                        ${isSelected ? 'font-extrabold' : ''}`}>
            #{tag}
        </button>
        )}
        )}
        </div>
    )

    return(
        <div className="md:flex md:flex-row md:pt-16 pt-14">
            {/* sidebar */}
            {isOpen ? (
                <aside className="hidden md:sticky md:flex md:flex-col md:top-16 md:w-1/6 md:h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-4rem)] md:shrink-0 md:overflow-hidden md:bg-masabeige md:box-border">
                    <div className="relative flex items-center justify-between w-full border-b-2 border-masabrown">
                        <div className="w-9"></div>
                        <p className="absolute left-1/2 -translate-x-1/2 text-base text-masabrown font-bold"> Filtrer: </p>
                        <button onClick={() => setIsOpen(false)} className="p-2 cursor-pointer shrink-0">
                            <span className="text-lg text-masabrown hover:text-masabrown/50">☰</span>
                        </button>
                    </div>
                    <div className="flex flex-col overflow-y-auto my-auto w-full gap-2">
                        {tagListBlock}
                    </div>
                </aside>
            ) : (
                <aside className="hidden md:sticky md:top-16 md:shrink-0 md:h-[calc(100dvh-4rem)] md:flex md:flex-col md:items-center md:pt-3 md:px-2 bg-masabeige box-border">
                    <button onClick={() => setIsOpen(true)} className="p-2 text-masabrown text-lg hover:text-masabrown/50 cursor-pointer">
                        ☰
                    </button>
                </aside>
            )}

            {/* main page */}
            <div className="flex flex-col gap-4">

                {/* navbar */}
                <nav className="flex justify-center text-masabrown text-sm font-semibold pt-6 md:pt-8 md:text-base">
                    <div className="flex flex-row justify-evenly min-w-4/6 px-4 py-1 rounded-lg bg-masabeige gap-2">

                        <button onClick={() => handleCategoryChange(ArtworkCategory.ILLU)}
                                className="hover:text-masabrown/50">
                                illustration
                        </button>
                        <p className="text-white font-bold">|</p>
                        <button onClick={() => handleCategoryChange(ArtworkCategory.DESIGN)} 
                                className="hover:text-masabrown/50">
                                design
                        </button>
                        <p className="text-white font-bold">|</p>
                        <button onClick={() => handleCategoryChange(ArtworkCategory.CROCHET)}
                                className="hover:text-masabrown/50">
                                crochet
                        </button>
                    </div>
                </nav>

                {/* artworks */}
                <div>
                    {loading ? (
                        <p> loading </p>
                    ) : error ? (
                        <p> error </p>
                    ) : artworks ? (
                        <div>

                            {/* tag list for mobile and illu/crochet category */}
                            <div className="pb-2 md:hidden">
                                {category !== "design" ? tagListBlock : null}
                            </div>

                            {/* illustration */}
                            {category === ArtworkCategory.ILLU && (
                                <div className="grid grid-cols-1 xs:grid-cols-2 p-2 gap-6 md:flex md:flex-col md:items-center">
                                    {filteredArtworksByTags.map((artwork, index) => (
                                        <div key={artwork._id} 
                                            className={`max-w-[300px] justify-self-center rounded-lg bg-masabeige shadow-lg shadow-masabrown/50 p-2 
                                                    md:flex md:flex-row md:max-w-full md:w-4/5 md:px-6 md:gap-4
                                                    ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                                        >
                                            <img src={masa} alt={"illustration_image"} className="w-full aspect-[6/5] object-contain bg-masabrown/50 inset-shadow-sm/40 inset-shadow-masabrown md:w-1/3"></img>

                                            <div className="gap-1 md:w-2/3 md:flex md:flex-col">
                                                <h1 className="font-bold text-masabrown md:text-xl">{artwork.title}</h1>
                                                <p className="text-masabrown text-sm text-justify md:flex-1 md:text-base">{artwork.description}</p>
                                                <div className="flex gap-2 ">{artwork.tags.map((tag) => (
                                                    <p className="text-[0.7rem] italic text-masabrown/70 md:text-sm"> {tag} </p>
                                                ))}</div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>                       
                            )}

                            {/* design */}
                            {category === ArtworkCategory.DESIGN && (
                                <div className="flex flex-col gap-4">
                                    {/* appercu par univers */}
                                    <div className="flex px-4 md:justify-center">
                                        <Carousel style="bg-masabrown w-full h-48 rounded-lg inset-shadow-sm/50 inset-shadow-taupe-950 z-0 xs:h-64 md:w-4/6 md:h-96">
                                            {/* slickspirits */}
                                            <div className="flex flex-col h-full bg-black">
                                                <iframe
                                                    ref={iframeRef}
                                                    src="/slickspirits"
                                                    title="apercu de slickspirits"
                                                    onLoad={handleLoad}
                                                    className="flex-1 w-full"
                                                    >
                                                </iframe>
                                                <NavLink to="/slickspirits" className="flex justify-center text-sm text-masabeige/50 hover:text-masabeige">
                                                    tu veux en voir plus ? 
                                                </NavLink>
                                            </div>
                                            {/* slickspirits */}
                                            <div className=" h-full bg-blue-300"> en cours </div>
                                        </Carousel>
                                    </div>

                                    <div className="md:hidden">
                                    {tagListBlock}
                                    </div>

                                    {/* cards */}
                                    <div className="grid grid-cols-1 xs:grid-cols-2 p-2 gap-6 md:flex md:flex-col md:items-center">
                                        {filteredArtworksByTags.map((artwork, index) => (
                                            <div key={artwork._id} 
                                                className={`max-w-[300px] justify-self-center rounded-lg bg-masabeige shadow-lg shadow-masabrown/50 p-2 
                                                        md:flex md:flex-row md:max-w-full md:w-4/5 md:px-6 md:gap-4
                                                        ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                                            >
                                                <img src={masa} alt={"illustration_image"} className="w-full aspect-[6/5] object-contain bg-masabrown/50 inset-shadow-sm/40 inset-shadow-masabrown md:w-1/3"></img>

                                                <div className="gap-1 md:w-2/3 md:flex md:flex-col">
                                                    <h1 className="font-bold text-masabrown md:text-xl">{artwork.title}</h1>
                                                    <p className="text-masabrown text-sm text-justify md:flex-1 md:text-base">{artwork.description}</p>
                                                    <div className="flex gap-2 ">{artwork.tags.map((tag) => (
                                                        <p className="text-[0.7rem] italic text-masabrown/70 md:text-sm"> {tag} </p>
                                                    ))}</div>
                                                </div> 
                                            </div>
                                        ))}
                                    </div>   
                                </div>
                            )}

                            {/* crochet */}
                            {category === ArtworkCategory.CROCHET && (
                                <div className="grid grid-cols-1 xs:grid-cols-2 p-2 gap-6 md:flex md:flex-col md:items-center">
                                    {filteredArtworksByTags.map((artwork, index) => (
                                        <div key={artwork._id} 
                                            className={`max-w-[300px] justify-self-center rounded-lg bg-masabeige shadow-lg shadow-masabrown/50 p-2 
                                                    md:flex md:flex-row md:max-w-full md:w-4/5 md:px-6 md:gap-4
                                                    ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                                        >
                                            <img src={masa} alt={"illustration_image"} className="w-full aspect-[6/5] object-contain bg-masabrown/50 inset-shadow-sm/40 inset-shadow-masabrown md:w-1/3"></img>

                                            <div className="gap-1 md:w-2/3 md:flex md:flex-col">
                                                <h1 className="font-bold text-masabrown md:text-xl">{artwork.title}</h1>
                                                <p className="text-masabrown text-sm text-justify md:flex-1 md:text-base">{artwork.description}</p>
                                                <div className="flex gap-2 ">{artwork.tags.map((tag) => (
                                                    <p className="text-[0.7rem] italic text-masabrown/70 md:text-sm"> {tag} </p>
                                                ))}</div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>                       
                            )}

                        </div>
                    ) : null }
                </div>

            </div>
        </div>
    )
}