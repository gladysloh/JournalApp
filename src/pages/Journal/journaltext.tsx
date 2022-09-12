import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './journaltext.css';

import JournalTextEdit from '../../components/JournalTextEdit';

const JournalText: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ioncontent" fullscreen>
        <JournalTextEdit />
      </IonContent>
    </IonPage>
  );
};

export default JournalText;
