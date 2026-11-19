import React, { useEffect } from "react";
import type { About } from "../../../types/about";
import api from "../../../api";
import { useAuth } from "../../../context/AuthContext";

interface JourneyItems{
    title: string,
    description: string
}

interface JourneyEditModalProps{
    isOpen: boolean,
    currentJourney: JourneyItems[],
    onClose: () => void,
    onSave: (newJourney: Array<{title: string, description: string}>) => void
}

export default function JourneyEditModal({isOpen, currentJourney, onClose, onSave}: JourneyEditModalProps){

    const [journeyInput, setJourneyInput] = React.useState<JourneyItems[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const { user } = useAuth();

    const prevIsOpen = React.useRef(false);

    useEffect(() => {
        if (isOpen) {
            setJourneyInput(currentJourney);
        }
        // prevIsOpen.current = isOpen;
    }, [isOpen])

    if(!isOpen){
        return null;
    }


    const handleChange = (index: number, field: string, value: string) => {
        const updatedJourney = [...journeyInput];
        updatedJourney[index] = {
            ...updatedJourney[index],
            [field]: value
        }
        setJourneyInput(updatedJourney);
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement> ){
        e.preventDefault();

        setLoading(true);
        try{
            const dataToSend = journeyInput.map(({ _id,  ...rest} : any) => rest);
            await api.put('/about', { journey: dataToSend }, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            })
            onSave(journeyInput);
            onClose()
        } catch (err: any) {
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

                {journeyInput.map((journey, index) => (
                    <div key={index} className="flex flex-col items-center w-full border-white pb-2 border-b-2">
                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="title" className="font-bold">Titre </label>
                            <input id="title" 
                                    name="title"
                                    value={journey.title || ""}
                                    onChange={(e) => handleChange(index, "title", e.target.value)}
                                    className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="description" className="font-bold">Description </label>
                            <input id="description" 
                                    name="description"
                                    value={journey.description || ""}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    className="w-full text-sm border-1 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>
                    </div>
                ) )

                }

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