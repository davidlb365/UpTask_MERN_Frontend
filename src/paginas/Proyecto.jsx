import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import Tarea from "../components/Tarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Alerta from "../components/Alerta"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import useAdmin from "../hooks/useAdmin"
import io from 'socket.io-client'
import Spinner from "../components/Spinner"
import useSpin from "../hooks/useSpin"
let socket

const Proyecto = () => {
    const params = useParams()
    const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea, agregarColaboradorProyecto, eliminarColaboradorProyecto} = useProyectos()
    const admin = useAdmin()
    const {spinning} = useSpin()
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', params.id)
    }, [])
    useEffect(() => {
        if(!proyecto.nombre || spinning) return
        socket.on('tarea agregada', tareaNueva => {
            submitTareasProyecto(tareaNueva)
        })
        socket.on('tarea eliminada', tareaEliminada => {
            eliminarTareaProyecto(tareaEliminada)
        })
        socket.on('tarea actualizada', tareaActualizada => {
            actualizarTareaProyecto(tareaActualizada)
        })
        socket.on('nuevo estado', nuevoEstadoTarea => {
            cambiarEstadoTarea(nuevoEstadoTarea)
        })
        socket.on('colaborador agregado', colaboradorAgregado => {
            agregarColaboradorProyecto(colaboradorAgregado)
        })
        socket.on('colaborador eliminado', colaboradorEliminado => {
            eliminarColaboradorProyecto(colaboradorEliminado)
        })
    })
    const {nombre} = proyecto
    const {msg, error} = alerta
    if(spinning) return <Spinner />
    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-4xl font-black">{nombre}</h1>
                {admin && 
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <Link to={`/proyectos/editar/${params.id}`} className="uppercase font-bold">Editar</Link>
                    </div>
                }
            </div>    
            {admin &&
                <button type="button" className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 hover:bg-sky-500 transition-colors flex justify-center items-center gap-1" onClick={handleModalTarea}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                    Nueva tarea</button>
            }
            <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>
            <div className="bg-white shadow mt-10 rounded-lg">
                {proyecto.tareas?.length ? 
                    proyecto.tareas?.map(tarea => (
                        <Tarea key={tarea._id} tarea={tarea} />
                    )) : 
                    <p className="text-center my-5 p-10">No hay tareas en este proyecto</p> }
            </div>
            {admin && (
                <>
                    <div className="flex items-center justify-between mt-10">
                        <p className="font-bold text-xl">Colaboradores del Proyecto</p>
                        <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className="text-gray-400 uppercase font-bold hover:text-black">Añadir</Link>
                    </div>
                    <div className="bg-white shadow mt-10 rounded-lg">
                        {proyecto.colaboradores?.length ? (
                            proyecto.colaboradores?.map(colaborador => (
                                <Colaborador key={colaborador._id} colaborador={colaborador} />
                            ))) :
                        <p className="text-center my-5 p-10">No hay Colaboradores en este proyecto</p>
                        }
                    </div>
                </>
            )}
            <ModalFormularioTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
        </>
    )
}

export default Proyecto