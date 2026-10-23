import { useEffect, useState } from "react";
import { getArtworks } from "../../services/api";
import type { Artwork } from "../../types/artwork";
import React from "react";
import api from "../../api";

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
        <div>
            <h1>Galerie</h1>

            {/* navbar */}
            <nav className="flex justify-center text-sm">
                <div className="flex flex-row justify-center md:justify-evenly min-w-4/6 px-4 py-1 rounded-lg bg-masabeige gap-2">
                    <button onClick={() => setCategory(ArtworkCategory.ILLU)}
                            className="hover:text-white">
                            illustration
                    </button>
                    <button onClick={() => setCategory(ArtworkCategory.DESIGN)} 
                            className="hover:text-white">
                            design
                    </button>
                    <button onClick={() => setCategory(ArtworkCategory.CROCHET)}
                            className="hover:text-white">
                            crochet
                    </button>
                </div>
            </nav>

            {/* artwork */}
            <div>
                {loading ? (
                    <p> loading </p>
                ) : error ? (
                    <p> error </p>
                ) : artworks ? (
                    <div>
                        <p>artworks</p>
                        {category === ArtworkCategory.ILLU && (
                            filteredArtworks.map((artwork) => (
                                <div className="flex gap-2 bg-green-500">
                                    <p>{artwork.title}</p>
                                    <p>{artwork.category}</p>
                                    <p>{category}</p>
                                </div>
                            ))                        
                        )}
                        {category === ArtworkCategory.DESIGN && (
                            filteredArtworks.map((artwork) => (
                                <div className="flex gap-2 bg-blue-500">
                                        <p>{artwork.title}</p>
                                        <p>{artwork.category}</p>
                                        <p>{category}</p>
                                </div>
                            ))                        
                        )}
                        {category === ArtworkCategory.CROCHET && (
                            filteredArtworks.map((artwork) => (
                                <div className="flex gap-2 bg-red-500">
                                        <p>{artwork.title}</p>
                                        <p>{artwork.category}</p>
                                        <p>{category}</p>
                                </div>
                            ))                        
                        )}

                    </div>
                ) : null }
            </div>

        </div>
    )
}