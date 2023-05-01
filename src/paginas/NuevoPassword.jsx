import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {
    const {token} = useParams()
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordModificado, setPasswordModificado] = useState(false)
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    error: true,
                    msg: error.response.data.msg
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        if(password === '') {
            setAlerta({
                error: true,
                msg: 'Rellena todos los campos'
            })
            return
        }
        if(password.length < 6) {
            setAlerta({
                error: true,
                msg: 'El Password debe ser mínimo de 6 caracteres'
            })
            return
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
            setAlerta({
                error: false,
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        }
    }

    const {msg, error} = alerta
    return (
        <>
            <h1 className="text-sky-600 text-4xl md:text-6xl font-black mb-6 capitalize">Reestablece tu password y no pierdas acceso a tus <span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <form className="bg-white my-10 p-10 shadow rounded-lg" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="password" className="block text-gray-600 font-bold uppercase text-xl">Nuevo Password</label>
                        <input type="password" id="password" placeholder="Escribe tu Nuevo Password" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Guardar nuevo password" className="bg-sky-700 text-white w-full mb-5 py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
                </form>
            )}
            {passwordModificado && <Link to='/' className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">Inicia Sesión</Link>}
        </>
    )
}

export default NuevoPassword