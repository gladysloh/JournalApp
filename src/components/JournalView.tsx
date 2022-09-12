import React, { useState } from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardContent, 
  IonList,
  IonItem, 
  IonInput,
  IonIcon, 
  IonLabel, 
  IonButton, 
  IonSegment,
  IonSegmentButton,
  IonSelectOption,
  IonSelect,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonFabList,
  IonImg
} from '@ionic/react';
import { textSharp, imageSharp, help } from 'ionicons/icons';

import './JournalView.css';

import google from '../theme/google.jpg';
import question from '../theme/icons/question.png';

export const JournalView: React.FC = () => {

  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const [logs, setLogs] = useState<string[]>([]);
  const pushLog = (msg: string) => {
    setLogs([msg, ...logs]);
  };

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
                  <IonRow>
                      <IonCard className='journalEntryCard'>
                          <IonCardContent>
                              <IonGrid>
                                  <IonRow className="titleInputBackground">
                                      <IonCol>
                                          <IonCardSubtitle>
                                              <IonInput
                                                  className='titleInput'
                                                  value='CHILL DAY'
                                                  readonly
                                                  inputMode="text"
                                                  maxlength={20}>
                                              </IonInput>
                                          </IonCardSubtitle>
                                      </IonCol>
                                      <IonCol size='5'>
                                          <IonSelect
                                              className="selectMode"
                                              interface="popover"
                                              placeholder="Select mode"
                                              onIonChange={e => pushLog(`ionChange fired with value: ${e.detail.value}`)}>
                                              <IonSelectOption className="selectModes" value="view">VIEW MODE</IonSelectOption>
                                              <IonSelectOption className="selectModes" value="edit">EDIT MODE</IonSelectOption>
                                          </IonSelect>
                                      </IonCol>
                                  </IonRow>
                                  <IonRow className="bodyInputBackground">
                                      <IonTextarea
                                          className='bodyInput'
                                          value='Today was a very busy day. But I love busy days like today. It keeps me motivated and productive throughout the day to complete as many tasks as possible. I do not like to waste my time, so I try to keep myself occupied with tasks everyday. I completed 3 school assignments, submitted my project proposal to my supervisor and spent time with my family.'
                                          disabled
                                          readonly
                                          rows={15}
                                          inputMode="text"
                                          maxlength={1500}>
                                      </IonTextarea>
                                  </IonRow>
                                  <IonRow className="row3">
                                      <IonImg className="uploadedImage" src={google}></IonImg>
                                  </IonRow>
                              </IonGrid>
                          </IonCardContent>
                      </IonCard>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};

export default JournalView;