import React from "react";
import api from "../api";

const EMPTY_FORM = {
    name: "",
    email: "",
    content: ""
}

export default function Contact() {

    const [form, setForm] = React.useState(EMPTY_FORM);
    const [sending, setSending] = React.useState(false);
    const [feedback, setFeedback] = React.useState<"success" | "error" | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    }


    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setSending(true);
        setFeedback(null);
        try{
            await api.post("/messages", form);
            setFeedback("success");
            setForm(EMPTY_FORM);
         } catch {
            setFeedback("error");
         } finally {
            setSending(false);
         }
    };

    return (
        <div className="flex flex-col items-center gap-4 md:pt-20 py-14 px-2">
            <p className="text-masabrown font-extrabold mt-10">Me contacter</p>

            
            <form onSubmit={handleSubmit} 
                    className="flex flex-col items-center w-[90%] xs:w-2/3 rounded-lg text-masabrown p-2 gap-2 bg-masabeige/50
                                md:w-1/2 md:p-4 d:gap-4">
                                    
                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="name" className="">Nom </label>
                    <input id="name" 
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/10 bg-masabeige focus:outline-2 focus:outline-masabrown"></input>
                </div>

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="email">Email * </label>
                    <input id="email"
                            type="email"
                            name="email"
                            value={form.email} 
                            required
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/10 bg-masabeige focus:outline-2 focus:outline-masabrown">
                        
                    </input>
                </div>

                <div className="flex flex-col w-4/5 xs:w-3/5">
                    <label htmlFor="content">Contenu * </label>
                    <textarea id="content"
                            name="content"
                            value={form.content}
                            required
                            onChange={handleChange}
                            rows={5}
                            className="w-full text-sm border-1 border-masabrown/10 bg-masabeige focus:outline-2 focus:outline-masabrown">

                    </textarea>
                </div>

                <button type="submit" 
                        disabled={sending} 
                        className="bg-masabrown rounded-sm px-4 py-1 text-masabeige hover:bg-masabrown/50">
                    Envoyer
                </button>

            </form>


            {/* feedback */}
            <div className="text-masabrown text-xs">
                {feedback === "success" && (
                    <p>Message envoyé !</p>
                )}
                {feedback === "error" && (
                    <p>Le message ne s'est pas envoyé. Veuillez réessayer</p>
                )}
            </div>

        </div>
    )
}