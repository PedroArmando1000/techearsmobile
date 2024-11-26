import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useEffect, useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Filiais',
    url: '/filiais/list',
    iosIcon: mailOutline,
    mdIcon: mailSharp
  },
  {
    title: 'Usuários',
    url: '/usuarios/list',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Funcionários',
    url: '/funcionarios/list',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  }, 
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const [estaLogado, setEstaLogado] = useState<any>(false)

  useEffect(() => {
      const intervalo = setInterval(() => {
        
          if (localStorage.getItem('email')) {
              setEstaLogado(true) 
          } else { 
              setEstaLogado(false)
          }
      
      }, 150);
    
      return () => {
          clearInterval(intervalo)
      }
  }, [])

  return (
    estaLogado ? 
    <>
    
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{localStorage.getItem('nome')}</IonListHeader>
          <IonNote>{localStorage.getItem('email')}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
  
      </IonContent>
    </IonMenu>

    </> : ''
   
  );
};

export default Menu; 

