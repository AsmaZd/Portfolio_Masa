import React, { useEffect } from "react";
import type { About } from "../../../types/about";
import api from "../../../api";
import { useAuth } from "../../../context/AuthContext";

interface AboutEditModalProps{
    isOpen: boolean,
    currentAbout: About
    onClose: () => void,
    onSave: (newAbout: About) => void
}

export default function AboutEditModal({isOpen, currentAbout, onClose, onSave}: AboutEditModalProps){

    const [aboutInput, setAboutInput] = React.useState(currentAbout);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { user } = useAuth();

    const prevIsOpen = React.useRef(false);

    useEffect(() => {
        if (isOpen && !prevIsOpen.current) {
            setAboutInput(currentAbout);
        }
        // prevIsOpen.current = isOpen;
    }, [isOpen])

    if(!isOpen){
        return null;
    }


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setAboutInput((prev) => ({...prev, [name]: value}))
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        setLoading(true);
        try{
            console.log("yo")
            const { _id, journey, cvUrl, createdAt, updatedAt, __v,  ...dataToSend } = aboutInput as any;
            await api.put('/about', dataToSend, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            })
            onSave(aboutInput);
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
                    <label htmlFor="photo" className="font-bold">Image URL </label>
                    <input id="photo" 
                            name="photo"
                            value={aboutInput?.photo || ""}
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1"></input>
                </div>

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="bio" className="font-bold"> Bio </label>
                    <input id="bio"
                            name="bio"
                            value={aboutInput?.bio || ""}
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