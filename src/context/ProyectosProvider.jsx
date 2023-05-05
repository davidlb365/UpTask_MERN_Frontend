import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import io from 'socket.io-client'
import useAuth from "../hooks/useAuth"
import useSpin from "../hooks/useSpin"
let socket

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState('')
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)

    const {auth} = useAuth()
    const {setSpinning} = useSpin()

    useEffect(() => {
        const obtenerProyectos = async () => {
            setSpinning(true)
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.get('/proyectos', config)
                setProyectos(data)
            } catch (error) {
                console.log(error)
            } finally {
                setSpinning(false)
            }
        }
        obtenerProyectos()
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    const navigate = useNavigate()

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async p => {        
        if(p.id) await editarProyecto(p)
        else await nuevoProyecto(p)
    }

    const editarProyecto = async p => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/proyectos/${p.id}`, p, config)
            setAlerta({
                error: false,
                msg: 'Proyecto Actualizado Correctamente'
            })
            const proyectosActualizados = proyectos.map(py => py._id === data.id ? data : py)
            setProyectos(proyectosActualizados)
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }
    const nuevoProyecto = async p => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos', p, config)
            setAlerta({
                error: false,
                msg: 'Proyecto Creado Correctamente'
            })
            setProyectos([...proyectos, data])
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    const obtenerProyecto = async id => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setSpinning(false)
        }
    }

    const eliminarProyecto = async id => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)
            setAlerta({
                error: false,
                msg: data.msg
            })
            const proyectosActualizados = proyectos.filter(py => py._id !== id)
            setProyectos(proyectosActualizados)
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
                console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async tarea => {
        if(tarea?.id) await editarTarea(tarea)
        else await crearTarea(tarea)
    }

    const crearTarea = async tarea => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/tareas', tarea, config)
            setAlerta({
                error: false,
                msg: 'Tarea Creada Correctamente'
            })
            setTimeout(() => {
                setAlerta({})
                setModalFormularioTarea(false)
            }, 1500);
            // Socket IO
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    const editarTarea = async tarea => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
            setAlerta({
                error: false,
                msg: 'Tarea Editada Correctamente'
            })
            setTimeout(() => {
                setAlerta({})
                setModalFormularioTarea(false)
            }, 1500);
            // Socket
            socket.emit('actualizar tarea', data)
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                error: false,
                msg: data.msg
            })
            setModalEliminarTarea(false)
            // Socket
            socket.emit('eliminar tarea', tarea)
            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        } finally {
            setSpinning(false)
        }
    }

    const submitColaborador = async email => {
        setSpinning(true)
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos/colaboradores', {email}, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        } finally {
            setCargando(false)
            setSpinning(false)
        }
    }

    const agregarColaborador = async email => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({
                error: false,
                msg: data.msg
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        } finally {
            setSpinning(false)
        }
    }

    const handleModalEliminarColaborador = colaborador => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }

    const eliminarColaborador = async () => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            setAlerta({
                error: false,
                msg: data.msg
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(c => c._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            setModalEliminarColaborador(false)
        } catch (error) {
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        } finally {
            setSpinning(false)
        }
    }

    const completarTarea = async id => {
        setSpinning(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            setTarea({})
            setAlerta({})
            // Socket
            socket.emit('cambiar estado', data)
        } catch (error) {
            console.log(error.response)
        } finally {
            setSpinning(false)
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    // Socket io
    const submitTareasProyecto = tareaNueva => {
         // Agrega la tarea al state
         const proyectoActualizado = {...proyecto}
         proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]
         setProyecto(proyectoActualizado)
    }

    const eliminarTareaProyecto = tarea => {
        const proyectoActualizado = {...proyecto}
        console.log(proyecto.tareas)
        proyectoActualizado.tareas = proyecto.tareas.filter(t => t._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const actualizarTareaProyecto = tarea => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyecto.tareas.map(t => {
            if(t._id === tarea._id) return tarea
            return t
        })
        setProyecto(proyectoActualizado)
    }

    const cambiarEstadoTarea = tarea => {
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyecto.tareas.map(t => {
            if(t._id === tarea._id) return tarea
            return t
        })
        setProyecto(proyectoActualizado)
    }

    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta('')
    }

    return (
        <ProyectosContext.Provider 
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                cambiarEstadoTarea,
                cerrarSesionProyectos
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
 

export {
    ProyectosProvider
}

export default ProyectosContext