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
    IonImg, useIonViewDidEnter, useIonViewDidLeave
} from '@ionic/react';
import { textSharp, imageSharp, help, journal } from 'ionicons/icons';

import './JournalView.css';

import question from '../../theme/icons/question.png';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { MONTH_NAMES } from '../../SharedVariables';
import { UserJournal } from '../../interfaces/JournalInterface';
import { createJournal, getJournal } from '../../services/JournalService';

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
        }
    };

    const [viewJournal, setView] = useState(initialJournal);

    const [loading, setLoading] = useState(false);
    const [isLoad, setIsLoad] = useState(false)

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

    useIonViewDidLeave(() => {
        console.log('ionViewWillEnter event fired');

        setView(initialJournal)
        setJournalId("")
    });

    return (
        <IonPage>
            <IonContent className="ioncontent">

                {
                    isLoad ? <IonGrid className="ionGrid">
                        <IonRow>
                            <IonGrid className="headingBackground">

                                <IonRow className="heading">
                                    <IonCol size='2'>
                                        <IonRow className="dayBackground" >
                                            <IonCardSubtitle className="dayNo">{getJournalDay(viewJournal.createdTimestamp._seconds)}</IonCardSubtitle>
                                        </IonRow>
                                    </IonCol>
                                    <IonCol size='8'>
                                        <IonRow>
                                            <IonCardSubtitle className="year">{getJournalYear(viewJournal.createdTimestamp._seconds)}</IonCardSubtitle>
                                        </IonRow>
                                        <IonRow>
                                            <IonCardTitle className="month">{getJournalMonth(viewJournal.createdTimestamp._seconds)}</IonCardTitle>
                                        </IonRow>
                                    </IonCol>

                                </IonRow>
                            </IonGrid>
                        </IonRow>

                        <IonRow>

                            <IonCol>
                                <IonCard className='journalEditCard'>
                                    <IonCardContent>
                                        <IonGrid className="journalEntryGrid">
                                            <IonRow>
                                                <IonCol>
                                                    <IonCardSubtitle className="editTimestamp">  {viewJournal.editTime ? getEditTimestamp(viewJournal.editTime?._seconds) : false}</IonCardSubtitle>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow className="nomargin">
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