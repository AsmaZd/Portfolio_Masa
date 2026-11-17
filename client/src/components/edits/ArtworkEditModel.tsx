import React, { useEffect } from "react";
import type { Artwork } from "../../types/artwork";
import api from "../../api";

interface ArtworkEditModalProps{
    isOpen: boolean;
    currentArtwork: Artwork;
    onClose: () => void;
    onSave: (newArtworks: Artwork) => void;
}

export default function ArtworkEditModal({isOpen, currentArtwork, onClose, onSave}: ArtworkEditModalProps){

    const [artworkInput, setArtworkInput] = React.useState<Artwork>(currentArtwork || { _id:"", title: "", description: "", imageUrl: "" , category: "", brand: "", tags: [], isFeatured: false});
    // const [tagsInput, setTagsInput] = React.useState(currentArtwork.tags);
    const [loading, setLoading] = React.useState<boolean>(false);

    console.log(artworkInput)
    console.log(currentArtwork)

    useEffect(() => {
        console.log("yo")
        if(isOpen){
            setArtworkInput(currentArtwork)
        }
    }, [isOpen, currentArtwork])

    if(!isOpen){
        return null;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
    ) => {
        const target = e.target as HTMLInputElement;  
        const {name, type, value} = target; 
        
        const fieldValue = type === "checkbox" ? target.checked : value;
        setArtworkInput((prev) => ({...prev, [name]: fieldValue}))
    }

    const handleTagChange = (index: number, value: string) => {
        const updatedTags = [...artworkInput.tags]
        updatedTags[index] = value;
        setArtworkInput((prev) => ({...prev, tags: updatedTags}))
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();

        setLoading(true);
        try{
            const { _id, createdAt, updatedAt, __v, ...dataToSend } = artworkInput as any;
            // const dataToSend = artworkInput.map(({ _id, createdAt, updatedAt, __v, ...rest} : any) => rest);
            await api.patch(`/artworks/${artworkInput._id}`, dataToSend);
            onSave(artworkInput);
            onClose();
        } catch (err){
            console.error("erreur de sauvegarde: ", err.response?.data)
        } finally{
            setLoading(false);
        }
    }

    return(
        <div className="fixed inset-0 flex flex-col items-center justify-center mx-auto md:w-1/2 bg-masabrown/50 gap-2 z-50"> 
            <h1 className="text-masabeige font-bold"> Modifier le contenu: </h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] xs:w-2/3 rounded-lg text-masabrown p-2 gap-2 bg-masabeige 
                                md:w-1/2 md:p-4 d:gap-4">

                {/* {artworkInput.map((artwork, index) => ( */}
                    <div className="flex flex-col items-center w-full border-white pb-2 border-b-2 gap-2">
                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="title" className="font-bold">Titre </label>
                            <input id="title" 
                                    name="title"
                                    value={artworkInput.title || ""}
                                    onChange={handleChange}
                                    className="w-full text-sm border-2 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="description" className="font-bold">Description </label>
                            <input id="description" 
                                    name="description"
                                    value={artworkInput.description || ""}
                                    onChange={handleChange}
                                    className="w-full text-sm border-2 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="imageUrl" className="font-bold">Url image </label>
                            <input id="imageUrl" 
                                    name="imageUrl"
                                    value={artworkInput.imageUrl || ""}
                                    onChange={handleChange}
                                    className="w-full text-sm border-2 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="brand" className="font-bold">Marque </label>
                            <input id="brand" 
                                    name="brand"
                                    value={artworkInput.brand || ""}
                                    onChange={handleChange}
                                    className="w-full text-sm border-2 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                            </input>
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <label htmlFor="tag" className="font-bold">Tags </label>

                            <div className="flex flex-row overflow-x-auto no-scrollbar p-1 gap-2">
                            {artworkInput.tags.map((tag, index) => (
                                <div key={index}>
                                    <input id="tag" 
                                            name="tag"
                                            value={tag || ""}
                                            size={Math.max(tag ? tag.length : 1, 4)}
                                            onChange={(e) => handleTagChange(index, e.target.value)}
                                            className="text-center text-sm border-2 border-masabrown/20 bg-masabrown/15 focus:outline-2 focus:outline-masabrown p-1">
                                    </input>
                                </div>
                            ))}
                            </div>
                            
                        </div>

                        <div className="w-4/5 xs:w-3/5">
                            <input id="isFeatured" 
                                    name="isFeatured"
                                    type="checkbox"
                                    checked={!!artworkInput.isFeatured}
                                    onChange={handleChange}
                                    className="accent-masabrown p-1">
                            </input>
                            <label htmlFor="isFeatured" className="font-bold"> Featured ?</label>
                        </div>

                        
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