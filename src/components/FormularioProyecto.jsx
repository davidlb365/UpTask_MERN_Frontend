import React, { useEffect, useState } from 'react'
import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'

const FormularioProyecto = () => {
    const {mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos()
    const params = useParams()

    const [nombre, setNombre] = useState(params.id ? proyecto.nombre : '')
    const [descripcion, setDescripcion] = useState(params.id ? proyecto.descripcion : '')
    const [fechaEntrega, setFechaEntrega] = useState(params.id ? proyecto.fechaEntrega?.slice(0, 10) : '')
    const [cliente, setCliente] = useState(params.id ? proyecto.cliente : '')

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                error: true,
                msg: 'Todos los Campos son Obligatorios'
            })
            return
        }
        // Pasar los datos hacia el provider
        await submitProyecto({id: params.id, nombre, descripcion, fechaEntrega, cliente})
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }
    const {msg} = alerta
    return (
        <form className="bg-white py-10 px-5 rounded-lg md:w-1/2" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label htmlFor="nombre" className="block text-gray-700 font-bold uppercase text-sm">Nombre Proyecto</label>
                <input type="text" id="nombre" placeholder="Nombre del Proyecto" className="w-full mt-2 p-2 rounded-md border placeholder-gray-400 shadow" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className="mb-5">
                <label htmlFor="descripcion" className="block text-gray-700 font-bold uppercase text-sm">Descripcion</label>
                <textarea id="descripcion" placeholder="Descripción del Proyecto" className="w-full mt-2 p-2 rounded-md border placeholder-gray-400 shadow" value={descripcion} onChange={e => setDescripcion(e.target.value)}>
                    
                </textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="fecha" className="block text-gray-700 font-bold uppercase text-sm">Fecha Entrega</label>
                <input type="date" id="fecha" className="w-full mt-2 p-2 rounded-md border placeholder-gray-400 shadow" value={fechaEntrega} onChange={e => setFechaEntrega(e.target.value)} />
            </div>
            <div className="mb-5">
                <label htmlFor="cliente" className="block text-gray-700 font-bold uppercase text-sm">Nombre Cliente</label>
                <input type="text" id="cliente" placeholder="Nombre del Cliente" className="w-full mt-2 p-2 rounded-md border placeholder-gray-400 shadow" value={cliente} onChange={e => setCliente(e.target.value)} />
            </div>
            <input type="submit" value={`${params.id ? 'Actualizar Proyecto' : 'Crear Proyecto'}`} className="bg-sky-600 text-white w-full py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-700 transition-colors" />
        </form>
)
}

export default FormularioProyecto