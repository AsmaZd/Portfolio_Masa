import React, { useEffect } from "react";
import type { Homepage } from "../../types/homepage";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

interface HeroEditModalProps{
    isOpen: boolean,
    currentHomepage: Homepage
    onClose: () => void,
    onSave: (newHero: Homepage) => void
}

export default function HeroEditModal({isOpen, currentHomepage, onClose, onSave}: HeroEditModalProps){

    const [homepageInput, setHomepageInput] = React.useState(currentHomepage);
    const [loading, setLoading] = React.useState<boolean>(false);

    // const { user } = useAuth();

    useEffect(() => {
        if (isOpen) {
            setHomepageInput(currentHomepage);
        }
    }, [isOpen, currentHomepage])

    if(!isOpen){
        return null;
    }


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setHomepageInput((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        setLoading(true);
        try{
            const { _id, createdAt, updatedAt, __v, featuredArtwork, socials, ...dataToSend } = homepageInput as any;
            await api.put('/homepage', dataToSend, {
                // headers: {
                //     Authorization: `Bearer ${user}`
                // }
            })
            onSave(homepageInput);
            onClose()
        } catch (err) {
            console.error("erreur de sauvegarde: ", err.response?.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center mx-auto md:w-1/2 bg-masabrown/50 gap-2 z-50"> 
            <h1 className="text-masabeige font-bold"> Modifier le contenu: </h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] xs:w-2/3 rounded-lg text-masabrown p-2 gap-2 bg-masabeige 
                                md:w-1/2 md:p-4 d:gap-4">

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="heroTitle" className="font-bold">Titre </label>
                    <input id="heroTitle" 
                            name="heroTitle"
                            value={homepageInput.heroTitle || ""}
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1"></input>
                </div>

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="heroSubtitle" className="font-bold"> Contenu </label>
                    <input id="heroSubtitle"
                            name="heroSubtitle"
                            value={homepageInput.heroSubtitle || ""}
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                    </input>
                </div>

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="heroImage" className="font-bold"> Image url </label>
                    <input id="heroImage"
                            name="heroImage"
                            value={homepageInput.heroImage || ""}
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                    </input>
                </div>

                <div className="flex flex-row gap-4">
                    <button type="submit" 
                            disabled={loading} 
                            className="bg-masabrown rounded-sm px-4 py-1 text-masabeige hover:bg-masabrown/50">
                        Envoyer
                    </button>
                    <button type ="button"
                            onClick={onClose}
                            className="bg-masabrown rounded-sm px-4 py-1 text-masabeige hover:bg-masabrown/50">
                        Annuler 
                    </button>
                </div>

            </form>


        </div>
    )

}