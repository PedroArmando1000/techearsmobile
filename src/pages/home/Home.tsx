import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/react';
import './Home.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom'; 
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { cog } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory()  
  const [podeExibirMapa, setPodeExibirMapa] = useState(false)
  const [latitudeLongitude, setLatitudeLongitude] = useState<number[]>([])

  function perguntarGeoLocalizacaoAoUsuario() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}`);
          console.log(`Longitude: ${longitude}`);
          setLatitudeLongitude([latitude, longitude]) 
        },
        function(error) {
          console.error(`Erro ao obter localização: ${error.message}`);
          setLatitudeLongitude([-18.921606, -48.277639]) 
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo seu navegador."); 
      setLatitudeLongitude([-18.921606, -48.277639]) 
    }

  }

  useEffect(() => {
    perguntarGeoLocalizacaoAoUsuario()
  },[])

  useEffect(() => {

    if (latitudeLongitude.length > 0) {
      setPodeExibirMapa(true)
    }

  }, [latitudeLongitude])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Techears</IonTitle> 
        </IonToolbar>
      </IonHeader>
      
      <IonContent>

        {podeExibirMapa ? 
        ( 
          <div style={{width: '100%', height: '80vh'}}>
             
         
            <MapContainer style={{height: '100%'}} center={latitudeLongitude} zoom={15} scrollWheelZoom={false}>
                
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
       
                <Marker position={latitudeLongitude}>
                </Marker>    
            </MapContainer>
          </div>
        ) : ''}
 
       
        
      </IonContent>
      

    </IonPage>
  );
};

export default Home;
 

