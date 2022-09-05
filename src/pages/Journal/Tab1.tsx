import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonMenuButton } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Tab1.css';
import { personCircle, search, star, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar >
          <IonTitle>Journal</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ personCircle } color="dark"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
