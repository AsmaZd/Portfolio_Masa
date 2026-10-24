import { useEffect, useState } from "react";
import { getArtworks } from "../../services/api";
import type { Artwork } from "../../types/artwork";
import React from "react";
import api from "../../api";
import hero from "../../assets/react.svg";
import masa from "../../assets/logos/logo.svg";


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

    React.useEffect(() => {
        api.get('/artworks')
            .then((res) => {setArtworks(res.data)})
            .catch(() => setError("Impossible de charger Artwork"))
            .finally(() => setLoading(false));
    }, []);

    const filteredArtworks = artworks.filter(
        (artwork) => artwork.category === category
    )  

    return(
        <div className="flex flex-col gap-2">
            <h1>Galerie</h1>

            {/* navbar */}
            <nav className="flex justify-center text-masabrown text-sm font-semibold md:text-base">
                <div className="flex flex-row justify-evenly min-w-4/6 px-4 py-1 rounded-lg bg-masabeige gap-2">

                    <button onClick={() => setCategory(ArtworkCategory.ILLU)}
                            className="hover:text-masabrown/50">
                            illustration
                    </button>
                    <p className="text-white font-bold">|</p>
                    <button onClick={() => setCategory(ArtworkCategory.DESIGN)} 
                            className="hover:text-masabrown/50">
                            design
                    </button>
                    <p className="text-white font-bold">|</p>
                    <button onClick={() => setCategory(ArtworkCategory.CROCHET)}
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
                        {/* illustration */}
                        {category === ArtworkCategory.ILLU && (
                            <div className="grid grid-cols-1 xs:grid-cols-2 p-2 gap-6 md:flex md:flex-col md:items-center">
                                {filteredArtworks.map((artwork, index) => (
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
                            filteredArtworks.map((artwork) => (
                                <div key={artwork._id} className="flex gap-2 bg-blue-500">
                                        <p>{artwork.title}</p>
                                        <p>{artwork.category}</p>
                                </div>
                            ))                        
                        )}

                        {/* crochet */}
                        {category === ArtworkCategory.CROCHET && (
                            filteredArtworks.map((artwork) => (
                                <div key={artwork._id} className="flex gap-2 bg-red-500">
                                        <p>{artwork.title}</p>
                                        <p>{artwork.category}</p>
                                </div>
                            ))                        
                        )}

                    </div>
                ) : null }
            </div>

        </div>
    )
}