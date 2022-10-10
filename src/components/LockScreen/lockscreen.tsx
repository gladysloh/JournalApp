import React, { useState, useRef } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid, IonRow, IonCol
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import './lockscreen.css'

function Example() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton id="open-modal" expand="block">
          Open
        </IonButton>
        <p>{message}</p>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)} id="lockscreen-modal" backdropDismiss={false}>
          <IonHeader>
            <IonToolbar>
              {/* <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons> */}
              <IonTitle>Enter your passcode</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding ">
            <div className="lockscreen-content">
            <IonGrid class="passcode-grid">
              <IonRow>
                <IonCol size="4">
                  <div>
                    <p>1</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>2</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>3</p>
                  </div>
                </IonCol>

              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <div>
                    <p>4</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>5</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>6</p>
                  </div>
                </IonCol>

              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <div>
                    <p>7</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>8</p>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div>
                    <p>9</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default Example;