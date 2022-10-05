import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, useIonViewDidEnter } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalgeneratemood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
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

    useIonViewDidEnter(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search);

        history.replace({
            pathname: '/tabs/journalmood',
            search: `?sentiment=${params.get('sentiment')}&journalid=${params.get('journalid')}`
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
};

export default JournalGenerateMood;