import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen gap-2">
            <Navbar />
            <main className="flex-1 md:pt-20 pt-14">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}