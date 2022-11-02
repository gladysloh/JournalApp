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
    IonImg, useIonViewDidEnter, useIonViewDidLeave, IonButtons, IonBackButton
} from '@ionic/react';
import { textSharp, imageSharp, help, journal, personCircle, arrowBack, chevronBack } from 'ionicons/icons';

import './JournalView.css';

import question from '../../theme/icons/question.png';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { MONTH_NAMES } from '../../SharedVariables';
import { UserJournal } from '../../interfaces/JournalInterface';
import { createJournal, getJournal } from '../../services/JournalService';

import elated from '../../theme/icons/elated.png';
import smiling from '../../theme/icons/smiling.png';
import neutral from '../../theme/icons/neutral.png';
import sad from '../../theme/icons/sad.png';
import verysad from '../../theme/icons/verysad.png';

export const JournalView: React.FC = () => {
    const [val, setVal] = useState('view');

    const history = useHistory();
    const [journalId, setJournalId] = useState<string>()

    const initialJournal: UserJournal = {
        title: "",
        body: "",
        url: "",
        sentiment: 0,
        createdTimestamp: {
            _seconds: 0
        },
        editTimestamp: {
            _seconds: 0
        }
    };

    const [viewJournal, setView] = useState(initialJournal);

    const [loading, setLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false)


    const [sentiment, setSentiment] = useState(0)

    let params = new URLSearchParams(history.location.search)
    const jid = params.get("id") || ''

    useIonViewDidEnter(() => {
        setIsLoad(false)
        let params = new URLSearchParams(history.location.search)

        let jid = params.get("id") || ''
        setJournalId(jid)

        setLoading(true)
        console.log(journalId)

        getJournalEntry(jid)

        if (params.get("mode") == "view") {
            setVal('view')
        }

        setLoading(false)
    }, [loading])

    const getJournalEntry = async (journalId: any) => {
        let result = await getJournal(journalId)
        console.log(result)
        if (result.success) {
            console.log(result.journal)
            setView(result.journal);
            setSentiment(result.journal.sentiment)
            console.log(viewJournal)
            setIsLoad(true)
        } else {
            history.replace('/tabs/journaloverview')
        }
    }

    const getJournalDay = (seconds: any) => {
        return new Date(seconds * 1000).getDate()
    }

    const getJournalMonth = (seconds: any) => {
        return MONTH_NAMES[new Date(seconds * 1000).getMonth()]
    }

    const getJournalYear = (seconds: any) => {
        return new Date(seconds * 1000).getFullYear()
    }

    const getJournalTime = (seconds: any) => {
        return new Date(seconds * 1000).toLocaleTimeString().slice(0, 5);
    }

    const getEditTimestamp = (seconds: any) => {
        return `Edited on the ${getJournalDay(seconds)} ${getJournalMonth(seconds)} ${getJournalYear(seconds)} ${getJournalTime(seconds)}`
    }

    const handleChange = (e: any) => {
        const newVal = e.detail.value;
        console.log("chnage to: ", newVal);
        setVal(newVal);
        if (newVal == 'edit') {
            handleEditJournal()
        }
    };

    const handleEditJournal = () => {
        console.log("going to edit")
        // let journalId = params.get("id")
        history.replace({
            pathname: '/tabs/journaltextedit',
            search: '?mode=edit&id=' + journalId,
            state: { detail: 'edit' }
        });
    }

    const goBack = () => {
        
        history.replace({
            pathname: '/tabs/journaloverview'
        });
    }

    useIonViewDidLeave(() => {
        console.log('ionViewWillEnter event fired');

        setView(initialJournal)
        setJournalId("")
    });

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

    return (
        <IonPage>

            <IonContent className="ioncontent">
                {
                    isLoad ?
                        <IonGrid className="ionGrid">
                            <IonRow class="ion-align-items-center">
                                <IonCol size="1" >
                                    <IonIcon onClick={()=>{goBack()}} icon={chevronBack} className="back-btn" size="large"/>
                                </IonCol>

                                <IonCol size="8">
                                    <div className="outer-div">
                                        <div className="inner-div">
                                            <span className="dayNo">{getJournalDay(viewJournal.createdTimestamp._seconds)}</span>
                                        </div>
                                        <div className="inner-div">
                                            <span className="year">{getJournalYear(viewJournal.createdTimestamp._seconds)}</span>
                                            <span className="month">{getJournalMonth(viewJournal.createdTimestamp._seconds)}</span>
                                        </div>
                                    </div>
                                </IonCol>



                                {/* <IonGrid className="headingBackground">
                                    <IonRow className="heading">

                                        <IonCol size='2'>
                                            <IonRow className="dayBackground" >
                                                <IonCardSubtitle className="dayNo">{getJournalDay(viewJournal.createdTimestamp._seconds)}</IonCardSubtitle>
                                            </IonRow>
                                        </IonCol>
                                        <IonCol size='6'>
                                            <IonRow>
                                                <IonCardSubtitle className="year">{getJournalYear(viewJournal.createdTimestamp._seconds)}</IonCardSubtitle>
                                            </IonRow>
                                            <IonRow>
                                                <IonCardTitle className="month">{getJournalMonth(viewJournal.createdTimestamp._seconds)}</IonCardTitle>
                                            </IonRow>
                                        </IonCol>

                                    </IonRow>
                                </IonGrid> */}
                            </IonRow>

                            <IonRow>

                                <IonCol>
                                    <IonCard className='journalEditCard'>
                                        <IonCardContent>
                                            <IonGrid className="journalEntryGrid">
                                                <IonRow>
                                                    <IonCol>
                                                        <IonCardSubtitle className="editTimestamp">  {viewJournal.editTimestamp ? getEditTimestamp(viewJournal.editTimestamp?._seconds) : false}</IonCardSubtitle>
                                                    </IonCol>
                                                </IonRow>
                                                <IonRow className="nomargin">
                                                    <IonCol size="7">
                                                        <div className="journal-emotion">
                                                            Overall Journal Emotion: <IonImg src={generateMood()?.src} className="journal-emoji" />
                                                        </div>
                                                    </IonCol>
                                                    <IonCol className="selectModeBackground">
                                                        <IonSelect
                                                            className="selectMode"
                                                            interface="popover"
                                                            placeholder="Select mode"
                                                            value={val} onIonChange={e => handleChange(e)}>
                                                            <IonSelectOption className="selectModes" value="view">VIEW MODE</IonSelectOption>
                                                            <IonSelectOption className="selectModes" value="edit">EDIT MODE</IonSelectOption>
                                                        </IonSelect>
                                                    </IonCol>
                                                </IonRow>
                                                <IonRow className="titleInputBackground">
                                                    <IonCol>
                                                        <IonCardSubtitle>
                                                            {viewJournal.title}
                                                        </IonCardSubtitle>
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
                        </IonGrid> :
                        <div className="loader-container">
                            <div className="lds-dual-ring"></div>
                        </div>
                }


            </IonContent>
        </IonPage>
    );
};

export default JournalView;