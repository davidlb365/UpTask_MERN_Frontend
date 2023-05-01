import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setAuth, cargando} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if([email, password].includes('')) {
            setAlerta({
                error: true,
                msg: "Todos los campos son obligatorios"
            })
            return
        }
        try {
            const {data} = await clienteAxios.post(`/usuarios/login`, {email, password})
            localStorage.setItem('token', data.token)
            setAlerta({})
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        }
    }
    const {msg} = alerta
    if(cargando) return
    return (
        <>
            <h1 className="text-sky-600 text-4xl md:text-6xl font-black mb-6 capitalize">Inicia sesión y administra tus <span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="bg-white my-10 p-10 shadow rounded-lg" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="email" className="block text-gray-600 font-bold uppercase text-xl">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="block text-gray-600 font-bold uppercase text-xl">Password</label>
                    <input type="password" id="password" placeholder="Password de Registro" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Iniciar Sesión" className="bg-sky-700 text-white w-full mb-5 py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="xl:flex xl:justify-between">
                <Link to='registrar' className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
                <Link to='olvide-password'  className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">Olvide mi password</Link>
            </nav>
        </>
    )
}

export default Login