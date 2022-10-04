import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, useIonViewDidEnter } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalgeneratemood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
<<<<<<< HEAD
import questionmark from '../../theme/icons/questionmark.png';
import { MONTH_NAMES } from '../../SharedVariables';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const JournalGenerateMood: React.FC = () => {
    const [mood, setMood] = useState(false)
    const [sentiment, setSentiment] = useState(0)

    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search)
    // const [journalMode, setMode] = useState<string>();

    useIonViewDidEnter(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search);

        let params = new URLSearchParams(location.search)
        history.push({
            pathname: '/tabs/journalmood',
            search: '?sentiment='+params.get('sentiment')
        });
    })

  

    const getTodayDate = () => {
        let today = new Date()
        return `${today.getDate()} ${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`
    }

    return (
        <IonPage>
            <IonContent className="ioncontent" fullscreen>
                <IonGrid>
                    <IonRow className="title">
                        <IonCardTitle>{getTodayDate()}</IonCardTitle>
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
=======
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
>>>>>>> origin/frontend
};

export default JournalGenerateMood;