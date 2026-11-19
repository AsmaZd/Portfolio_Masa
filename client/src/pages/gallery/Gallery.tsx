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
import { useAuth } from "../../context/AuthContext";
import ArtworkEditModal from "../../components/edits/ArtworkEditModel";
import GalleryCard from "../../components/cards/GalleryCard";

enum ArtworkCategory {
    ILLU = "illustration",
    DESIGN = "design",
    CROCHET = "crochet"
}

export default function Gallery(){
    const {user} = useAuth();

    const [artworks, setArtworks] = React.useState<Artwork[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const [category, setCategory] = React.useState<ArtworkCategory>(ArtworkCategory.ILLU);
    const [selectedTag, setSelectedTag] = React.useState(null);

    const [isTagOpen, setIsTagOpen] = React.useState<boolean>(false)
    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = React.useState<boolean>(false);

    const [isArtworkModalOpen, setIsArtworkModalOpen] = React.useState<boolean>(false)
    const [selectedArtwork, setSelectedArtwork] = React.useState<Artwork>();

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

    const handleDelete = (id: string) => {
        try{
            api.delete(`/artworks/${id}`);
            setArtworks(prev => prev.filter(art => art._id !== id));
        } catch(err){
            console.log("Cet artwork ne s'est pas supprimé", err)
        }
    }

    const tagListBlock = (
        <div className="flex flex-row overflow-x-auto no-scrollbar items-center border-y-1 border-masabeige text-xs text-masabrown/80 p-1 gap-2 
                        md:flex-col md:border-0 md:text-base md:py-0">
        {uniqueTags.map((tag) => {
        const isSelected = selectedTag === tag;

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

    const EditCardBlock = () =>
        <div className="grid grid-cols-1 xs:grid-cols-2 mx-auto p-2 gap-6">
            {filteredArtworksByTags.map((artwork, index) => (
                <div key={artwork._id} className={`justify-self-center ${user ? "border-b-2 border-masabeige" : ""}`}>
            
                    <GalleryCard index={index} title={artwork.title} description={artwork.description} image={artwork.imageUrl} tags={artwork.tags}>
                        
                    </GalleryCard>

                    {user && (
                        <div className="flex flex-row justify-center items-center gap-6">
                        <section className="flex items-center">
                        {/* {user && ( */}
                            <button onClick={() => {setIsArtworkModalOpen(true) ; setSelectedArtwork(artwork)}}
                                    className="bg-masabrown/80 text-masabeige rounded-sm my-2 p-1 hover:bg-masabrown">
                                {/* {isArtworkModalOpen ? "Modification en cours..." : "Modifier"} */}
                                Modifier
                            </button>
                        {/* )} */}
                        </section>
                        <button onClick={() => setIsDeletePopUpOpen(true)}
                                className="bg-masabrown/80 text-masabeige rounded-sm my-2 p-1 hover:bg-masabrown">
                                Supprimer
                        </button>

                        {isDeletePopUpOpen && (
                            <div className="fixed inset-0 flex flex-col m-auto justify-center w-[90%] aspect-[5/3] bg-masabeige border-2 border-masabrown rounded-lg z-50 gap-2
                                            md:w-[20%]">
                                <p className="flex justify-center font-bold text-masabrown"> T'es sur de toi ? </p>
                                <div className="flex flex-row justify-center text-masabeige gap-4">
                                    <button onClick={() => handleDelete(artwork._id)}
                                            className="bg-masabrown rounded-sm px-4 py-1 hover:bg-masabrown/70">
                                        Oui
                                    </button>
                                    <button onClick={() => setIsDeletePopUpOpen(false)}
                                            className="bg-masabrown rounded-sm px-4 py-1 hover:bg-masabrown/70">
                                        Non 
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                    
                </div>
            ))}

            <ArtworkEditModal isOpen={isArtworkModalOpen} 
                                        currentArtwork={selectedArtwork} 
                                        onClose={() => {setIsArtworkModalOpen(false); setSelectedArtwork(null)}} 
                                        onSave={(updatedArtworks: Artwork) => setArtworks(prev => prev.map(art => art._id === updatedArtworks._id ? updatedArtworks : art))}                                                           
                    >
            </ArtworkEditModal>
        </div>     

    return(
        <div className="md:flex md:flex-row md:pt-16 pt-14">
            {/* sidebar */}
            {isTagOpen ? (
                <aside className="hidden md:sticky md:flex md:flex-col md:top-16 md:w-1/6 md:h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-4rem)] md:shrink-0 md:overflow-hidden md:bg-masabeige md:box-border">
                    <div className="relative flex items-center justify-between w-full border-b-2 border-masabrown">
                        <div className="w-9"></div>
                        <p className="absolute left-1/2 -translate-x-1/2 text-base text-masabrown font-bold"> Filtrer: </p>
                        <button onClick={() => setIsTagOpen(false)} className="p-2 cursor-pointer shrink-0">
                            <span className="text-lg text-masabrown hover:text-masabrown/50">☰</span>
                        </button>
                    </div>
                    <div className="flex flex-col overflow-y-auto my-auto w-full gap-2">
                        {tagListBlock}
                    </div>
                </aside>
            ) : (
                <aside className="hidden md:sticky md:top-16 md:shrink-0 md:h-[calc(100dvh-4rem)] md:flex md:flex-col md:items-center md:pt-3 md:px-2 bg-masabeige box-border">
                    <button onClick={() => setIsTagOpen(true)} className="p-2 text-masabrown text-lg hover:text-masabrown/50 cursor-pointer">
                        ☰
                    </button>
                </aside>
            )}

            {/* main page */}
            <div className="flex flex-col w-full gap-4">

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
                                <div>
                                    <EditCardBlock></EditCardBlock>
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
                                    <EditCardBlock></EditCardBlock>
                                </div>
                            )}

                            {/* crochet */}
                            {category === ArtworkCategory.CROCHET && (
                                <div>
                                    <EditCardBlock></EditCardBlock>
                                </div>                      
                            )}

                        </div>
                    ) : null }
                </div>

            </div>
        </div>
    )
}