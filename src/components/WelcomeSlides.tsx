import React, { useContext } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import './WelcomeSlides.css'
import moodlogo from "../theme/icons/output-onlinepngtools.png"
// import { AuthContext } from '../context/auth.context';

const WelcomeSlides: React.FC = () => {
    // const value = useContext(AuthContext);

    const user = localStorage.getItem("userDetails") || '';
    const displayName = JSON.parse(user).displayname;

    return (
        <IonPage>
            <IonContent>
                <div className="outer-div">
                    <div className="inner-div">
                        <img src={moodlogo}/>
                        <h1 className="welcome"> Welcome, {displayName} </h1>
                        <IonButton expand="block" color="dark">Start Journaling</IonButton>

                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default WelcomeSlides;