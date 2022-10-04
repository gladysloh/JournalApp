import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalimage.css';

import JournalImageEdit from '../../components/JournalImageEdit';

const JournalImage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
          <IonToolbar>
              <IonButtons slot='start'>
                  <IonMenuButton></IonMenuButton>
              </IonButtons>
          </IonToolbar>
      </IonHeader>
      <IonContent className="ioncontent" fullscreen>
        <JournalImageEdit />
      </IonContent>
    </IonPage>
  );
};

export default JournalImage;