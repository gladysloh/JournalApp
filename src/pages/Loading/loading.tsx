import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './loading.css';

import logo from '../../theme/logo.png';

const Loading: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg className="logo" src={logo} />
      </IonContent>
    </IonPage>
  );
};

export default Loading;