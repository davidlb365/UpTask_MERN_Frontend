import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import Spinner from "../components/Spinner"
import useSpin from "../hooks/useSpin"


const NuevoColaborador = () => {
    const {obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta} = useProyectos()
    const {spinning} = useSpin()
    const params = useParams()
    useEffect(() => {
        if(!proyecto?.nombre) obtenerProyecto(params.id)
    }, [])
    if(spinning) return <Spinner />
    return (
        <>
            <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>
            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
            {colaborador?._id && (
                <div className="bg-white mt-10 py-10 px-5 md:w-1/2 md:mx-auto rounded-lg shadow w-fulls">
                    <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>
                    <div className="flex justify-between items-center">
                        <p>{colaborador.nombre}</p>
                        <button
                                    type="button"
                                    className="uppercase bg-slate-500 hover:bg-slate-600 px-5 py-2 text-sm text-white rounded-lg font-bold transition-colors" onClick={() => agregarColaborador({email: colaborador.email})}>Agregar al proyecto</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default NuevoColaborador