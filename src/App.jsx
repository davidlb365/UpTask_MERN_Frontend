
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Login from './paginas/Login'
import NuevoPassword from './paginas/NuevoPassword'
import OlvidePassword from './paginas/OlvidePassword'
import Registrar from './paginas/Registrar'

import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layouts/RutaProtegida'
import Proyectos from './paginas/Proyectos'
import NuevoProyecto from './paginas/NuevoProyecto'
import { ProyectosProvider } from './context/ProyectosProvider'
import Proyecto from './paginas/Proyecto'
import EditarProyecto from './paginas/EditarProyecto'
import NuevoColaborador from './paginas/NuevoColaborador'
import { SpinProvider } from './context/SpinProvider'
import useSpin from './hooks/useSpin'

function App() {
    return (
        <BrowserRouter>
            <SpinProvider>
                <AuthProvider>
                    <ProyectosProvider>
                        <Routes>
                            <Route path='/' element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path='registrar' element={<Registrar />} />
                                <Route path='olvide-password' element={<OlvidePassword />} />
                                <Route path='olvide-password/:token' element={<NuevoPassword />} />
                                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
                            </Route>
                            <Route path='/proyectos' element={<RutaProtegida />}>
                                <Route index element={<Proyectos />} />
                                <Route path='crear-proyecto' element={<NuevoProyecto />} />
                                <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
                                <Route path=':id' element={<Proyecto />} />
                                <Route path='editar/:id' element={<EditarProyecto />} />
                            </Route>
                        </Routes>
                    </ProyectosProvider>
                </AuthProvider>
            </SpinProvider>
        </BrowserRouter>
    )
}

export default App
