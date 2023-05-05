import { Outlet } from "react-router-dom"
import Spinner from "../components/Spinner"
import useSpin from "../hooks/useSpin"

const AuthLayout = () => {
    const {spinning} = useSpin()
    return (
        <>
            <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
                <div className="md:w-2/3 lg:w-2/5">
                    <Outlet />
                </div>
            </main> 
            {spinning && <Spinner />}
        </>
    )
}

export default AuthLayout