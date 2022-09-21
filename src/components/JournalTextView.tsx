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

import './JournalTextView.css';

import text from '../theme/icons/text.png';
import image from '../theme/icons/image.png';

export const JournalTextView: React.FC = () => {

  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const [logs, setLogs] = useState<string[]>([]);
  const pushLog = (msg: string) => {
    setLogs([msg, ...logs]);
  };

  return (
    <IonPage>
      <IonContent className="ioncontent">
        <IonGrid>
            <IonRow className="row0">
                <IonGrid>
                    <IonCol size='3'>
                        <IonRow>
                            <IonCol>
                                <IonRow>
                                    <IonCardTitle className="day">21</IonCardTitle>
                                </IonRow>
                            </IonCol>
                            <IonCol>
                                <IonRow>
                                    <IonCardSubtitle className="year">2022</IonCardSubtitle>
                                </IonRow>
                                <IonRow>
                                    <IonCardTitle className="month">January</IonCardTitle>
                                </IonRow>
                            </IonCol>
                        </IonRow>
                    </IonCol>
                    
                    {/* <IonCol size='3'>
                        <IonButton className="questionMark" size="small" color="light">
                            <IonIcon className="questionMarkIcon" icon={help} slot="icon-only"></IonIcon>
                        </IonButton>
                    </IonCol> */}

                </IonGrid>
            </IonRow>
            <IonRow>
                <IonCard className='journalEntryCard'>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow className="row1">
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
                                    onIonChange={e =>pushLog(`ionChange fired with value: ${e.detail.value}`)}>
                                        <IonSelectOption className="selectModes" value="view">VIEW MODE</IonSelectOption>
                                        <IonSelectOption className="selectModes" value="edit">EDIT MODE</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                            <IonRow className="row2">
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
                                <IonCol></IonCol>
                                <IonCol size='6'>
                                <IonSegment className='inputType' onIonChange={e => console.log('Segment selected', e.detail.value)} value="text">
                                    <IonSegmentButton className='inputTypes' value="text">
                                    <IonLabel>
                                        <IonImg src={text} />
                                    </IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton className='inputTypes' value="image">
                                    <IonLabel>
                                        <IonImg src={image} />
                                    </IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                                </IonCol>
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

export default JournalTextView;