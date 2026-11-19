import React from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateSignin(){
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = React.useState({email: "", password: ""});
    const [error, setError] = React.useState<string | null>(null)
    const [sending, setSending] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        console.log("🚀 handleSubmit déclenché");  
        e.preventDefault();

        setError(null);
        setSending(true);
        try{
            await login(form.email, form.password)
            navigate('/admin')
            console.log("🚀 handleSubmit fini");  
         } catch {
            setError("identifiants invalides");
         } finally {
            setSending(false);
         }
    };

    return (
        <div className="flex flex-col items-center gap-4 md:pt-20 py-14 px-2">
            <p className="text-masabrown font-extrabold mt-10">Se connecter</p>

            
            <form onSubmit={handleSubmit} 
                    className="flex flex-col items-center w-[90%] xs:w-2/3 rounded-lg text-masabrown p-2 gap-2 bg-masabeige/50
                                md:w-1/2 md:p-4 d:gap-4">

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
                    <label htmlFor="password" className="">MDP *</label>
                    <input id="password" 
                            type="password"
                            name="password"
                            value={form.password}
                            required
                            onChange={handleChange}
                            className="w-full text-sm border-1 border-masabrown/10 bg-masabeige focus:outline-2 focus:outline-masabrown"></input>
                </div>

                <button type="submit" 
                        disabled={sending} 
                        className="bg-masabrown rounded-sm px-4 py-1 text-masabeige hover:bg-masabrown/50">
                    Envoyer
                </button>

            </form>


            {/* feedback */}
            <div>
                {error && (
                    <p>{error}</p>
                )}
            </div>
            {/* <div className="text-masabrown text-xs">
                {feedback === "success" && (
                    <p>Message envoyé !</p>
                )}
                {feedback === "error" && (
                    <p>Le message ne s'est pas envoyé. Veuillez réessayer</p>
                )}
            </div> */}

        </div>
    )
}