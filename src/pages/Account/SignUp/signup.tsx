import {
  IonRow, IonContent, IonHeader, IonPage, IonTitle,
  IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter, IonCheckbox,
  useIonLoading, useIonToast
} from '@ionic/react';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { useForm, Controller } from 'react-hook-form';
import { useSetState } from 'react-use';

/** Design */
import moodlogo from "../../../theme/icons/output-onlinepngtools.png"
import logo from "../../../theme/icons/google.png"
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './signup.css';
import axios from 'axios';


const SignUp: React.FC = () => {
  const history = useHistory();
  const initialState = {
    email: '',
    password: '',
    displayName: ''
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

  const password = useRef({});
  password.current = watch("password", "");

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

  const [uid, setUserID] = useState();

  const onSubmit = async (e: any) => {

    const userDetails = {
      email: e.email,
      displayName: e.displayName,
      password: e.password
    }

    const userjson = JSON.stringify(userDetails)
    console.log(userjson)

    setState(userDetails);

    setLoading(true);
    present({
      message: 'Signing Up'
    })

    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    instance.post('/register', userDetails).then((res) => {
      console.log(res);
      dismiss();
      setLoading(false);
      setIsRedirect(true)
      localStorage.setItem('user', JSON.stringify(res.data))
      toaster("Signed up successfully", checkmarkCircleOutline)
      
      history.replace("/tabs/login")

      setState(initialState);
    }).catch((err) => {
      toaster("Error! Sign Up not successful", closeCircleOutline)
      dismiss();
      setLoading(false);
      console.error("ERROR: ", err.response);
    })

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
                {errors.email && <span className='err'>Invalid email address</span>}
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
                {errors.password && <span className='err'> Password must have at least 8 characters </span>}
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
                {errors.password_repeat && <span className='err'> Passwords do not match </span>}
              </IonItem>


              <div>
                <IonButton className="login-button" expand="full" type="submit" color="primary"> Sign Up </IonButton>
                <IonRow className="ion-row3"> </IonRow>
                {/* <IonButton className="google-button" expand="full" type="submit" color="secondary">
                  Sign up with <img src={logo} width="30px" />
                </IonButton> */}

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
