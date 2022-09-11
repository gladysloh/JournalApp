import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './journaloverview.css';

import fire from '../../theme/icons/fire.png';
import journal from '../../theme/icons/journal.png';
import images from '../../theme/icons/images.png';
import happy from '../../theme/icons/happy.png';
import text from '../../theme/icons/text.png';
import image from '../../theme/icons/image.png';
import clock from '../../theme/icons/clock.png';

const JournalOverview: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ioncontent" fullscreen>
                <IonCard className='card1'>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonImg className='statusimages' src={fire} />
                                    <p className='statuslabels'>STREAKS</p>
                                </IonCol>
                                <IonCol>
                                    <IonImg className='statusimages' src={journal} />
                                    <p className='statuslabels'>ENTRIES</p>
                                </IonCol>
                                <IonCol>
                                    <IonImg className='statusimages' src={images} />
                                    <p className='statuslabels'>IMAGES</p>
                                </IonCol>
                                <IonCol>
                                    <IonImg className='statusimages' src={happy} />
                                    <p className='statuslabels'>HAPPY</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
                <IonCard className='card2'>
                    <IonItem lines="none">

                    </IonItem>
                </IonCard>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard className="day">
                                <IonCardSubtitle>DAY</IonCardSubtitle>
                            </IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard className="day">
                                <IonCardSubtitle>ENTRY</IonCardSubtitle>
                            </IonCard>
                        </IonCol>
                        <IonCol>
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
                                <IonCol className="entryDateDay" size='3'>
                                    <p className="entryDate">21 JAN</p>
                                    <p className="entryDay">MONDAY</p>
                                </IonCol>
                                <IonCol>
                                    <IonCard>
                                        <IonCardContent>
                                            <IonCardSubtitle className="entryTitle">TITLE</IonCardSubtitle>
                                            <p className="entryTime">00:00</p>
                                            <p className="entryText">Begin your day here...</p>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="entryDateDay" size='3'>
                                    <p className="entryDate">20 JAN</p>
                                    <p className="entryDay">SUNDAY</p>
                                </IonCol>
                                <IonCol>
                                    <IonCard>
                                        <IonCardContent>
                                            <IonCardSubtitle className="entryTitle">TITLE</IonCardSubtitle>
                                            <p className="entryTime">00:00</p>
                                            <p className="entryText">Begin your day here...</p>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="entryDateDay" size='3'>
                                    <p className="entryDate">19 JAN</p>
                                    <p className="entryDay">SATURDAY</p>
                                </IonCol>
                                <IonCol>
                                    <IonCard>
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