import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoMasa from '../../../assets/logos/logo_dark.svg'
import image from '../../../assets/images/hero.png'
import slickspirits from '../../../assets/images/slick_spirit_white.png'
import eg4 from '../../../assets/images/voiture.png'
import api from "../../../api";
import { FaInstagram, FaLock, FaTiktok } from "react-icons/fa6";
import type { Social } from "../../../types/socials";
import type { Artwork } from "../../../types/artwork";
import SlickSpiritsCard from "../../../components/Cards/SlickspiritsCard";
// import SlickSpiritsCard from "../../components/SlickspiritsCard";
// import SlickSpiritsCard  from "../../../components/Cards/SlickspiritsCard";


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

    const [artworks, setArtworks] = React.useState<Artwork[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        api.get("/artworks")
            .then((res) => setArtworks(res.data))
            .catch(() => setError("Impossible de charger les artworks"))
            .finally(() => setLoading(false));
    }, []);

    const filteredArtworks = artworks.filter(
        (artwork) => artwork.brand === "slickspirits"
    )

    const filteredTagArtworks = (mytag: string) => 
        filteredArtworks.filter((artwork) => artwork.tags?.includes(mytag)
    )

    return(
        <div className="bg-black flex flex-col h-full min-h-screen gap-2">
            <nav className="relative">
                <Link to="/" className="">
                    <img src={logoMasa} alt="Logo" 
                        loading="lazy" 
                        className="absolute h-10 pl-1 pt-1 md:h-16 w-auto md:pl-2 md:pt-3 z-10" />
                </Link>
                <img src={slickspirits} alt="slickspirits" 
                    loading="lazy" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 z-10"></img>
                <img  src={image} alt="image" 
                    loading="lazy" 
                    className="top-0 w-full h-auto [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"></img>
            </nav>

            <main className="flex-1 px-2">
                {/* présentation groupe */}
                <div className="flex flex-row item-center mx-auto w-full md:w-3/4 gap-2">

                    <p className="[writing-mode:vertical-rl] text-white font-bold shrink-0 px-1 tracking-widest">
                        スリック•スピリット
                    </p>

                    <div className="flow-root text-white">

                        <h1 className="md:hidden font-bold text-base md:text-lg"> Slick Spirits</h1>

                        <div className="float-right ml-4 mb-2 w-2/3 md:w-2/5 [shape-outside:polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)]">
                            <img 
                            src={eg4} 
                            alt="eg4" 
                            className="w-full h-auto object-cover"
                            />
                        </div>

                        <h1 className="hidden md:block md:font-bold md:text-base md:text-lg"> Slick Spirits</h1>
                        <p className="text-xs md:text-sm leading-relaxed mb-3">
                            Voici un exemple simple où le texte vient s'enrouler ler sur la gauche, épousant l'espace laissé libre par l'image placée à droite. k ler sur la gauche, épousant l'espace laissé libre par l'image placée à droite. k ler sur la gauche, épousant l'espace laissé libre par l'image placée à droite. kv ler sur la gauche, épousant l'espace laissé libre par l'image placée à droite. k sur la gauche, épousant l'espace laissé libre par l'image placée à droite. kdxjls hcihfidsh io fdioyiofdyfiofd iofyh fdiofy oduy void iy voifdio vyhdfioy vudyf ouvyodfui vioydf iovyiofdyovidyf oivy iofdyvioydf yvo_ifd yovy ofdy voy fdoy v_ofy_ody vofy vofy _ovyfd_ovy fyvo_udy ofy o
                        </p>

                    </div>
                </div>

                {/* galerie */}
                <div className="text-white">
                    {loading ? (
                        <p> loading </p>
                    ) : error ? (
                        <p> error </p>
                    ) : artworks ? (

                    <div className="flex flex-col gap-4">

                        {title("LOGOS")}
                        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 p-2 md:gap-10">
                            {filteredTagArtworks("logo").map((artwork) =>(
                                <div key={artwork._id} className="w-4/5 shrink-0 md:w-1/5 xs:w-2/5">
                                    <SlickSpiritsCard 
                                        title={artwork.title} 
                                        description={artwork.description} 
                                        image={slickspirits} 
                                        tags={artwork.tags}
                                    />
                                </div>
                            ))}
                        </div>

                        {title("STICKERS")}
                        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 p-2 md:gap-10">
                            {filteredTagArtworks("sticker").map((artwork) =>(
                                <div key={artwork._id} className="w-4/5 shrink-0 md:w-1/5 xs:w-2/5">
                                    <SlickSpiritsCard 
                                        title={artwork.title} 
                                        description={artwork.description} 
                                        image={slickspirits} 
                                        tags={artwork.tags}
                                    />
                                </div>
                            ))}
                        </div>

                        {title("TEXTILES")}
                        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 p-2 md:gap-10">
                            {filteredTagArtworks("textile").map((artwork) =>(
                                <div key={artwork._id} className="w-4/5 shrink-0 md:w-1/5 xs:w-2/5">
                                    <SlickSpiritsCard 
                                        title={artwork.title} 
                                        description={artwork.description} 
                                        image={slickspirits} 
                                        tags={artwork.tags}
                                    />
                                </div>
                            ))}
                        </div>

                        {title("MASCOTTE")}
                        <div className="flex flex-row overflow-x-auto no-scrollbar gap-4 p-2 md:gap-10">
                            {filteredTagArtworks("mascotte").map((artwork) =>(
                                <div key={artwork._id} className="w-4/5 shrink-0 md:w-1/5 xs:w-2/5">
                                    <SlickSpiritsCard 
                                        title={artwork.title} 
                                        description={artwork.description} 
                                        image={slickspirits} 
                                        tags={artwork.tags}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    ) : null}
                </div>

            </main>

            <footer className="bottom-0 w-full bg-black text-white text-xs flex flex-col items-center pb-2 md:flex md:flex-row md:justify-around md:pb-0 md:gap-6">
                {/* copyright */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link to="/">
                        <img src={logoMasa} alt="Logo" loading="lazy" className="h-8"/>
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
                    <a
                        key="insta"
                        href="https://www.instagram.com/_slickspirits_?srtk=OXdlbWZmbnQ1M3dx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-masabeige/70"
                    >
                        <FaInstagram/>
                    </a>
                </div>
            </footer>
        
        </div>
    )

}