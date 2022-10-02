import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonLoading,
  useIonViewWillEnter
} from '@ionic/react';

import React, { useEffect, useContext } from "react";

import { AuthContext } from './context/auth.context.js';

import { IonReactRouter } from '@ionic/react-router';
import { addCircle, addCircleOutline, home, homeOutline, notifications, notificationsOutline, person, personOutline, search, searchOutline } from 'ionicons/icons';


/** Pages */
import CardExamples from './pages/tutorial/CardExamples';
import InputExamples from './pages/tutorial/InputExamples';
import SegmentExamples from './pages/tutorial/SegmentExamples';
import TextAreaExamples from './pages/tutorial/TextAreaExamples';
import { SlideExample } from './pages/tutorial/Slides';

import JournalTextView from './components/JournalTextView'
import JournalView from './components/JournalView';
import JournalImageView from './components/JournalImageView'

import JournalText from './pages/Journal/journaltext'
import JournalImage from './pages/Journal/journalimage'
import JournalOverview from './pages/Journal/journaloverview';
import JournalGenerateMood from './pages/Journal/journalgeneratemood';
import JournalMood from './pages/Journal/journalmood';
import Question from './pages/Journal/question';

import Loading from './pages/Loading/loading';

// import Tab1 from './pages/Journal/Tab1';
import Mood_Calendar from './pages/Calendar/Mood_Calendar';
import MoodChart from './pages/MoodCharts/Moodchart';

import Login from './pages/Account/Login/login';
import SignUp from './pages/Account/SignUp/signup';
import WelcomeSlides from './components/WelcomeSlides';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/floating-tab-bar.css';
import { useState } from 'react';
import TabRoot from './pages/TabRoot';
import axios from 'axios';


setupIonicReact();

const App: React.FC = () => {

  let userDetails = JSON.parse(localStorage.getItem("user"))
  console.log(userDetails)

  const [userStatus, setUserStatus]= useState(false);

  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
  })

  instance.get('/getuser').then((res) => {
    console.log(res);
    setUserStatus(true)

   
  }).catch((err) => {
    console.error("ERROR: ", err);
    setUserStatus(false)
    
  })

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/signup" component={SignUp} exact={true}/>
          <Route path="/tabs" component={TabRoot} exact={true}/>
          <Route path="/tabs" render={() => { return userStatus ? <TabRoot /> : <Login /> }} />
          <Route path="/" render={() => { return userStatus ? <TabRoot /> : <Login /> }} exact={true} />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}
export default App;