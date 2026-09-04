import { useEffect, useState } from "react";
import { getArtworks } from "../../services/api";

export default function Gallery(){
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        getArtworks().then((response) => {
            setArtworks(response.data);
        })
    }, []);

    return(
    <div>
        <h1>Galerie</h1>
        {artworks.map((artwork) => (
            <div key={artwork.id}>
            <h2>{artwork.title}</h2>
            <p>{artwork.description}</p>
            <p>Catégorie: {artwork.category}</p>
            <p>Tags: {artwork.tags.join(', ')}</p>
        </div>
        ))}
    </div>
    )
}