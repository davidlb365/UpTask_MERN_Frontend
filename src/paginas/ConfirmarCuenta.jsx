import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useSpin from "../hooks/useSpin"

const ConfirmarCuenta = () => {
    const [alerta, setAlerta] = useState({})
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const params = useParams()
    const {setSpinning} = useSpin()
    useEffect(() => {
        const confirmarCuenta = async () => {
            setSpinning(true)
            try {
                const url = `/usuarios/confirmar/${params.id}`
                const {data} = await clienteAxios(url)
                setAlerta({
                    error: false,
                    msg: data.msg
                })
                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    error: true,
                    msg: error.response.data.msg
                })
            } finally {
                setSpinning(false)
            }
        }
        confirmarCuenta()
    }, [])
    const {msg} = alerta
    return (
        <>
            <h1 className="text-sky-600 text-4xl md:text-6xl font-black mb-6 capitalize">Confirma tu cuenta y Comienza a crear tus <span className="text-slate-700">proyectos</span></h1>
            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
                {msg && <Alerta alerta={alerta} />}
                {cuentaConfirmada && <Link to='/' className="block text-center my-5 text-slate-500 hover:text-slate-600 text-sm uppercase">Inicia Sesión</Link>}
            </div>
        </>
    )
}

export default ConfirmarCuenta