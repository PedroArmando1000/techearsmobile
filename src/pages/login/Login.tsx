import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import './Login.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';

const Login: React.FC = () => {
  const history = useHistory() 
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function aoClicarNoBotaoDeAcessar() {
    console.log(email)
    if (!email) {
      window.alert('E-mail não preenchido')
      return
    }

    if (!senha) {
      window.alert('Senha não preenchida')
      return
    }

    const solicitacaoDeLoginCompleta = {
      acesso: email,
      psswd: senha,
    }
    //LOGICA DE CHAMAR O BACKEND
    try {
      const respostaLogin = await axios.post(
        'http://192.168.1.8:1880/api/usuarios/login',
        solicitacaoDeLoginCompleta
      )

      window.alert('LOGIN BEM SUCEDIDO!') 
      const dadosUsuarioLogado = respostaLogin.data
      localStorage.setItem('id', dadosUsuarioLogado.id)
      localStorage.setItem('email', dadosUsuarioLogado.email)
      localStorage.setItem('nome', dadosUsuarioLogado.nome)
      history.push('/home')
    } catch (error) {
      window.alert('CREDENCIAIS INVÁLIDAS')
    }
  }

  function aoDigitarNoCampoDeEmail(event) {
    setEmail(event.detail.value)
  }
  function aoDigitarNoCampoDeSenha(event) { 
    setSenha(event.detail.value)
  }

  return (
    <IonPage>
      <IonHeader>
            <div className='titulo-login'>
              <span>Techears</span>
            </div>
      </IonHeader>
      
      <IonContent>

        <IonList className="conteudo-login">
          <IonItem>
            <IonInput value={email} onIonChange={aoDigitarNoCampoDeEmail} type="email" label="E-mail" placeholder="email@domínio.com"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={senha} onIonChange={aoDigitarNoCampoDeSenha} type="password" label="Senha" placeholder="**********"></IonInput>
          </IonItem>
          <IonButton onClick={aoClicarNoBotaoDeAcessar}>Acessar</IonButton>
        </IonList>
        
      </IonContent>
      

    </IonPage>
  );
};

export default Login;
