import { useEffect, useState } from "react"
import Alerta from "./Alerta"
import useProyectos from "../hooks/useProyectos"

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const {alerta, mostrarAlerta, submitColaborador} = useProyectos()

    const handleSubmit = async e => {
        e.preventDefault()
        if(email === '') {
            mostrarAlerta({
                error: true,
                msg: 'Todos los Campos son Obligatorios'
            })
            return
        }
        await submitColaborador(email)
    }
    const {msg} = alerta
    return (
        <form className="bg-white py-10 px-5 rounded-lg w-full md:w-1/2 shadow" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 font-bold uppercase text-sm">Email colaborador</label>
                <input type="email" id="email" placeholder="Email del Usuario" className="w-full mt-2 p-2 rounded-md border-2 placeholder-gray-400" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <input type="submit" value='Buscar colaborador' className="bg-sky-600 text-white w-full py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-700 transition-colors" />
        </form>
    )
}

export default FormularioColaborador