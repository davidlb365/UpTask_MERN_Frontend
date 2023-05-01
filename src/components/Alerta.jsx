

const Alerta = ({alerta}) => {
    return (
        <div className={`text-center p-3 rounded-xl uppercase font-bold text-sm my-10 text-white ${alerta.error ? 'from-red-400 to-red-600'  : 'from-sky-500 to-sky-600'} bg-gradient-to-br`}>{alerta.msg}</div>
    )
}

export default Alerta