import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './signup.css';

const SignUp: React.FC = () => {
  return (
    <IonPage>
    <IonContent fullscreen>
      <IonHeader collapse="condense" translucent>
        <IonToolbar className="ion-text-center ion-toolbar-transparent">
          <IonTitle size="large">Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonContent>
  </IonPage>
  );
};

export default SignUp;
