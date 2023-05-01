
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
    const {auth} = useAuth()
    return (
        <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
            <p className='text-xl font-bold'>Hola: {auth.nombre}</p>
            <Link to='crear-proyecto' className='bg-sky-600 text-white mt-5 p-3 font-bold w-full text-center block uppercase rounded-lg hover:bg-sky-700 transition-colors'>Nuevo proyecto</Link>
        </aside>
    )
}

export default Sidebar