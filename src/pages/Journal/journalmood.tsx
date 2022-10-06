import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonToast, useIonViewDidEnter } from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './journalmood.css';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';
import questionmark from '../../theme/icons/questionmark.png';
import { MONTH_NAMES } from '../../SharedVariables';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

const JournalMood: React.FC = () => {

  const [mood, setMood] = useState(false)
  const [sentiment, setSentiment] = useState(0)
  const [journalId, setJournalId] = useState(" ")


  const [loading, setLoading] = useState(false);
  const [present, dismiss] = useIonLoading();

  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search)


  const goToOverview = () => {
    history.push({
      pathname: '/tabs/journaloverview'
    });
  }

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search);

    let s = params.get("sentiment") || "0"
    setSentiment(parseInt(s))

    let j = params.get("journalid") || ""
    setJournalId(j)

    if (j == "") 
      goToOverview()

  }, [location])

  const getTodayDate = () => {
    let today = new Date()
    return `${today.getDate()} ${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()} `
  }

  const [presentToast] = useIonToast();
  const toaster = (msg: any, icon: any) => {
    presentToast({
      message: msg,
      duration: 1500,
      position: 'bottom',
      cssClass: icon == checkmarkCircleOutline ? "toaster-success" : "toaster-fail",
      icon: icon
    });
  };

  const generateMood = () => {
    //-1 to -0.6, -0.6 to -0.2, -0.2 to 0.2, 0.2 to 0.6, 0.6 to 1

    if (sentiment >= -1 && sentiment < -0.6) {
      return { name: 'Very Sad', src: verysad }
    } else if (sentiment >= -0.6 && sentiment < -0.2) {
      return { name: 'Sad', src: sad }
    } else if (sentiment >= -0.2 && sentiment < 0.2) {
      return { name: 'Neutral', src: neutral }
    } else if (sentiment >= 0.2 && sentiment < 0.6) {
      return { name: 'Happy', src: smiling }
    } else if (sentiment >= 0.6 && sentiment <= 1) {
      return { name: 'Elated', src: elated }
    }
  }

  const updateMood = (s: number) => {
    console.log(s)

    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    let body = localStorage.getItem("journalEntry") || ""
    let bodyJson = JSON.parse(body)

    let journalId = params.get("journalid") || ''

    if (journalId == '0') {
      let createBody = {
        ...bodyJson,
        sentiment: s
      }

      instance.post('/createjournal', createBody).then((res) => {
        console.log(res);
        dismiss();
        setLoading(false);

      })
        .catch((err) => {
          toaster("Error! Something went wrong", closeCircleOutline)
          dismiss();
          setLoading(false);
          // console.error("ERROR: ", err.response.data.error);
        })

    }
    else{
      let editBody = {
        ...bodyJson,
        sentiment: s
      }

      console.log(bodyJson)

      instance.post('/editjournal', editBody).then((res) => {
        console.log(res);
        toaster("Mood updated", checkmarkCircleOutline)
        goToOverview()

      }).catch((err) => {
        console.error("ERROR: ", err);
      })


    }
  }


    return (
      <IonPage>
        <IonContent className="ioncontent" fullscreen>
          <IonGrid className="ionGrid">
            <IonRow className="title">
              <IonCardTitle>{getTodayDate()}</IonCardTitle>
              <p></p>
              <p>Your mood for today is...</p>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonCard className="generatedEmojiCard">
                  <IonImg className="generatedEmojiImage" src={generateMood()?.src} />
                  <IonCardTitle> {generateMood()?.name} </IonCardTitle>
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
                      <IonRow className="emojiCards">
                        <IonCol>
                          <IonCard className="emojiCard" onClick={() => updateMood(1)}>
                            <IonImg className="emojiImage" src={smiling} />
                          </IonCard>
                        </IonCol>

                        <IonCol>
                          <IonCard className="emojiCard" onClick={() => updateMood(0)}>
                            <IonImg className="emojiImage" src={neutral} />
                          </IonCard>
                        </IonCol>
                        <IonCol>
                          <IonCard className="emojiCard" onClick={() => updateMood(-0.5)}>
                            <IonImg className="emojiImage" src={sad} />
                          </IonCard>
                        </IonCol>

                        <IonCol>
                          <IonCard className="emojiCard" onClick={() => updateMood(-1)}>
                            <IonImg className="emojiImage" src={verysad} />
                          </IonCard>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonButton onClick={updateMood(sentiment)}>SKIP</IonButton>
                        {/* <IonButton>NEXT</IonButton> */}
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