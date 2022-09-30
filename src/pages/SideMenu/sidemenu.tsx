import React from "react";
import { Redirect, Route } from 'react-router-dom';

import { 
    IonCard,
    IonCardSubtitle,
    IonContent,
    IonHeader, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonMenu, 
    IonMenuToggle, 
    IonPage, 
    IonRouterOutlet, 
    IonSplitPane, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react'
import { settingsOutline, logOutOutline } from 'ionicons/icons'
import Settings from "../Settings/settings";
import './sidemenu.css'

export const SideMenu = () => {

    return (
        <IonMenu side='start' contentId='main'>
            <IonContent className="menuIonContent">
                <div className="menuHeaderBackground">
                    <IonItem color="none" lines="none" className="titleHeader">
                        <IonLabel className="menuTitleLabel">Hello,</IonLabel>
                    </IonItem>
                    <IonItem color="none" lines="none" className="subtitleHeader">
                        <IonLabel className="menuSubtitleLabel">Choi</IonLabel>
                    </IonItem>
                </div>
                <IonCard className="menuCard">
                    <IonList className="backgroundTransparent">
                        <IonMenuToggle auto-hide='true'>
                            <IonItem className="menuItem" color="none" lines="none" button routerLink={"/sidemenu/settings"} routerDirection="none">
                                <IonIcon className="menuIcon" icon={settingsOutline}></IonIcon>
                                <IonLabel className="menuLabel">Settings</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle auto-hide='true'>
                            <IonItem className="menuItem" color="none" lines="none" button routerLink={"/logout"} routerDirection="none">
                                <IonIcon className="menuIcon" icon={logOutOutline}></IonIcon>
                                <IonLabel className="menuLabel">Log out</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonMenu>
           
    )
}

