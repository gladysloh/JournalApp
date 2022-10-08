import React, { useEffect, useState } from 'react';
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
    IonImg, useIonViewDidEnter
} from '@ionic/react';
import { textSharp, imageSharp, help } from 'ionicons/icons';

import './JournalView.css';

import google from '../theme/google.jpg';
import question from '../theme/icons/question.png';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { MONTH_NAMES } from '../SharedVariables';

export const JournalView: React.FC = () => {
    const [val, setVal] = useState('view');

    const history = useHistory();

    const initialJournal = {
        timestamp: {
            _seconds: 0
        },
        id: '',
        body: '',
        title: '',
        url: ''
    }

    const [viewJournal, setView] = useState(initialJournal);

    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const [loading, setLoading] = useState(false);

    useIonViewDidEnter(() => {
        setLoading(true)
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'

        let params = new URLSearchParams(location.search)
        let json = localStorage.getItem("journalEntry") || ''
        let userJournal = JSON.parse(json)
        console.log(userJournal)
        
        
        setView(userJournal);
        if (params.get("mode") == "view") {
            setVal('view')
        }
        setLoading(false)

    }, [loading]);

    const [qns, setQns] = useState([]);
    const questionPrompt = () => {
        const instance = axios.create({
            withCredentials: true,
            baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
        })

        instance.get('/getrandomquestion').then((res) => {
            console.log(res);
            setQns(res.data.question);
        }).catch((err) => {
            console.error("ERROR: ", err);
        })
    }

    const getJournalDay = () => {
        return new Date(viewJournal.timestamp._seconds * 1000).getDate()
    }

    const getJournalMonth = () => {
        return MONTH_NAMES[new Date(viewJournal.timestamp._seconds * 1000).getMonth()]

    }

    const getJournalYear = () => {
        return new Date(viewJournal.timestamp._seconds * 1000).getFullYear()
    }

    const handleChange = (e: any) => {
        const newVal = e.detail.value;
        console.log(newVal);
        setVal(newVal);
        if (newVal == 'edit') {
            handleEditJournal(viewJournal)
        }

    };


    const handleEditJournal = (journal: any) => {
        console.log("edit")
        let jsonJournal = JSON.stringify(journal)
        localStorage.setItem("journalEntry", jsonJournal)
        console.log(jsonJournal)

        history.replace({
            pathname: '/tabs/journaltextedit',
            search: '?mode=edit&id=' + journal.id,
            state: { detail: 'edit' }
        });
    }

    return (
        <IonPage>
            <IonContent className="ioncontent">
                <IonGrid className="ionGrid">
                    <IonRow>
                        <IonGrid className="headingBackground">
                            <IonRow className="heading">
                                <IonCol size='2'>
                                    <IonRow className="dayBackground" >
                                        <IonCardSubtitle className="dayNo">{getJournalDay()}</IonCardSubtitle>
                                    </IonRow>
                                </IonCol>
                                <IonCol size='8'>
                                    <IonRow>
                                        <IonCardSubtitle className="year">{getJournalYear()}</IonCardSubtitle>
                                    </IonRow>
                                    <IonRow>
                                        <IonCardTitle className="month">{getJournalMonth()}</IonCardTitle>
                                    </IonRow>
                                </IonCol>
                                <IonCol className="questionMarkBackground" size='2'>
                                    <IonButton className="questionMark" size="small" color="light" disabled>
                                        <IonImg className="questionMarkImg" src={question} />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonCard className='journalEditCard'>
                                <IonCardContent>
                                    <IonGrid>
                                        <IonRow className="titleInputBackground">
                                            <IonCol>
                                                <IonCardSubtitle>

                                                    {viewJournal.title}
                                                </IonCardSubtitle>
                                            </IonCol>
                                            <IonCol size='5'>
                                                <IonSelect
                                                    className="selectMode"
                                                    interface="popover"
                                                    placeholder="Select mode"
                                                    value={val} onIonChange={handleChange}>
                                                    <IonSelectOption className="selectModes" value="view">VIEW MODE</IonSelectOption>
                                                    <IonSelectOption className="selectModes" value="edit">EDIT MODE</IonSelectOption>
                                                </IonSelect>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow className="bodyInputBackground" >
                                            <IonCol>
                                                <p className='bodyInput'> {viewJournal.body} </p>
                                                <div className="imageDiv">
                                                    {viewJournal.url ? <img className="uploadedImage" src={viewJournal.url}></img> : <div className="box"></div>}
                                                </div>

                                            </IonCol>
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

export default JournalView;