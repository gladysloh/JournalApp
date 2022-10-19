import { IonButtons, IonCard, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './journaltext.css';

import JournalTextEdit from '../../components/JournalTextEdit';

const JournalText: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
          <IonToolbar>
              <IonButtons slot='start'>
                  <IonMenuButton></IonMenuButton>
              </IonButtons>
          </IonToolbar>
      </IonHeader>
      <IonContent className="ioncontent">
        <JournalTextEdit />
      </IonContent>
    </IonPage>
  );
};

export default JournalText;
