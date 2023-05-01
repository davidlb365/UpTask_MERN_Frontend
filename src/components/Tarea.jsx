import { formatearFecha } from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const admin = useAdmin()
    const {nombre, descripcion, prioridad, fechaEntrega, estado, _id, completado} = tarea
    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()
    return (
        <div className="border-b p-5 flex flex-col sm:flex-row gap-5 lg:gap-0 sm:justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
                {estado && <p className="inline-block bg-green-600 text-white text-xs font-bold p-1 uppercase rounded-lg">Completada por: {completado.nombre}</p>}
            </div>
            <div className="flex flex-col lg:flex-row gap-2 min-w-[180px] sm:min-w-min">
                {admin && 
                    <button className="text-white px-4 py-3 text-sm uppercase font-bold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors" onClick={() => handleModalEditarTarea(tarea)}>Editar</button>
                }
                <button className={`text-white px-4 py-3 text-sm uppercase font-bold ${estado ? 'bg-sky-600 hover:bg-sky-700' : 'bg-gray-600 hover:bg-gray-700'} rounded-lg transition-colors`} onClick={() => completarTarea(_id)}>{estado ? 'Completa' : 'Incompleta'}</button> 
                {admin && 
                    <button className="text-white px-4 py-3 text-sm uppercase font-bold bg-red-600 rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleModalEliminarTarea(tarea)}>Eliminar</button>
                }
            </div>
        </div>
    )
}

export default Tarea