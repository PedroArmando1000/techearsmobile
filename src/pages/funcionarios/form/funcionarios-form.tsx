import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router'; 
import './funcionarios-form.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import { IonItem, IonLabel, IonList } from '@ionic/react';

const FuncionariosForm: React.FC = () => {  
  
  const { id } = useParams() 
  const [nome, setNome] = useState('')
  const [rg, setRg] = useState('')
  const [cpf, setCpf] = useState('')
  const [altura, setAltura] = useState(0)
  const [idade, setIdade] = useState(0)
  const [sexo, setSexo] = useState('')


  async function obterDadosDoFuncionario() {
    try {
      const response = await axios.get('http://192.168.1.8:1880/api/funcionario/' + id) 
      const funcionarioJaSalvo = response.data
      setNome(funcionarioJaSalvo.nome)
      setCpf(funcionarioJaSalvo.cpf)
      setRg(funcionarioJaSalvo.rg)
      setAltura(funcionarioJaSalvo.altura)
      setSexo(funcionarioJaSalvo.sexo)
      setIdade(funcionarioJaSalvo.idade)
    } catch (error) {
      window.alert('erro ao consultar funcionário')
    }
  }

  useEffect(() => {
    if (id) {
      obterDadosDoFuncionario()
    }
  }, [id])

  function aoDigitarNoCampoDeNome(valor: string) {
    console.log(valor)
    setNome(valor)
  }
  function aoDigitarNoCampoDeCpf(valor: string) {
    setCpf(valor)
  }
  function aoDigitarNoCampoDeRg(valor: string) {
    setRg(valor)
  }
  function aoDigitarNoCampoDeAltura(valor: string) {
    setAltura(parseFloat(valor))
  }
  function aoDigitarNoCampoDeIdade(valor: string) {
    setIdade(parseInt(valor))
  }
  function aoDigitarNoCampoDeSexo(valor: string) {
    setSexo(valor)
  }


  async function botaoSalvar() {
    const objeto = {
      id,
      nome,
      rg,
      cpf,
      idade,
      altura,
      sexo
    }

    try {
      if (id) {
        await axios.put('http://192.168.1.8:1880/api/funcionarios/editar', objeto)
      } else {
        await axios.post('http://192.168.1.8:1880/api/funcionarios/criar', objeto)
      }
      
      setNome('')
      setCpf('')
      setRg('')
      setAltura(0)
      setIdade(0)
      setSexo('')
    } catch (error) {
      window.alert('Erro!')
      console.log(error)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id ? 'Edição de Funcionário' : 'Cadastro de Funcionário'}</IonTitle> 
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

      {/* rg cpf idade altura */}
      <IonList>

        <IonItem>
          <IonLabel className='labelForm'>Nome</IonLabel>
          <IonInput value={nome} onInput={(e) => aoDigitarNoCampoDeNome(e.target.value)} placeholder='Insira o nome...'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='labelForm'>CPF</IonLabel>
          <IonInput value={cpf} onInput={(e) => aoDigitarNoCampoDeCpf(e.target.value)} placeholder='Insira o cpf...'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='labelForm'>RG</IonLabel>
          <IonInput value={rg} onInput={(e) => aoDigitarNoCampoDeRg(e.target.value)}  placeholder='Insira o rg...'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='labelForm'>Idade</IonLabel>
          <IonInput value={idade} onInput={(e) => aoDigitarNoCampoDeIdade(e.target.value)} placeholder='Insira a idade...'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='labelForm'>Altura</IonLabel>
          <IonInput value={altura} onInput={(e) => aoDigitarNoCampoDeAltura(e.target.value)} placeholder='Insira a altura...'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='labelForm'>Sexo</IonLabel>
          <IonInput value={sexo} onInput={(e) => aoDigitarNoCampoDeSexo(e.target.value)} placeholder='Insira o sexo...'></IonInput>
        </IonItem>
      </IonList>

          <IonButton onClick={botaoSalvar} color={'success'}>Salvar</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default FuncionariosForm;
