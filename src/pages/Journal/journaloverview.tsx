import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonLoading, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
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

/** SERVER */
import getalljournal from '../../server/functions/routes/getalljournal'
import { Redirect } from 'react-router-dom';
import { getMonth } from 'date-fns';

const JournalOverview: React.FC = () => {
    // const loadJournal = () => {
    //     getalljournal();
    // }

    // // This function will called only once
    // useEffect(() => {
    //     loadJournal();
    // }, [])
    const [present, dismiss] = useIonLoading();

    const current = new Date();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // const user = localStorage.getItem("oadUser") || '';
    // const userString = JSON.parse(user).uid;
    const [items, setItems] = useState([]);
    const [cookies, setCookies] = useCookies(['connect.sid']);


    useIonViewDidEnter(() => {
        axios.get('http://localhost:5001/onceaday-48fb7/us-central1/api/getuser').then((res)=>{
            console.log(res);
            setCookies('connect.sid', res.data.token)
            console.log(res.data.token) 
        })
        // fetch('http://localhost:5001/onceaday-48fb7/us-central1/api/getuser', {
        //     credentials: 'same-origin'
        //   })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json)
        //         setItems(json);
        //     })
    });


    const handleEditJournal = (userid) => {
        return <Redirect
            to={{
                pathname: "/journal",
                //   foo: userid

            }}
        />
    }

    const handleAddEntry = (userid) => {
        return <Redirect
            to={{
                pathname: "/journal",
                //   foo: userid

            }}
        />
    }
    return (
        <IonPage>
            <IonContent className="ioncontent" fullscreen>

                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard className='card1'>
                                <IonCardContent>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size='3'>
                                                <IonRow>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>22</p>
                                                        <p className='statuslabels'>STREAKS</p>
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={fire} />
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>150</p>
                                                        <p className='statuslabels'>ENTRIES</p>
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={journal} />
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>55</p>
                                                        <p className='statuslabels'>IMAGES</p>
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={images} />
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                            <IonCol size='3'>
                                                <IonRow>
                                                    <IonCol size='6'>
                                                        <p className='statusvalues'>76%</p>
                                                        <p className='statuslabels'>HAPPY</p>
                                                    </IonCol>
                                                    <IonCol size='6'>
                                                        <IonImg className='statusimages' src={happy} />
                                                    </IonCol>
                                                </IonRow>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                    <IonRow className="chooseDate">
                        <div>
                            <IonDatetimeButton className="dateTimeButton" datetime="datetime" slot="end"></IonDatetimeButton>
                        </div>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                id="datetime"
                                presentation="date"
                                showDefaultButtons={true}></IonDatetime>
                        </IonModal>
                    </IonRow>
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
                        <IonCol className="inputTypeBackground" size='6'>
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

                    <IonRow className="entries" onClick={handleEditJournal}>
                        <IonCol>
                            <IonRow>
                                <IonCol className="entryDateDay" size='2'>
                                    <p className="entryDate">{current.getDate()} {monthNames[current.getMonth()]}</p>
                                    <p className="entryDay">{dayNames[current.getDay()]}</p>
                                </IonCol>
                                <IonCol className="entryList" size='10'>
                                    <IonCard className="entryListCard">
                                        <IonCardContent>
                                            <IonCardSubtitle className="entryTitle">TITLE</IonCardSubtitle>
                                            <p className="entryTime">00:00</p>
                                            <p className="entryText">Begin your day here...</p>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>

                            {items.map(item => {
                                return (
                                    <IonRow>
                                        <IonCol className="entryDateDay" size='2'>
                                            <p className="entryDate">21 JAN</p>
                                            <p className="entryDay">MONDAY</p>
                                        </IonCol>
                                        <IonCol className="entryList" size='10'>
                                            <IonCard className="entryListCard">
                                                <IonCardContent>
                                                    <IonCardSubtitle className="entryTitle">TITLE</IonCardSubtitle>
                                                    <p className="entryTime">00:00</p>
                                                    <p className="entryText">Begin your day here...</p>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                )
                            })}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default JournalOverview;