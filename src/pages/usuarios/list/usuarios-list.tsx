import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router'; 
import './usuarios-list.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const UsuariosList: React.FC = () => { 
  const [usuarios, setUsuarios] = useState([])
  
  async function obterListagemDoBackend() {
    try {
      const response = await axios.get('http://192.168.1.8:1880/api/usuarios/listagem') 
      setUsuarios(response.data)
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
          <IonTitle>Listagem de Usuários</IonTitle> 
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        {/* CABEÇALHO DA TABELA */}
        <IonGrid fixed={true}>
          <IonRow className='ubuntu-medium'>
            <IonCol>Email</IonCol> 
            <IonCol>Ações</IonCol> 
          </IonRow>

          {
            usuarios.map((usuario) => 
            (<>
              <IonRow className='data-row ubuntu-light'> 
                <IonCol>{usuario.email}</IonCol> 
                <IonCol>Editar</IonCol> 
              </IonRow>
            </>))
          }
         

        </IonGrid>
        

      </IonContent>
    </IonPage>
  );
};

export default UsuariosList;
