import useProyectos from "../hooks/useProyectos"


const Colaborador = ({colaborador}) => {
    const {nombre, email, estado} = colaborador
    const {handleModalEliminarColaborador} = useProyectos()
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1">{nombre}</p>
                <p className="mb-1 text-sm text-gray-700">{email}</p>
            </div>
            <div className="flex gap-2">
                <button type="button" className="text-white px-4 py-3 text-sm uppercase font-bold bg-red-600 rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleModalEliminarColaborador(colaborador)}>Eliminar</button>
            </div>
        </div>
    )
}

export default Colaborador