import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router'; 
import './filiais-list.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const FiliaisList: React.FC = () => { 
  const [filiais, setFiliais] = useState([])
  
  async function obterListagemDoBackend() {
    try {
      const response = await axios.get('http://192.168.1.8:1880/api/filiais/listagem') 
      setFiliais(response.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    obterListagemDoBackend()
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Listagem de Filiais</IonTitle> 
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {/* CABEÇALHO DA TABELA */}
        <IonGrid fixed={true}>
          <IonRow className='ubuntu-medium'>
            <IonCol>Código</IonCol>
            <IonCol>Nome</IonCol> 
            <IonCol>Ações</IonCol> 
          </IonRow>

          {
            filiais.map((filial) => 
            (<>
              <IonRow className='data-row ubuntu-light'> 
                <IonCol>{filial.codigo}</IonCol>
                <IonCol>{filial.nome}</IonCol> 
                <IonCol>Editar</IonCol> 
              </IonRow>
            </>))
          }
         

        </IonGrid>
        

      </IonContent>
    </IonPage>
  );
};

export default FiliaisList;
