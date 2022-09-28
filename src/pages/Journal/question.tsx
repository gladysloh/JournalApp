import React, { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';
import './question.css';

import question from '../../theme/icons/question.png';
import axios from 'axios';

const Question: React.FC = () => {

  useIonViewDidEnter(() => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    instance.get('/getrandomquestion').then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error("ERROR: ", err);
    })
  });

  return (
    <IonPage>
      <IonContent className="ioncontent">
        <IonGrid className="ionGrid">
          <IonRow>
            <IonGrid className="headingBackground">
              <IonRow className="heading">
                <IonCol size='2'>
                  <IonRow className="dayBackground" >
                    <IonCardSubtitle className="dayNo">21</IonCardSubtitle>
                  </IonRow>
                </IonCol>
                <IonCol size='8'>
                  <IonRow>
                    <IonCardSubtitle className="year">2022</IonCardSubtitle>
                  </IonRow>
                  <IonRow>
                    <IonCardTitle className="month">January</IonCardTitle>
                  </IonRow>
                </IonCol>
                <IonCol className="questionMarkBackground" size='2'>
                  <IonButton className="questionMark" size="small" color="light">
                    <IonImg className="questionMarkImg" src={question} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRow>
          <IonRow className="questionCardBackground">
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard className="questionCard">
              <IonCardContent>
                <IonCardSubtitle>
                  Question
                </IonCardSubtitle>
              </IonCardContent>
            </IonCard>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Question;
