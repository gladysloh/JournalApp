import React, { useState, Component } from 'react';
import {
    IonContent,
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
    IonImg,
    useIonAlert
} from '@ionic/react';
import { textSharp, imageSharp, help } from 'ionicons/icons';

import './JournalTextEdit.css';

import question from '../theme/icons/question.png';
import text from '../theme/icons/text.png';
import image from '../theme/icons/image.png';

export const JournalTextEdit: React.FC = () => {

    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();
    const [logs, setLogs] = useState<string[]>([]);
    const pushLog = (msg: string) => {
        setLogs([msg, ...logs]);
    };
    const [presentAlert] = useIonAlert();
    const [handlerMessage, setHandlerMessage] = useState('');
    const [roleMessage, setRoleMessage] = useState('');

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
                                    <IonButton className="questionMark" size="small" color="light"
                                    onClick={() => setHandlerMessage('If you could relieve any day of your life and change nothing, what day would you choose?')}>
                                        <IonImg className="questionMarkImg" src={question} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonRow>
                    <IonRow>
                        <p>{handlerMessage}</p>
                    </IonRow>
                    <IonRow>
                        <IonCard className='journalEntryCard'>
                            <IonCardContent>
                                <IonGrid className="journalEntryGrid">
                                    <IonRow className="nomargin">
                                        <IonCol className="selectModeBackground">
                                            <IonSelect
                                                className="selectMode"
                                                interface="popover"
                                                placeholder="MODE"
                                                onIonChange={e => pushLog(`ionChange fired with value: ${e.detail.value}`)}>
                                                <IonSelectOption className="selectMode" value="view">VIEW MODE</IonSelectOption>
                                                <IonSelectOption className="selectMode" value="edit">EDIT MODE</IonSelectOption>
                                            </IonSelect>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="titleInputBackground">
                                        <IonCol>
                                            <IonCardSubtitle>
                                                <IonTextarea
                                                    className='titleInput'
                                                    value={title}
                                                    placeholder="Add title"
                                                    onIonChange={e => setTitle(e.detail.value!)}
                                                    required={true}
                                                    autocapitalize="true"
                                                >
                                                </IonTextarea>
                                            </IonCardSubtitle>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow className="bodyInputBackground">
                                        <IonTextarea
                                            className='bodyInput'
                                            placeholder="Begin your day here..."
                                            value={body}
                                            onIonChange={e => setBody(e.detail.value!)}
                                            required={true}
                                            rows={15}
                                            inputMode="text"
                                            maxlength={1500}>
                                        </IonTextarea>
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

export default JournalTextEdit;