import React from 'react'
import logo from "../theme/imgs/chart.png"
import mood from "../theme/imgs/emojis.png"
import man from "../theme/imgs/man.png"
import "./WelcomeSlides.css"
import { IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter, IonGrid } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { useHistory } from 'react-router-dom'

const WelcomeSlides: React.FC = () => {
    const history = useHistory();

    const goToOverview = () =>{
        history.replace('/tabs/journaloverview')
    }
    return (
        <IonPage>
            <IonContent>
                <Swiper
                    modules={[Navigation, EffectFade]}
                    slidesPerView={1}
                    speed={500}
                    navigation
                    effect={'fade'}
                    loop
                    className='myswiper' >
                    <SwiperSlide className="slide">
                        <IonCard className='slidecard'>
                                <IonCardHeader>
                                    <IonCardTitle>Write about your day</IonCardTitle>
                                    <IonCardSubtitle>Take a moment to think about your day, pen down your thoughts and reflect about both the positives and negatives.</IonCardSubtitle>
                                </IonCardHeader>

                                <IonCardContent className="slide1cc">
                                    <img src={man} />
                                </IonCardContent>
                                <IonButton color="danger" expand="block" onClick={()=> goToOverview()}>Skip</IonButton>
                        </IonCard>

                    </SwiperSlide>

                    <SwiperSlide className="slide">

                        <IonCard className='slidecard'>
                            <IonCardHeader>
                                <IonCardTitle>Tell us how you feel</IonCardTitle>
                                <IonCardSubtitle>After reflecting on the events of your day, select a mood to show us how you feel </IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent className="slide1cc">
                                <img src={mood} />
                            </IonCardContent>
                            <IonButton color="danger" expand="block" onClick={()=> goToOverview()}>Skip</IonButton>
                        </IonCard>

                    </SwiperSlide>

                    <SwiperSlide className="slide">
                        <IonCard className='slidecard'>
                            <IonCardHeader>
                                <IonCardTitle>Keep track of your Mood</IonCardTitle>
                                <IonCardSubtitle>Track how your mood fluctuates over time and gain key insights on how various events affect your how you feel</IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent className="slide1cc">
                                <img src={logo} />
                            </IonCardContent>
                            <IonButton expand="block" color="danger" onClick={()=> goToOverview()}>Start Journaling</IonButton>
                        </IonCard>
                    </SwiperSlide>

                </Swiper>


            </IonContent>
        </IonPage>
    )
};
export default WelcomeSlides;