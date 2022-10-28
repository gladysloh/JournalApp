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
    IonLabel, IonToggle, IonItemGroup, IonItemDivider
} from '@ionic/react'
import React from 'react';

const Settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar class="custom-toolbar">
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem button>
                        <IonLabel>
                            Change display name
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Enable passcode</IonLabel>
                        <IonToggle slot="end"></IonToggle>
                    </IonItem>
                    <IonItem button>
                        <IonLabel>
                            Passcode
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Settings;