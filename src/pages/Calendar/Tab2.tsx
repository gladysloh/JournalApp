import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Tab2.css';
import { personCircle, search, star, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Calendar</IonTitle>

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

export default Tab2;
