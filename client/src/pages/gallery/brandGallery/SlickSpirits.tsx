import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoMasa from '../../../assets/logos/logo_dark.svg'
import image from '../../../assets/images/hero.png'
import slickspirits from '../../../assets/images/slick_spirit_white.png'
import api from "../../../api";
import { FaInstagram, FaLock, FaTiktok } from "react-icons/fa6";
import type { Social } from "../../../types/socials";
import type { Artwork } from "../../../types/artwork";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    instagram: <FaInstagram/>,
    tiktok: <FaTiktok/>
}

const title = (name: string) => {
    return (
        <div className="flex items-center text-white gap-0.5">
            <div className="flex h-6 gap-0.5 md:h-10 md:gap-1 pt-1">
                <div className="w-0.5 md:w-2 bg-white"></div>
                <div className="w-1 md:w-4 bg-white"></div>
                <div className="w-1.5 md:w-6 bg-white"></div>
                <div className="w-2 md:w-8 bg-white"></div>
                <div className="w-2.5 md:w-10 bg-white"></div>
                <div className="w-3 md:w-12 bg-white"></div>
            </div>
            <h1 className="text-3xl leading-none font-extrabold md:text-6xl">{name}</h1>
        </div>
    )
};

export default function SlickSpirits(){

    const [socials, setSocials] = React.useState<Social[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const [artworks, setArtworks] = React.useState<Artwork[]>([]);
    const [loading2, setLoading2] = React.useState<boolean>(true);
    const [error2, setError2] = React.useState<string | null>(null);

    React.useEffect(() => {
        api.get("/socials")
            .then((res) => setSocials(res.data))
            .catch(() => setError("Impossible de charger les réseaux sociaux"))
            .finally(() => setLoading(false));
    }, []);

    const socialsList = loading ? (
        <p>loading</p>
    ) : error ? (
        <p> error </p>
    ) : (
        <div className="flex items-center gap-2">
            {socials.map((social) => (
                <a
                    key={social._id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-masabeige/70"
                >
                    {SOCIAL_ICONS[social.plateform.toLowerCase()] ?? social.plateform}
                </a>
            ))}
        </div>
    )

    const artworkList = loading2 ? (
        <p>loading</p>
    ) : error2 ? (
        <p> error </p>
    ) : artworks ? (
        <div className="flex items-center gap-2">
            {artworks.map((artwork) => (
                <></>
            ))}
        </div>
    ) : null;


    return(
        <body className="bg-black flex flex-col h-full min-h-screen gap-2">
            <nav className="relative">
                <Link to="/" className="">
                    <img src={logoMasa} alt="Logo" className="absolute h-10 pl-1 pt-1 md:h-16 w-auto md:pl-2 md:pt-3 z-10" />
                </Link>
                <img src={slickspirits} alt="slickspirits" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 z-10"></img>
                <img  src={image} alt="image" className=" top-0 w-full h-auto [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"></img>
            </nav>

            <main className="flex-1 px-2">
                {/* présentation groupe */}
                <div></div>

                {/* galerie */}
                <div className="text-white">
                    {title("LOGO")}

                    {title("STICKERS")}

                    {title("VETEMENT")}

                    {title("MASCOTTE")}
                </div>

            </main>

            <footer className="bottom-0 w-full bg-black text-white text-xs flex flex-col items-center pb-2 md:flex md:flex-row md:justify-around md:pb-0 md:gap-6">
                {/* copyright */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link to="/">
                        <img src={logoMasa} alt="Logo" className="h-8"/>
                    </Link>
                    <div>
                        <p>
                            © {new Date().getFullYear()} Masa_aart
                        </p>
                    </div>
                    {/* connection admin */}
                    <NavLink
                        to='/admin_signin'
                        className={"hover:text-masabeige/70"}
                    >
                        <FaLock/>
                    </NavLink>
                </div>

                <div className="flex items-center gap-4">
                    {/* contact */}
                    <NavLink
                        to='/contact'
                        className={"hover:text-masabeige/70"}
                    >
                        Contact
                    </NavLink>
                    |
                    {/* reseaux sociaux */}
                    {socialsList}
                </div>
            </footer>
        
        </body>
    )

}