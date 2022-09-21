import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalmood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
import questionmark from '../../theme/icons/questionmark.png';

const JournalMood: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ioncontent" fullscreen>
        <IonGrid className="ionGrid">
          <IonRow className="title">
            <IonCardTitle>21 January 2022</IonCardTitle>
            <p>Your mood for today is...</p>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="generatedEmojiCard">
                <IonImg className="generatedEmojiImage" src={elated} />
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="checkEmojiCard">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonCardTitle>Is this your mood for today?</IonCardTitle>
                        <p>No, my mood for today is...</p>
                      </IonCol>
                    </IonRow>
                    <IonRow className="emojiCards">
                      <IonCol>
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={smiling} />
                        </IonCard>
                      </IonCol>
                    
                      <IonCol>
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={neutral} />
                        </IonCard>
                      </IonCol>
                      <IonCol>
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={sad} />
                        </IonCard>
                      </IonCol>
                    
                      <IonCol>
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={verysad} />
                        </IonCard>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonButton>SKIP</IonButton>
                      <IonButton>NEXT</IonButton>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default JournalMood;