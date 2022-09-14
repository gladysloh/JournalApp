import { IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './journalgeneratemood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
import question from '../../theme/icons/question.png';

const JournalGenerateMood: React.FC = () => {
  return (
    <IonPage>
        <IonContent className="ioncontent" fullscreen>
            <IonGrid className="ionGrid">
                <IonRow className="titleBackground">
                    <IonCardTitle className="title">21 January 2022</IonCardTitle>
                </IonRow>
                <IonRow className="subtitleBackground">
                    <p className="subtitle">Your mood for today is...</p>
                </IonRow>
                <IonRow>
                    <IonCol className="generateEmojiCards">
                        <IonRow>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={elated} />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={smiling} />
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={neutral} />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={sad} />
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={verysad} />
                                </IonCard>
                            </IonCol>
                            <IonCol>
                                <IonCard className="generateEmojiCard">
                                    <IonImg className="generateEmojiImage" src={question} />
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