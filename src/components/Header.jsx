import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const {handleBuscador, cerrarSesionProyectos} = useProyectos()
    const {cerrarSesionAuth} = useAuth()
    
    const handleCerrarSesion = () => {
        cerrarSesionProyectos()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }

    return (
        <header className="bg-white px-4 py-5 border-b">
            <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
                <h2 className="text-sky-600 text-4xl font-black text-center mb-5 md:mb-0">UpTask</h2>
                <div className="flex gap-4 flex-col md:flex-row items-center">
                    <button type="button" className="font-bold uppercase" onClick={handleBuscador}>Buscar Proyecto</button>
                    <Link to='/proyectos' className="uppercase font-bold">Proyectos</Link>
                    <button type="button" className="bg-sky-600 text-sm font-bold text-white p-3 uppercase rounded-md hover:bg-sky-700 transition-colors" onClick={handleCerrarSesion}>Cerrar Sesión</button>
                    <Busqueda />
                </div>
            </div>
        </header>
    )
}

export default Header