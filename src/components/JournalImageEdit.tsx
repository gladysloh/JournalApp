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
      <IonContent>
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
                    onIonChange={e =>pushLog(`ionChange fired with value: ${e.detail.value}`)}>
                        <IonSelectOption className="selectModes" value="view">VIEW MODE</IonSelectOption>
                        <IonSelectOption className="selectModes" value="edit">EDIT MODE</IonSelectOption>
                    </IonSelect>
                    </IonCol>
                </IonRow>
                <IonRow className="row2">
                    <IonCol size='12'>
                        <IonCard className="journalImageCard">
                            <IonCardContent>
                                <IonImg className="uploadImageIcon" src={uploadImage}></IonImg>
                            </IonCardContent>
                        </IonCard>
                    </IonCol>
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

export default JournalImageEdit;