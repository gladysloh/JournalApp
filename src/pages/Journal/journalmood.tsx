import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
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
          <IonRow className="titleBackground">
            <IonCardTitle className="title">21 January 2022</IonCardTitle>
          </IonRow>
          <IonRow className="subtitleBackground">
            <p className="subtitle">Predicted mood is...</p>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="generatedEmojiCard">
                <IonImg className="generatedEmojiImage" src={elated} />
                <IonLabel className="generatedEmojiLabel">ELATED</IonLabel>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="checkEmojiCard">
                <IonCardContent>
                  <IonGrid className="checkEmojiGrid">
                    <IonRow>
                      <IonCardTitle className="checkEmojiTitle">Is this your mood for today?</IonCardTitle>
                    </IonRow>
                    <IonRow>
                      <p className="checkEmojiSubtitle">No, my mood for today is...</p>
                    </IonRow>
                    <IonRow className="emojiCardsBackground">
                      <IonCol className="emojiCards">
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={smiling} />
                        </IonCard>
                      </IonCol>
                      <IonCol className="emojiCards">
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={neutral} />
                        </IonCard>
                      </IonCol>
                      <IonCol className="emojiCards">
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={sad} />
                        </IonCard>
                      </IonCol>
                      <IonCol className="emojiCards">
                        <IonCard className="emojiCard">
                          <IonImg className="emojiImage" src={verysad} />
                        </IonCard>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonButton className="greybutton" color="greybutton">SKIP</IonButton>
                      <IonButton className="greybutton" color="greybutton">NEXT</IonButton>
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