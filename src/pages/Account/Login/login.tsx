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

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import ReactDOM from "react-dom";
import { useSetState } from 'react-use';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../../context/auth.context';
import { Link, NavLink, Redirect, Route } from 'react-router-dom';

import JournalOverview from '../../Journal/journaloverview';


const Login: React.FC = () => {

  const initialState = {
    email: '',
    password: ''
  }

  const { state: ContextState, login } = useContext(AuthContext);

  const {
    isLoginPending,
    isLoggedIn,
    loginError
  } = ContextState;

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

    try {
      const response = await fetch('http://localhost:5001/onceaday-48fb7/us-central1/api/login', {
        method: 'POST',
        body: userjson,
        credentials: 'include',
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
      console.log(JSON.stringify(result.uid))
      setData(result);

      // store the user in localStorage
      localStorage.setItem('user', JSON.stringify(result))
      setUserID(result.uid)

      const { email, password } = state;
      login(email, password);
      setState({
        email: '',
        password: ''
      });

      goToJournals()

    } catch (err: any) {
      console.log(err.message)
      setError(err.message);
    } finally {
      dismiss();
      setLoading(false);
    }
  };

  const goToJournals = () => {
    console.log("going journals")
    return (
      <IonRouterOutlet> <Route render={()=><Redirect to='/tabs/journaloverview' />} /> </IonRouterOutlet>
    )
  }

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
                {errors.email && <span className='err'>{errors.email.message}</span>}
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

                <IonButton className="google-button" expand="full" type="submit" color="secondary">
                  Login with <img src={logo} width="30px" />
                </IonButton>

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
