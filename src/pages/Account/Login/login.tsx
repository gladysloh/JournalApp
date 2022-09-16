import { IonCheckbox, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter, useIonLoading, useIonToast} from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './login.css';
import logo from "../../../theme/icons/google.png"
import onceaday from "../../../theme/icons/onceaday.png"
import moodlogo from "../../../theme/icons/output-onlinepngtools.png"
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

import React, { useState, useRef } from 'react';
import ReactDOM from "react-dom";
import { useForm, Controller } from 'react-hook-form';

const Login: React.FC = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm(
    {mode: "onBlur"}
  );

  const[data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [error, setError] = useState(null);

  const [presentToast] = useIonToast();
  
  const toaster = (msg, icon) => {
    presentToast({
      message: msg,
      duration: 1500,
      position: 'bottom',
      cssClass: 'custom-toast',
      icon: icon
    });
  };

  const onSubmit = async (e) => {
    const userDetails = JSON.stringify({
        email: e.email,
        password: e.password
      })

      console.log(userDetails)

    setLoading(true);
    present({
      message: 'Logging In'
    })

    try {
      const response = await fetch('http://localhost:5001/onceaday-48fb7/us-central1/api/login', {
        method: 'POST',
        body: userDetails,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        toaster("Error! Login failed", closeCircleOutline)
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {

      console.log(err.message)
      setError(err.message);
    } finally {
      dismiss();
      setLoading(false);
    }
  };

  return (
    <IonPage>

      <IonHeader className="ion-no-border" > 
        <div className="logo-div">
          <img src={moodlogo} className="mood-logo"></img> 
        </div>
         
      </IonHeader>

<IonContent>
      <IonCard className="ion-card" >
        <IonCardHeader>
          <IonCardTitle className="acc-title">Log In</IonCardTitle>
        </IonCardHeader>

        <IonCardContent className="ion-content">

          <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem className="email-field">
              <IonLabel className="email-label" position="stacked"> Email </IonLabel>
              <IonInput className="email-input" type="email" {...register("email", {
                  required: "This is required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address"
                  }
                })}
                ></IonInput>
                {errors.email && <span className='err'>{errors.email.message}</span>}
            </IonItem>

            <IonItem className="password-field">
              <IonLabel position="stacked"> Password </IonLabel>
              <IonInput type="password" {...register("password",{
                  required: "You must specify a password"
                })}></IonInput>
                {errors.password && <span className='err'>Enter your password</span>}
            </IonItem>

            <div>
            {/* {error && (<span className='err'> Invalid email or password </span>)} */}
              <IonButton className="login-button" expand="full" type="submit" color="primary">
                Login
            </IonButton>

              <IonButton className="google-button" expand="full" type="submit" color="secondary">
                Login with <img src={logo} width="30px" />
              </IonButton>

              <IonItem lines="none" color="white">
                <IonLabel className="rememberme" >Remember me </IonLabel>
                <IonCheckbox slot="start"></IonCheckbox>

              </IonItem>

              <IonFooter>Don't have an account? Sign up <a href="../signup"> here </a>
              </IonFooter>
            </div>
          </form>
          
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  )
}




export default Login;
