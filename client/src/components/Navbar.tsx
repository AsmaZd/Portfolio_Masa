import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoMasa from '../assets/logos/logo.svg'

const NAVIGATION_LINKS = [
    { to: "/gallerie", label: "Galerie" },
    { to: "/jeu", label: "Jeu" },
    { to: "/about", label: "A propos"},
    { to: "/contact", label: "Contact"}
] as const;

export default function Navbar(){
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = '';};
    }, [open]);

    const renderLinks = (isMobile = false) =>
        NAVIGATION_LINKS.map((link) =>
            <NavLink
                key={link.to}
                to={link.to}
                className= "text-masabeige hover:text-masabeige/70"
                onClick={() => isMobile && setOpen(false)}
                >
                {link.label}
            </NavLink>
        );

    return(
        <nav className="flex fixed top-0 left-0 w-full bg-masabrown text-masabeige">
            <div className="flex w-full">

                {/* VERSION MOBILE */}
                <div className="md:hidden grid grid-cols-3 w-full items-center p-2">

                    {/* logo */}
                    <Link to="/" className="flex justify-start">
                        <img src={logoMasa} alt="Logo" className="h-8 w-auto" />
                    </Link>

                    {/* titre */}
                    <div className="flex justify-center">
                        <h1> Portfolio </h1>
                    </div>

                    {/* bouton burger*/}
                    <button className="flex justify-end hover:text-masabeige/70"
                            onClick={() => setOpen(true)}
                            aria-label="Menu"
                    >
                        ☰
                    </button>

                </div>

                {/* VERSION DESKTOP */}
                <div className="hidden md:flex w-full justify-between items-center px-4 py-2">
                    {/* logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logoMasa} alt="Logo" className="h-12 w-auto" />
                        <h1 className="text-xl"> Portfolio </h1>
                    </Link>
                        
                    {/* menu */}
                    <div className="flex items-center font-semibold gap-6">
                        {renderLinks(false)}
                    </div>
                </div>

            </div>


            {/* menu pour écran mobile */}
            {open && (
                <>
                <div className="md:hidden fixed top-0 left-0 right-0 w-screen bg-masabrown z-50">
                    {/* logo/bouton retour */}
                    <div className="flex justify-between items-center">
                        <Link to="/" onClick={() => setOpen(false)}>
                            <img src={logoMasa} alt="Logo" className="flex h-14 " />
                        </Link>
                        <button className="flex text-masabeige hover:text-masabeige/70 text-xl font-semibold pr-4"
                                onClick={() => setOpen(false)}
                                aria-label="Menu"
                        >
                            ✕
                        </button>
                    </div>

                    {/* menu */}
                    <div className="flex flex-col items-center pb-6 space-y-4"> {renderLinks(true)} </div>
                </div>
                
                <div 
                        className="md:hidden fixed inset-0 bg-masabrown/50 backdrop-blur-[3px] z-40"
                        onClick={() => setOpen(false)}
                    />
                </>
            )}

        </nav>
    )
}