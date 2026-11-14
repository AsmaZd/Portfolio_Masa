import React from "react"
import type { About } from "../types/about";
import api from "../api";
import masa from '../assets/logos/logo.svg'
// import { useAuth } from "../context/AuthContext";
import AboutEditModal from "../components/edits/about/AboutEditModel";
import { useAuth } from "../context/AuthContext";
import JourneyEditModal from "../components/edits/about/JourneyEditModel";



export default function About(){
    const {user} = useAuth();

    const [isAboutModalOpen , setIsAboutModalOpen] = React.useState<boolean>(false);
    const [isJourneyModalOpen, setIsJourneyModalOpen] = React.useState<boolean>(false);

    const [about, setAbout] = React.useState<About | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        api.get('/about')
            .then((res) => setAbout(res.data))
            .catch(() => setError('Impossible de charger about'))
            .finally(() => setLoading(false))
    })

    return (
        <div className="md:pt-20 pt-14 px-2">
            {loading ? ( 
                <p> loading </p> 
            ) : error ? ( 
                <p> error: {error} </p>
            ) : about ? (

                <div className="flex flex-col my-10 gap-6">

                    {/* presentation */}
                    <div>
                        <section>
                            <div className="flex flex-col items-center mx-5 rounded-xl bg-masabeige gap-2 md:flex-col md:mx-20 md:gap-6">
                                <div className="flex flex-col md:flex-row items-center">
                                    <img src={masa} alt="image" className="flex h-auto md:w-1/3"></img>
                                    <div className="text-masabrown p-4 text-justify">
                                        {about.bio}
                                    </div>
                                </div>

                                {user && (
                                <button onClick={() => {isAboutModalOpen ? setIsAboutModalOpen(false) : setIsAboutModalOpen(true)}}
                                        className="bg-masabrown/80 text-masabeige rounded-sm my-2 p-1 hover:bg-masabrown">
                                    {isAboutModalOpen ? "Modification en cours..." : "Modifier"}
                                </button>
                            )}
                            </div>


                        </section>

                        <AboutEditModal isOpen={isAboutModalOpen} 
                                        currentAbout={about} 
                                        onClose={() => setIsAboutModalOpen(false)}
                                        onSave={(updatedAbout: About) => {
                                            setAbout(updatedAbout)
                                }}>
                            
                        </AboutEditModal>
                    </div>

                    {/* journey */}
                    <div>
                        <section>
                            <div className="flex flex-col mx-3 text-masabrown bg-masabeige/40 md:mx-10">
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-xl"> Parcours </h1>
                                    {about.journey.map((elem) => (
                                        <div key={elem._id} className="flex flex-col border-b-2 border-white py-4 px-2">
                                            <h1 className="font-bold">{elem.title}</h1>
                                            <p className="text-justify">{elem.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {user && (
                                    <button onClick={() => {isJourneyModalOpen ? setIsJourneyModalOpen(false) : setIsJourneyModalOpen(true)}}
                                            className="bg-masabrown/80 text-masabeige mx-auto rounded-sm my-2 p-1 hover:bg-masabrown">
                                        {isJourneyModalOpen ? "Modification en cours..." : "Modifier"}
                                    </button>
                                )}
                            </div>
                        </section>

                        <JourneyEditModal isOpen={isJourneyModalOpen} 
                                        currentJourney={about.journey} 
                                        onClose={() => setIsJourneyModalOpen(false)}
                                        onSave={(newJourney) => {
                                            setAbout(prev => ({
                                                ...prev,
                                                journey: newJourney as any
                                            }))
                                        }}>
                            
                        </JourneyEditModal>
                    </div>

                </div>

            ) : null}
        </div>
    )
}