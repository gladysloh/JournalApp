import {
  IonRow, IonContent, IonHeader, IonPage, IonTitle,
  IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter, IonCheckbox,
  useIonLoading, useIonToast
} from '@ionic/react';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { useForm, Controller } from 'react-hook-form';
import { useSetState } from 'react-use';

/** Design */
import moodlogo from "../../../theme/icons/output-onlinepngtools.png"
import logo from "../../../theme/icons/google.png"
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './signup.css';
import { AuthContext } from '../../../context/auth.context';


const SignUp: React.FC = () => {

  const initialState = {
    email: '',
    password: '',
    displayName: ''
  }

  const { state: ContextState, signUp } = useContext(AuthContext);
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

  const password = useRef({});
  password.current = watch("password", "");

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

  const [uid, setUserID] = useState();

  const onSubmit = async (e: any) => {

    const userDetails = {
      email: e.email,
      displayname: e.displayName,
      password: e.password
    }

    const userjson = JSON.stringify(userDetails)
    console.log(userjson)

    setState(userDetails);

    setLoading(true);
    present({
      message: 'Signing Up'
    })

    try {
      const response = await fetch('http://localhost:5001/onceaday-48fb7/us-central1/api/register', {
        method: 'POST',
        body: userjson,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        toaster("Error! Sign Up not successful", closeCircleOutline)
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));
      toaster("Signed up successfully", checkmarkCircleOutline)
      setData(result);

      // store the user in localStorage
      localStorage.setItem('oadUser', JSON.stringify(result))
      setUserID(result.uid)

      const { email, password, displayName } = state;
      signUp(email, password, displayName);
      setState({
        email: '',
        password: '',
        displayName: ''
      });

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
            <IonCardTitle className="acc-title">Sign Up</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="ion-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonItem className="form-field">
                <IonLabel className="name-label" position="stacked"> Display Name </IonLabel>
                <IonInput className="name-input"
                  defaultValue={initialState.displayName}
                  type="text"
                  {...register("displayName", {
                    required: "This is required",
                    validate: (value) => value.length > 1
                  })}

                ></IonInput>
                {errors.displayName && <span className='err'>Enter a display name</span>}
              </IonItem>

              <IonItem className="form-field">
                <IonLabel className="email-label" position="stacked"> Email </IonLabel>
                <IonInput className="email-input"
                  defaultValue={initialState.email}
                  type="email"
                  {...register("email", {
                    required: "This is required",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email address"
                    }
                  })}

                ></IonInput>
                {errors.email && <span className='err'>{errors.email.message}</span>}
              </IonItem>

              <IonItem className="form-field">
                <IonLabel position="stacked"> Password </IonLabel>
                <IonInput
                  type="password"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                    }
                  })}>
                </IonInput>
                {errors.password && <span className='err'>{errors.password.message}</span>}
              </IonItem>


              <IonItem className="form-field">
                <IonLabel position="stacked"> Re-enter Password </IonLabel>
                <IonInput
                  type="password"
                  {...register("password_repeat", {
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}>

                </IonInput>
                {errors.password_repeat && <span className='err'>{errors.password_repeat.message}</span>}
              </IonItem>


              <div>
                <IonButton className="login-button" expand="full" type="submit" color="primary"> Sign Up </IonButton>
                <IonRow className="ion-row3"> </IonRow>
                <IonButton className="google-button" expand="full" type="submit" color="secondary">
                  Sign up with <img src={logo} width="30px" />
                </IonButton>

                <IonFooter>Already have an account? Log In <NavLink to="/login"> here </NavLink>
                </IonFooter>
              </div>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;