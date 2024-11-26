import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  useParams } from 'react-router'; 
import './funcionarios-list.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import { useHistory } from 'react-router';

const FuncionariosList: React.FC = () => { 
  const historico = useHistory()
  const [funcionarios, setFuncionarios] = useState([])
  
  async function obterListagemDoBackend() {
    try {
      const response = await axios.get('http://l192.168.1.8:1880/api/funcionarios/listagem') 
      setFuncionarios(response.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    obterListagemDoBackend()
  }, [])

  function irPraTelaDeCadastro() {
    historico.push('/funcionarios/form')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Listagem de Funcionários</IonTitle> 
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonButton onClick={irPraTelaDeCadastro} color={'medium'}>Cadastro</IonButton>
        {/* CABEÇALHO DA TABELA */}
        <IonGrid fixed={true}>
          <IonRow className='ubuntu-medium'>
            <IonCol>RG</IonCol>
            <IonCol>Nome</IonCol> 
            <IonCol>Ações</IonCol> 
          </IonRow>

          {
            funcionarios.map((funcionario) => 
            (<>
              <IonRow className='data-row ubuntu-light'> 
                <IonCol>{funcionario.rg}</IonCol>
                <IonCol>{funcionario.nome}</IonCol> 
                <IonCol onClick={() => {
                  historico.push('/funcionarios/form-edit/' + funcionario.id)
                }}>Editar</IonCol> 
              </IonRow>
            </>))
          }
         

        </IonGrid>
        

      </IonContent>
    </IonPage>
  );
};

export default FuncionariosList;
