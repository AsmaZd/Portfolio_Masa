import React from "react"
import type { About } from "../types/about";
import api from "../api";
import masa from '../assets/logos/logo.svg'



export default function About(){

    const [about, setAbout] = React.useState<About | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        api.get('/about')
            .then((res) => setAbout(res.data))
            .catch(() => setError('Impossible de charger homepage'))
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
                    <div className="flex flex-col items-center mx-5 rounded-xl bg-masabeige gap-2 md:flex-row md:mx-20 md:gap-6">
                        <img src={masa} alt="image" className="flex h-auto md:w-1/3"></img>
                        <div className="text-masabrown p-4 text-justify">
                            {about.bio}
                        </div>
                    </div>

                    {/* journey */}
                    <div className="flex flex-col mx-3 text-masabrown bg-masabeige/40 md:mx-10">
                        <h1 className="font-bold text-xl"> Compétences </h1>
                        {about.journey.map((elem) => (
                            <div key={elem._id} className="flex flex-col border-b-2 border-white py-4 px-2">
                                <h1 className="font-bold">{elem.title}</h1>
                                <p className="text-justify">{elem.description}</p>
                            </div>
                        ))}
                    </div>

                </div>

            ) : null}
        </div>
    )
}