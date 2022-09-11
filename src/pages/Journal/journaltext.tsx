import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './journaltext.css';

import JournalTextEdit from '../../components/JournalTextEdit';

const JournalText: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ioncontent" fullscreen>
        <JournalTextEdit />
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default JournalText;
