import React from "react";
import api from "../api";

interface Homepage {
    _id: string,
    heroTitle: string,
    heroSubTitle: string,
    heroImage: string,
    featuredArtwork: [],
    socials: []
}

export default function Home(){

    const [homepage, setHomepage] = React.useState<Homepage | null>(null)
    const [artworks, setArtworks] = React.useState([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        api.get('/homepage')
            .then((res) => setHomepage(res.data))
            .catch(() => setError("Impossible de charger homepage"))
            .finally(() => setLoading(false));
    }, []);

    return(

        <div>
            <h1> homepage</h1>
            { loading ? (
                <p> loading </p>
            ) : error ? (
                <p> error </p>
            ) : homepage ? (
                <div>
                    <p>{homepage.heroTitle}</p>
                </div>
            ) : null }
        </div>

    )
}