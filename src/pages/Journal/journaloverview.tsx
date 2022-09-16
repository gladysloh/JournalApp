import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from "react";

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

const JournalOverview: React.FC = () => {
    // const loadJournal = () => {
    //     getalljournal();
    // }
    
    // // This function will called only once
    // useEffect(() => {
    //     loadJournal();
    // }, [])

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
                    
                    <IonRow className="entries">
                        <IonCol>
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
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default JournalOverview;