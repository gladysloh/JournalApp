import {
  IonCheckbox, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel,
  IonButton, IonInput, IonFooter, useIonLoading, useIonToast, IonRouterOutlet
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

    const userDetails = {
      email: e.email,
      password: e.password
    }
    const userjson = JSON.stringify(userDetails)

    setState(userDetails);

    setLoading(true);
    present({
      message: 'Logging In'
    })

    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    instance.post('/login', userDetails).then((res) => {
      console.log(res);
      dismiss();
      setLoading(false);
      setIsRedirect(true)
      localStorage.setItem('user', JSON.stringify(res.data))
      history.push("/tabs/journaloverview")
      setState(initialState);
    }).catch((err) => {
      toaster("Error! Something went wrong", closeCircleOutline)
      dismiss();
      setLoading(false);
      console.error("ERROR: ", err.response);
    })

  };

  useEffect(() => {
    if (isRedirect) {
      history.replace("/tabs/journaloverview");
    }

  }, [isRedirect, history])

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
