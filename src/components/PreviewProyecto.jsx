import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {
    const {auth} = useAuth()
    const {nombre, _id, cliente, creador} = proyecto
    return (
        <div className="border-b p-5 flex flex-col md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
                <p>{nombre}<span className="text-sm text-gray-500 uppercase">{''} {cliente}</span></p>
                {auth._id !== creador && <p className="bg-green-500 text-white text-xs font-bold p-1 uppercase rounded-lg">Colaborador</p>}
            </div>
            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto