import {
  IonCheckbox, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel,
  IonButton, IonInput, IonFooter, useIonLoading, useIonToast, IonRouterOutlet, useIonAlert
} from '@ionic/react';
// import ExploreContainer from '../../components/ExploreContainer';
import './login.css';
import logo from "../../../theme/icons/google.png"
import onceaday from "../../../theme/icons/onceaday.png"
import moodlogo from "../../../theme/icons/output-onlinepngtools.png"
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import { useSetState } from 'react-use';
import { useForm, Controller } from 'react-hook-form';

import { NavLink, useHistory } from 'react-router-dom';

import JournalOverview from '../../Journal/journaloverview';
import axios from 'axios';
import { LoginDetails } from '../../../interfaces/UserInterface';
import { loginUser } from '../../../services/UserService';



const Login: React.FC = () => {
  const history = useHistory();

  const initialState = {
    email: '',
    password: ''
  }

  const [state, setState] = useSetState(initialState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm(
    { mode: "onBlur" }
  );

  const [data, setData] = useState(null);
  const [isRedirect, setIsRedirect] = useState(false)
  const [loading, setLoading] = useState(false);
  const [present, dismiss] = useIonLoading();
  const [error, setError] = useState(null);
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const toaster = (msg: any, icon: any) => {
    presentToast({
      message: msg,
      duration: 1500,
      position: 'bottom',
      cssClass: 'custom-toast',
      icon: icon
    });
  };

  const [uid, setUserID] = useState([]);

  const onSubmit = async (e: any) => {

    const userDetails: LoginDetails = {
      email: e.email,
      password: e.password
    }

    setState(userDetails);

    setLoading(true);
    present({
      message: 'Logging In'
    })

    loginUser(userDetails).then((result: any) => {
      console.log(result);
      dismiss();
      setLoading(false);
      setIsRedirect(true)

      toaster("Logged in successfully", checkmarkCircleOutline)
      // history.push("/tabs/journaloverview");
      history.go(0); //refresh
      setState(initialState);
    }).catch((err: any) => {
      console.log(err)
      if (err.response.status != 404 && err.response.data) {
        getErrorCode(err.response.data.error.code)
      }
      toaster("Error! Something went wrong", closeCircleOutline)
      dismiss();
      setLoading(false);
      console.error("ERROR: ", err.response);
    })

    // try {
    //   let result = await loginUser(userDetails).


    //   console.log(result);
    //   dismiss();
    //   setLoading(false);
    //   setIsRedirect(true)

    //   toaster("Logged in successfully", checkmarkCircleOutline)
    //   history.push("/tabs/journaloverview");
    //   // history.go(0); //refresh
    //   setState(initialState);
    // } catch (err: any) {
    //   console.log(err)
    //   if (err.response.status!=404 && err.response.data) {
    //     getErrorCode(err.response.data.error.code)
    //   }
    //   toaster("Error! Something went wrong", closeCircleOutline)
    //   dismiss();
    //   setLoading(false);
    //   console.error("ERROR: ", err.response);
    // }

  };

  const getErrorCode = (err: any) => {
    console.log(err)
    if (err == 'auth/user-not-found') {
      errorAlert("User is not found")
    } else if (err == 'auth/wrong-password') {
      errorAlert("Wrong password")
    }
  }

  const errorAlert = (msg: string) => {
    presentAlert({
      header: 'Error!',
      subHeader: 'Login not successful',
      message: msg,
      buttons: ['OK'],
    })

  }

  useEffect(() => {
    console.log(isRedirect)
    if (isRedirect) {
      history.replace("/tabs/journaloverview");
    }

  }, [isRedirect])

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
                })} value={state.email}
                ></IonInput>
                {errors.email && <span className='err'> Invalid email address </span>}
              </IonItem>

              <IonItem className="password-field">
                <IonLabel position="stacked"> Password </IonLabel>
                <IonInput type="password" {...register("password", {
                  required: "You must specify a password"
                })} value={state.password}
                ></IonInput>
                {errors.password && <span className='err'>Enter your password</span>}
              </IonItem>

              <div>
                {/* {error && (<span className='err'> Invalid email or password </span>)} */}
                <IonButton className="login-button" expand="full" type="submit" color="primary">
                  Login
            </IonButton>

                {/* <IonButton className="google-button" expand="full" color="secondary">
                  Login with <img src={logo} width="30px" />
                </IonButton> */}

                <IonItem lines="none" color="white">
                  <IonLabel className="rememberme" >Remember me </IonLabel>
                  <IonCheckbox slot="start"></IonCheckbox>

                </IonItem>

                <IonFooter>Don't have an account? Sign up <NavLink to="/signup"> here </NavLink>
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
