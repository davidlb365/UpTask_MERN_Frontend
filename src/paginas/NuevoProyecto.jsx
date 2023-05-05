import { useState } from "react"
import Alerta from "../components/Alerta"
import FormularioProyecto from "../components/FormularioProyecto"
import useSpin from "../hooks/useSpin"
import Spinner from "../components/Spinner"


const NuevoProyecto = () => {
    const {spinning} = useSpin()
    if(spinning) return <Spinner />
    return (
        <>
            <h1 className="text-4xl font-black">Crear Proyecto</h1>
            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>
        </>
    )
}

export default NuevoProyecto