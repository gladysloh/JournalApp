import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './moodcharts.css';
import { personCircle, search, star, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

const Moodcharts: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Mood Chart</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ personCircle }  color="dark"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
      </IonContent>
    </IonPage>
  );
};

export default Moodcharts;
