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
    IonImg
} from '@ionic/react';
import { textSharp, imageSharp, help } from 'ionicons/icons';

import './JournalView.css';

import google from '../theme/google.jpg';
import question from '../theme/icons/question.png';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { MONTH_NAMES } from '../SharedVariables';

export const JournalView: React.FC = () => {

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const [title, setTitle] = useState<string>();
    const [body, setBody] = useState<string>();

    const [logs, setLogs] = useState<string[]>([]);
    const pushLog = (msg: string) => {
        setLogs([msg, ...logs]);
    };

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

    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.search); // result: '?query=abc'

        let params = new URLSearchParams(location.search)
        let userJournal = JSON.parse(localStorage.getItem("journalEntry"))
        console.log(userJournal)
        setView(userJournal);

    }, [location]);

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

    const [val, setVal] = useState(['view']);
    const handleChange = (e: any) => {
        const newVal = e.detail.value;
        console.log(newVal);
        setVal(newVal);
        if(newVal == 'edit'){
            handleEditJournal(viewJournal)
        }
        
    };


    const handleEditJournal = (journal: any) => {
        console.log("edit")
        let jsonJournal = JSON.stringify(journal)
        localStorage.setItem("journalEntry", jsonJournal)

        history.push({
            pathname: '/tabs/journaltextedit',
            search: '?mode=edit&id='+journal.id,
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
                        <IonCard className='journalEntryCard'>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow className="titleInputBackground">
                                        <IonCol>
                                            <IonCardSubtitle>
                                                {/* <IonInput
                                                  className='titleInput'
                                                  value='CHILL DAY'
                                                  readonly
                                                  inputMode="text"
                                                  maxlength={20}>
                                              </IonInput> */}

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
                                        {/* <IonTextarea
                                          className='bodyInput'
                                          value='Today was a very busy day. But I love busy days like today. It keeps me motivated and productive throughout the day to complete as many tasks as possible. I do not like to waste my time, so I try to keep myself occupied with tasks everyday. I completed 3 school assignments, submitted my project proposal to my supervisor and spent time with my family.'
                                          disabled
                                          readonly
                                          rows={15}
                                          inputMode="text"
                                          maxlength={1500}>
                                      </IonTextarea> */}
                                        <span className='bodyInput'> {viewJournal.body} </span>
                                    </IonRow>
                                    <IonRow className="row3">
                                        <IonImg className="uploadedImage" src={viewJournal.url}></IonImg>
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