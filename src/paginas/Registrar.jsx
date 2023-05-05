import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useSpin from "../hooks/useSpin"

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setSpinning} = useSpin()

    const handleSubmit = async e => {
        e.preventDefault()
        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                error: true,
                msg: 'Todos los campos son obligatorios'
            })
            return
        }
        if(password !== repetirPassword) {
            setAlerta({
                error: true,
                msg: 'Los password no son iguales'
            })
            return
        }
        if(password.length < 6) {
            setAlerta({
                error: true,
                msg: 'El Password es muy corto, agrega mínimo 6 caracteres.'
            })
            return
        }
        setAlerta({})
        setSpinning(true)
        // Crear el usuario en la API
        try {
            const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
            setAlerta({
                error: false,
                msg: data.msg
            })
            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        } finally {
            setSpinning(false)
        }
    }

    const {msg} = alerta
    return (
        <>
            <h1 className="text-sky-600 text-4xl md:text-6xl font-black mb-6 capitalize">Crea tu cuenta y administra tus <span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="bg-white my-10 p-10 shadow rounded-lg" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="nombre" className="block text-gray-600 font-bold uppercase text-xl">Nombre</label>
                    <input type="text" id="nombre" placeholder="Tu Nombre" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className="my-5">
                    <label htmlFor="email" className="block text-gray-600 font-bold uppercase text-xl">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="block text-gray-600 font-bold uppercase text-xl">Password</label>
                    <input type="password" id="password" placeholder="Password de Registro" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="my-5">
                    <label htmlFor="password2" className="block text-gray-600 font-bold uppercase text-xl">Repetir Password</label>
                    <input type="password" id="password2" placeholder="Repetir tu Password" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)} />
                </div>
                <input type="submit" value="Crear Cuenta" className="bg-sky-700 text-white w-full mb-5 py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="xl:flex xl:justify-between">
                <Link to='/' className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link to='/olvide-password'  className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">Olvidé mi password</Link>
            </nav>
        </>
    )
}

export default Registrar