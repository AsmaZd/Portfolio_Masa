import { Link, NavLink } from "react-router-dom";
import { FaInstagram, FaTiktok, FaLock } from "react-icons/fa6";
import logoMasa from "../assets/logos/logo.svg"
import React from "react";
import api from "../api";
import type { Social } from "../types/socials";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
    instagram: <FaInstagram/>,
    tiktok: <FaTiktok/>
}

export default function Footer(){

    const [socials, setSocials] = React.useState<Social[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

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

    return(
        <footer className="bottom-0 w-full bg-masabrown text-masabeige text-xs">

            {/* VERSION MOBILE */}
            <div className="md:hidden flex flex-col items-center pb-2">

                {/* copyright */}
                <div className="flex items-center gap-2">
                    <Link to="/">
                        <img src={logoMasa} alt="Logo" className="h-8"/>
                    </Link>
                    <div className="">
                        <p>
                            @ {new Date().getFullYear()} Masa_aart
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
              
            </div>

            {/* VERSION DESKTOP */}
            <div className="hidden md:flex justify-around items-center gap-6">

                {/* copyright */}
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <img src={logoMasa} alt="Logo" className="h-8"/>
                    </Link>

                    <div className="">
                        <p>
                            @ {new Date().getFullYear()} Masa_aart
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


                {/* contact */}
                <div className="flex items-center gap-4">
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


            </div>

        </footer>
    )
}