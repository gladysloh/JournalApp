import React, { useState, useRef, useEffect } from 'react';
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonSearchbar, IonDatetimeButton, IonDatetime
} from '@ionic/react';

import { OverlayEventDetail } from '@ionic/core/components';
import "./DateFilterModal.css"

const DateFilterModal = ({ selectChoice }: any) => {
    const modal = useRef<HTMLIonModalElement>(null);

    const [choice, setChoice] = useState()

    const [userDate, setUserDate] = useState('')
    const [isUserDate, setIsUserDate] = useState(false)

    const getUserDate = (date: any) => {
        console.log(date)
        setUserDate(date)
        setIsUserDate(true)
    }

    useEffect(() => {
        // selectChoice(userDate)
        if (choice === "today") {
            selectChoice({ choice: 'today', value: new Date().toISOString() })
            modal.current?.dismiss();
        } else if (choice === "date" && isUserDate) {
            selectChoice({ choice: 'date', value: userDate })
            modal.current?.dismiss();
        } else if (choice == "monthyear" && isUserDate) {
            selectChoice({ choice: 'monthyear', value: userDate })
            modal.current?.dismiss();
        }

    }, [userDate, choice])

    const getUserChoice = (choice: any) => {
        console.log(choice)
        setChoice(choice)
    }

    return (
        <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25]}>
            <IonContent className="ion-padding">
                {/* <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.75)} placeholder="Search"></IonSearchbar> */}
                <IonButton expand="block" className="dateTimeButton" onClick={() => getUserChoice("today")} color="original">Today</IonButton>

                <IonButton expand="block" className="dateTimeButton" onClick={() => getUserChoice("date")} color="original" id="open-date">By Date</IonButton>
                {/* <IonDatetimeButton className="dateTimeButton" datetime="datetime" color="original">By Date</IonDatetimeButton> */}
                <IonModal keepContentsMounted={true} trigger="open-date" class="filter-modal">
                    <IonDatetime
                        // value={currDate}
                        id="datetime"
                        presentation="date"
                        showDefaultButtons={true} color="original" onIonChange={(val) => getUserDate(val.detail.value)}
                        max={new Date().toISOString()}></IonDatetime>
                </IonModal>

                <IonButton expand="block" className="dateTimeButton" onClick={() => getUserChoice("monthyear")} color="original" id="open-monthyear">By Month/Year</IonButton>
                <IonModal keepContentsMounted={true} trigger="open-monthyear" class="filter-modal">
                    <IonDatetime
                        // value={currDate}
                        id="datetime"
                        presentation="month-year"
                        showDefaultButtons={true} color="original" onIonChange={(val) => getUserDate(val.detail.value)}
                        max={new Date().toISOString()}></IonDatetime>
                </IonModal>


            </IonContent>
        </IonModal>
    )
};


export default DateFilterModal