import { useEffect, useState } from "react"
import { useHistory } from "react-router"

const BotaoSair: React.FC = () => {
    const history = useHistory()
    const [estaLogado, setEstaLogado] = useState<any>(localStorage.getItem('email'))

    function voltaAoLogin() {
        localStorage.clear()
        history.push('/login') 
    } 

    function voltaAoInicio() {
        history.push('/home') 
    } 

    useEffect(() => {
        const intervalo = setInterval(() => {
           
            if (localStorage.getItem('email')) {
                setEstaLogado(true) 
            } else {
                history.push('/login')
                setEstaLogado(false)
            }
         
        }, 150);
       
        return () => {
            clearInterval(intervalo)
        }
    }, [])

    return <>
        {estaLogado ? (

            <>
                <div  onClick={voltaAoInicio} className='botaoInicio'>
                    <span>Início</span>
                </div>
                
                <div  onClick={voltaAoLogin} className='botaoSair'>
                    <span>Sair</span>
                </div>

            </>
       
        ) : ''}
       
    </>
}

export default BotaoSair