import { useEffect } from "react"
import Alerta from "../components/Alerta"
import PreviewProyecto from "../components/PreviewProyecto"
import Sidebar from "../components/Sidebar"
import useProyectos from "../hooks/useProyectos"

const Proyectos = () => {
    const {proyectos, alerta} = useProyectos()
    const {msg} = alerta
    return (
        <>
            <h1 className="text-4xl font-black">Proyectos</h1>
            {msg && <Alerta alerta={alerta} />}
            <div className=" bg-white mt-10 rounded shadow">
                {proyectos.length ? 
                    proyectos.map(proyecto => (
                        <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
                    ))
                : <p className="text-center text-gray-600 uppercase p-4">No hay Proyectos aún</p>}
            </div>
        </>
    )
}

export default Proyectos