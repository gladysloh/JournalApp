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
import { textSharp, imageSharp, help, cloudUploadOutline } from 'ionicons/icons';

import './JournalImageEdit.css';

import question from '../theme/icons/question.png';
import text from '../theme/icons/text.png';
import image from '../theme/icons/image.png';
import uploadImage from '../theme/icons/uploadimage.png'

export const JournalImageEdit: React.FC = () => {

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
                                <IonGrid className="journalEntryGrid">
                                    <IonRow className="titleInputBackground">
                                        <IonCol>
                                            <IonCardSubtitle>
                                                <IonInput
                                                    className='titleInput'
                                                    value={title}
                                                    placeholder="Add title"
                                                    onIonChange={e => setTitle(e.detail.value!)}
                                                    required={true}
                                                    autocapitalize="true"
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
                                    <IonRow className="imageBackground">
                                        <IonCol size='12'>
                                            <IonCard className="journalImageCard">
                                                <IonCardContent>
                                                    <IonImg className="uploadImageIcon" src={uploadImage}></IonImg>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol className="inputTypeBackground">
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

export default JournalImageEdit;