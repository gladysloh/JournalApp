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
    IonToolbar 
} from '@ionic/react'

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
            </IonContent>
        </IonPage>
    )
}

export default Settings;