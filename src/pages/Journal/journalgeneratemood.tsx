import { IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalgeneratemood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
import questionmark from '../../theme/icons/questionmark.png';

const JournalGenerateMood: React.FC = () => {
  return (
    <IonPage>
        <IonContent className="ioncontent" fullscreen>
            <IonGrid>
                <IonRow className="title">
                    <IonCardTitle>21 January 2022</IonCardTitle>
                    <p>Generating your mood for today...</p>
                </IonRow>
                <IonRow>
                    <IonCol className="emojiCards">
                        <IonRow>
                            <IonCol>
                                <IonCard className="emojiCard">
                                    <IonImg className="emojiImage" src={elated} />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="emojiCard">
                                    <IonImg className="emojiImage" src={smiling} />
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
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
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="emojiCard">
                                    <IonImg className="emojiImage" src={verysad} />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="emojiCard">
                                    <IonImg className="emojiImage" src={questionmark} />
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default JournalGenerateMood;