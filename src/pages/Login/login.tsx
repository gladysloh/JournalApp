import { IonCheckbox,IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './login.css';
import logo from "../google.png"
import onceaday from"../onceaday.png"
import moodlogo from "../output-onlinepngtools.png"



const Login: React.FC = () => {

  function buttonfunc() {

    console.log("you have logged in")
    }
 

  return (
    <IonPage className = "ion-page">

      <IonHeader className =  "mood-logo" > <img src = {moodlogo} ></img> </IonHeader>

    <IonCard className = "ion-card" >
        <IonCardHeader>
        <IonCardTitle className = "title">Log In</IonCardTitle>
      </IonCardHeader>
    <IonCardContent className = "ion-content">
        <form>
         <IonItem className = "email-field">
            <IonLabel className = "email-label" position = "stacked"> Email </IonLabel>
            <IonInput className = "email-input" type="email"></IonInput>
         </IonItem>
         <IonRow className = "ion-row"> </IonRow>
         <IonItem className = "password-field">
            <IonLabel position = "stacked"> Password </IonLabel>
            <IonInput type="password"></IonInput>
         </IonItem>
         <IonRow className = "ion-row2"> </IonRow>
         <div>
            <IonButton className = "login-button" onClick = {buttonfunc} expand = "full" type = "submit" color = "primary">
                Login
            </IonButton>
            <IonRow className = "ion-row3"> </IonRow>
            <IonButton  className = "google-button" expand = "full" type = "submit" color = "secondary">
                Login with <img src = {logo} width = "30px"  />
            </IonButton>

            <IonItem lines = "none" color = "white">
          <IonLabel className = "rememberme" >Remember me </IonLabel>
      <IonCheckbox slot="start"></IonCheckbox>
      
    </IonItem>

            <IonFooter>Don't have an account? Sign up <a href = "../signup"> here </a>
                </IonFooter>
                </div>
             </form>
    </IonCardContent>
      </IonCard>
      </IonPage>
    )
}




export default Login;
