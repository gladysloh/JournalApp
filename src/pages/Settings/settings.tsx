import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToolbar,
    IonList,
    IonLabel, IonToggle, IonItemGroup, IonItemDivider, useIonAlert, useIonViewDidEnter, useIonLoading, useIonToast
} from '@ionic/react'
import { checkmarkCircle } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EditProfile } from '../../interfaces/UserInterface';
import { editProfile, getUserName } from '../../services/UserService';
import { SideMenu } from '../SideMenu/sidemenu';
import './settings.css';


const Settings: React.FC = () => {

    const [presentAlert] = useIonAlert();
    const history = useHistory();

    const [presentToast] = useIonToast();
    const toaster = (msg: any, icon: any) => {
        presentToast({
            message: msg,
            duration: 3000,
            position: 'bottom',
            cssClass: 'custom-toast',
            icon: icon
        });
    };

    const [displayName, setName] = useState("")
    const [isLoad, setIsLoad] = useState(false)


    useEffect(() => {
        getDisplayName()
    }, [isLoad])

    const getDisplayName = async () => {
        try {
            let result = await getUserName();
            setName(result.displayName)
            setIsLoad(true)
        } catch (err: any) {
            //when user is unauthorized
            if (err.response.status === 401) {
                history.replace("/login")
            } else {
                history.replace("/tabs/journaloverview")
            }
        }
    }

    const saveDisplayName = async (profileData: EditProfile) => {
        try {
            let result = await editProfile(profileData)
            if (result.success) {
                toaster("Successfully saved!", checkmarkCircle)
            } else {
                toaster("Error! Something went wrong.", checkmarkCircle)
            }
            setIsLoad(false)
        } catch (err: any) {
            toaster("Error! Unable to save. Try again later.", checkmarkCircle)
        }
    }


    const changeName = async () => {
        presentAlert({
            header: 'Change display name',
            buttons: [{
                text: "Save",
                handler: (value: any) => {
                    console.log("save: ", value.displayName)
                    if (value.displayName != '') {
                        let profileData: EditProfile = {
                            new_displayname: value.displayName
                        }
                        saveDisplayName(profileData)
                    }
                }
            },
            {
                text: "Cancel",
                role: 'cancel',
                handler: () => {
                    console.log("cancel")
                }
            }],
            inputs: [
                {
                    placeholder: displayName,
                    value: displayName,
                    name: "displayName"
                },
            ],

        })


    }




    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar class="custom-toolbar">
                    <IonButtons slot='start'>
                        <IonMenuButton color="medium"></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className="setting-list">
                    <IonItem button className="display-btn" onClick={() => { displayName != '' ? changeName() : "" }}>
                        <IonLabel>
                            Change display name
                        </IonLabel>
                    </IonItem>
                    {/* <IonItem>
                        <IonLabel>Enable passcode</IonLabel>
                        <IonToggle slot="end"></IonToggle>
                    </IonItem>
                    <IonItem button>
                        <IonLabel>
                            Passcode
                        </IonLabel>
                    </IonItem> */}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Settings;