import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useSpin from "../hooks/useSpin"

const OlvidePassword = () => {
    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const {setSpinning} = useSpin()

    const handleSubmit = async e => {
        e.preventDefault()
        if(email === '' || email.length < 6) {
            setAlerta({
                error: true,
                msg: 'Rellena todos los campos'
            })
            return
        }
        setSpinning(true)
        try {
            const url = `/usuarios/olvide-password`
            const {data} = await clienteAxios.post(url, {email})
            setAlerta({
                error: false,
                msg: data.msg
            })

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
            <h1 className="text-sky-600 text-4xl md:text-6xl font-black mb-6 capitalize">Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos</span></h1>
            {msg && <Alerta alerta={alerta} />}
            <form className="bg-white my-10 p-10 shadow rounded-lg" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="email" className="block text-gray-600 font-bold uppercase text-xl">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="bg-gray-50 w-full mt-3 p-3 rounded-xl border border-gray-200" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <input type="submit" value="Enviar Instrucciones" className="bg-sky-700 text-white w-full mb-5 py-3 uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
            </form>
            <nav className="xl:flex xl:justify-between">
                <Link to='/registrar' className="block text-center xl:text-start my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">¿No tienes una cuenta? Regístrate</Link>
                <Link to='/' className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
        </>
    )
}

export default OlvidePassword