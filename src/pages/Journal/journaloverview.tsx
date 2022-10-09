import { IonButton, IonCard, IonMenuToggle, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter, useIonViewWillEnter, IonButtons, IonMenuButton } from '@ionic/react';
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from 'axios';

/** STYLE */
import './journaloverview.css';

/** ICONS */
import fire from '../../theme/icons/fire.png';
import journal from '../../theme/icons/journal.png';
import images from '../../theme/icons/images.png';
import happy from '../../theme/icons/happy.png';
import text from '../../theme/icons/text.png';
import image from '../../theme/icons/image.png';
import clock from '../../theme/icons/clock.png';

import { Link, Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { DAY_NAMES, MONTH_NAMES } from '../../SharedVariables';

const JournalOverview: React.FC = () => {
    const history = useHistory();

    const [present, dismiss] = useIonLoading();

    const current = new Date();

    const [journals, setJournals] = useState([]);

    const [entry, setEntry] = useState(false);

    const [loading, setLoading] = useState(false);

    const getJournalInfo = async () => {
        console.log("getting all journals")
        setLoading(true); // Set loading before sending API request
        // present()
        const instance = axios.create({
            withCredentials: true,
            baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
        })

        instance.get('/getalljournals').then((res) => {
            console.log(res);
            let j: [] = res.data.journals
            j.sort((a, b) => b['timestamp']['_seconds'] - a['timestamp']['_seconds']);

            setJournals(j);
            setLoading(false); // Stop loading


        }).catch((err) => {
            setLoading(false); // Stop loading

            console.error("ERROR: ", err);
            if (err.response.status == 401) history.replace("/login")
        })


    };

    useIonViewWillEnter(() => {
        console.log("ion view enter")
        getJournalInfo()
    }, []);

    const checkJournals = () => {
        if (journals.length != 0) {
            if (new Date(journals[0]['timestamp']['_seconds'] * 1000).setHours(0, 0, 0, 0) == current.setHours(0, 0, 0, 0)) return true
            else return false
        }

    }


    const getJournalTime = (timestamp: any) => {
        let seconds = timestamp._seconds;
        const result = new Date(seconds * 1000).toLocaleTimeString().slice(0, 5);
        return result;
    }

    const getJournalDate = (timestamp: any) => {
        let seconds = timestamp._seconds;
        const date = new Date(seconds * 1000).getDate()
        const month = new Date(seconds * 1000).getMonth()
        return date + " " + MONTH_NAMES[month];
    }

    const getJournalDay = (timestamp: any) => {
        let seconds = timestamp._seconds;
        const day = new Date(seconds * 1000).getDay()
        return DAY_NAMES[day]
    }


    const handleViewJournal = (journal: any) => {
        console.log("view")
        let jsonJournal = JSON.stringify(journal)
        localStorage.setItem("journalEntry", jsonJournal)

        history.replace({
            pathname: '/tabs/journalview',
            search: '?mode=view&id=' + journal.id,
            state: { detail: 'edit' }
        });
    }

    const handleCreateJournal = () => {
        console.log("create")
        history.replace({
            pathname: '/tabs/journaltextedit',
            search: '?mode=create',
            state: { detail: 'create' }
        });
    }

    /**
     * Streaks
     */
    const calculateStreaks = () => {
        let count = 0

        journals.forEach((el, i) => {
            if (!checkJournals()) {
                i++
            }

            if ((new Date().setUTCHours(0, 0, 0, 0) - new Date(el['timestamp']['_seconds'] * 1000).setUTCHours(0, 0, 0, 0)) === i * 86400000) {
                count++

            }

        })
        return count;
    }


    /** 
     * Get total number of journal entries
    */
    const getNoOfEntries = () => {
        return journals.length;
    }

    /**
     * Get total number of images
     */
    const getNoOfImg = () => {
        let count = 0
        journals.forEach((el, i) => {
            if (el['url']) count++
        })
        return count;
    }

    /**
     * Get emotion
     */
    const getEmotion = () => {
        let count = 0
        let percentage = 0;

        journals.forEach((el, i) => {
            if (el['sentiment']) {
                count = el['sentiment'] + count
            }
        })

        let avgRate = Math.round(count) / journals.length;
        console.log(avgRate)

        if (avgRate >= -1 && avgRate < -0.6) {
            percentage = 0
        } else if (avgRate >= -0.6 && avgRate < -0.2) {
            percentage = 20
        } else if (avgRate >= -0.2 && avgRate < 0.2) {
            percentage = 40
        } else if (avgRate >= 0.2 && avgRate < 0.6) {
            percentage = 60
        } else if (avgRate >= 0.6 && avgRate <= 1) {
            percentage = 100
        }

        return percentage + "%";

    }


    return (
        <IonPage>
            {/* <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader> */}
            <IonContent className="ioncontent" fullscreen>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard className='card1'>
                                <IonCardContent className='statusCardContent'>
                                    <IonGrid className='statusGrid'>
                                        <IonRow className='statusGrid'>
                                            <IonCol size='3'>
                                                <IonRow className="statusBox">
                                                    <IonCol className='statusimagesbackground' size='4'>
                                                        <IonImg className='statusimages' src={fire} />
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>{calculateStreaks()}</p>
                                                        <p className='statuslabels'>STREAKS</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow className="statusBox">
                                                    <IonCol size='6'>

                                                        <IonImg className='statusimages' src={journal} />
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>{getNoOfEntries()}</p>
                                                        <p className='statuslabels'>ENTRIES</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow className="statusBox">
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={images} />
                                                    </IonCol>
                                                    <IonCol size='6'>

                                                        <p className='statusvalues'>{getNoOfImg()}</p>
                                                        <p className='statuslabels'>IMAGES</p>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow className="statusBox">
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={happy} />
                                                    </IonCol>
                                                <IonCol size='6'>
                                                    <p className='statusvalues'>{getEmotion()}</p>
                                                    <p className='statuslabels'>HAPPY</p>
                                                </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                {/* <IonRow className="chooseDate">
                        <div>
                            <IonDatetimeButton className="dateTimeButton" datetime="datetime" slot="end"></IonDatetimeButton>
                        </div>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                id="datetime"
                                presentation="date"
                                showDefaultButtons={true}></IonDatetime>
                        </IonModal>
                    </IonRow> */}
                <IonRow className='type'>
                    <IonCol className="dayBackground" size='2'>
                        <IonCard className="day">
                            <IonCardSubtitle>DAY</IonCardSubtitle>
                        </IonCard>
                    </IonCol>
                    <IonCol className="entryBackground" size='3'>
                        <IonCard className="day">
                            <IonCardSubtitle>ENTRY</IonCardSubtitle>
                        </IonCard>
                    </IonCol>
                        <IonCol className="chooseDate" size='6'>
                        <div>
                            <IonDatetimeButton className="dateTimeButton" datetime="datetime" slot="end"></IonDatetimeButton>
                        </div>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                id="datetime"
                                presentation="date"
                                showDefaultButtons={true}></IonDatetime>
                        </IonModal>
                    </IonCol>
                    </IonRow>


                <IonRow className="entries">
                    <IonCol>

                        {

                            checkJournals() ?
                                <IonRow></IonRow> :
                                <IonRow onClick={() => handleCreateJournal()}>
                                    <IonCol className="entryDateDay" size='2'>
                                        <p className="entryDate">{current.getDate()} {MONTH_NAMES[current.getMonth()]}</p>
                                        <p className="entryDay">{DAY_NAMES[current.getDay()]}</p>
                                    </IonCol>
                                    <IonCol className="entryList" size='10'>
                                        <IonCard className="entryListCard">
                                            <IonCardContent>
                                                <IonCardSubtitle className="entryTitle">TITLE</IonCardSubtitle>

                                                <p className="entryText">Begin your day here...</p>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                        }


                        {journals.map(item => {
                            return (
                                <>
                                    <div>
                                        <IonRow onClick={() => handleViewJournal(item)}>
                                            <IonCol className="entryDateDay" size='2'>
                                                <p className="entryDate">{getJournalDate(item['timestamp'])}</p>
                                                <p className="entryDay">{getJournalDay(item['timestamp'])}</p>
                                            </IonCol>
                                            <IonCol className="entryList" size='10'>
                                                <IonCard className="entryListCard">
                                                    <IonCardContent>
                                                        <IonCardSubtitle className="entryTitle"> {item['title']} </IonCardSubtitle>
                                                        <p className="entryTime">{getJournalTime(item['timestamp'])} </p>
                                                        <p className="entryText">{item['body']}</p>
                                                        {item['url'] ?
                                                            <div > <img src={item['url']} /> </div> :
                                                            <div> </div>}

                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>
                                        </IonRow>
                                    </div>
                                </>
                            )
                        })}


                    </IonCol>
                </IonRow>

                {/* <IonButton expand="block">LOG OUT</IonButton> */}
                    
                </IonGrid>

            </IonContent >

        </IonPage >
    );
};

export default JournalOverview;