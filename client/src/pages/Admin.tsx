import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Admin(){
    const {user, logout, checkingAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!checkingAuth && !user){
            navigate('/')
        }
    }, [user, checkingAuth, navigate]);

    if (checkingAuth) {
        return <p className="text-center mt-10">Chargement de l'espace admin...</p>;
    }

    if (!user){
        return null;
    }
    
    return (
        <div className="md:pt-20 py-14 px-2">
            admin
            <button
                onClick={async () => {
                    await logout();
                    navigate('/admin/login');
                }}
                className="bg-masabrown hover:bg-masabrown/50 text-white px-4 py-2 rounded text-sm"
                >
                Se déconnecter
                </button>
        </div>
    )
}