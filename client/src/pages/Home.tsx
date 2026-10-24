import React from "react";
import api from "../api";
import { NavLink } from "react-router";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import type { Social } from "../types/socials";
import type { Artwork } from "../types/artwork";
import type { Homepage } from "../types/homepage";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    instagram: <FaInstagram/>,
    tiktok: <FaTiktok/>
}

export default function Home(){

    const [homepage, setHomepage] = React.useState<Homepage | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        api.get('/homepage')
            .then((res) => setHomepage(res.data))
            .catch(() => setError("Impossible de charger homepage"))
            .finally(() => setLoading(false));
    }, []);

    return(

        <div className="">
            { loading ? (
                <p> loading </p>
            ) : error ? (
                <p> error </p>
            ) : homepage ? (

                <div className="flex flex-col text-masabrown text-sm gap-2">
                    {/* hero */}
                    <div>
                        <h1 className="text-xl font-extrabold">{homepage.heroTitle}</h1>
                        <div className="flex items-center gap-4" >
                            <img src={"./.." + homepage.heroImage} alt="Image"></img>
                            <p className="text-justify">{homepage.heroSubtitle}</p>
                        </div>
                    </div>

                    {/* artworks */}
                    <div>
                        <h1 className="font-bold"> Galerie: </h1>
                        {homepage.featuredArtwork.map((artwork) => (
                            <div key={artwork._id} className="flex flex-col">
                                <p>{artwork.title}</p>
                                <p>{artwork.description}</p>
                            </div>

                        ))}
                    </div>

                    {/* jeu */}
                    <div>
                        <NavLink to={'/jeu'}>
                            <hr className="w-full h-1 my-4 bg-masabrown md:my-10"/>
                        </NavLink>
                        <p>jfhfdkf hdkfudgkudfhflsdhfkjvdh nufgksqdhfjsgkfsgfjkvhhc kfdhv kdfhgv rhugvrdu yfukeyrguer ugyreufy ury gvuoeroug y kjdfghku fd gh vguu ifhsukeg wfukgrufg us guf su lishkfgsd hdskjvsgkfvk urgurg gfg fgsukgfukghfgs fgsg fugskugfkus gdukfvgfksgfvukfsg vukg fkug vukfw gkvgfwukfhkdjsg vj swgjg kgu ug</p>
                    </div>

                    {/* reseaux sociaux */}
                    <div>
                        <h1 className="font-bold"> Réseaux sociaux:</h1>
                        <div className="flex flex-col gap-2 md:flex-row md:justify-center md:gap-10">
                            {homepage.socials.map((social) => (
                                <div key={social._id} className="flex flex-col">
                                    <a 
                                        key={social._id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center hover:text-masabrown/50 gap-2">
                                    {SOCIAL_ICONS[social.plateform.toLowerCase()] ?? social.plateform}
                                    {social.pseudo}
                                    </a>
                                    <p>description</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
            ) : null }
        </div>

    )
}