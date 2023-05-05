import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Spinner from "../components/Spinner"
import useSpin from "../hooks/useSpin"

const RutaProtegida = () => {
    const {auth, cargando} = useAuth()
    const {spinning} = useSpin()
    if(cargando) return
    return (
        <>
            {auth._id ? (
                <>
                    <div className="bg-gray-100">
                    {!spinning && <Header />}
                        <div className="md:flex md:min-h-screen">
                            {!spinning && <Sidebar />}
                            <main className="flex-1 p-10">
                                <Outlet />
                            </main>
                        </div>
                    </div>
                </>
            ) : <Navigate to='/' />}
        </>
    )
}

export default RutaProtegida