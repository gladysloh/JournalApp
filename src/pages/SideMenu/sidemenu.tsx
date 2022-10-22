import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from 'react-router-dom';

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
    IonToolbar, 
    useIonViewDidEnter
} from '@ionic/react'
import { settingsOutline, logOutOutline } from 'ionicons/icons'
import Settings from "../Settings/settings";
import './sidemenu.css'
import { getUserName } from "../../services/UserService";
import { useCookies } from "react-cookie";
import { instanceOf } from 'prop-types';

export const SideMenu = () => {

    const [displayName, setDisplayName] = useState()

    useEffect(()=>{
        checkUser()
    }, [displayName])

    const checkUser = async () => {
        try{
            let result = await getUserName()
            console.log(result)
        
            if(result.displayname){
              setDisplayName(result.displayname) 
            }
        }catch(err:any){
            console.log(err)
        }
        
    
    }
    const [cookies, setCookie, removeCookie] = useCookies();
    const history = useHistory()
    const logout = () => {
        removeCookie("auth_token", {path:"/"});
        history.replace('/login')
        // return false;
    }

    return (
        <IonMenu side='start' contentId='main'>
            <IonContent className="menuIonContent">
                <div className="menuHeaderBackground">
                    <IonItem color="none" lines="none" className="titleHeader">
                        <IonLabel className="menuTitleLabel">Hello,</IonLabel>
                    </IonItem>
                    <IonItem color="none" lines="none" className="subtitleHeader">
                        <IonLabel className="menuSubtitleLabel">{displayName}</IonLabel>
                    </IonItem>
                </div>
                <IonCard className="menuCard">
                    <IonList className="backgroundTransparent">
                        {/* <IonMenuToggle auto-hide='true'>
                            <IonItem className="menuItem" color="none" lines="none" button routerLink={"/tabs/settings"} routerDirection="none">
                                <IonIcon className="menuIcon" icon={settingsOutline}></IonIcon>
                                <IonLabel className="menuLabel">Settings</IonLabel>
                            </IonItem>
                        </IonMenuToggle> */}
                        <IonMenuToggle auto-hide='true'>
                            <IonItem className="menuItem" color="none" lines="none" button onClick={()=>logout()} routerDirection="none">
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

