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
  IonLoading
} from '@ionic/react';


import React, { useEffect } from "react";

import { IonReactRouter } from '@ionic/react-router';
import { addCircle, addCircleOutline, home, homeOutline, notifications, notificationsOutline, person, personOutline, search, searchOutline } from 'ionicons/icons';

import JournalOverview from './pages/Journal/journaloverview';
import JournalText from './pages/Journal/journaltext';
import JournalImage from './pages/Journal/journalimage';
import JournalTextView from './components/JournalTextView';
import JournalImageView from './components/JournalImageView';
import Calendar from './pages/Calendar/calendar';
import Moodcharts from './pages/MoodCharts/moodcharts';
import Loading from './pages/Loading/loading';

import Login from './pages/Login/login';
import Signup from './pages/SignUp/signup';

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

import calendar from './theme/icons/calendar.svg';
import diary from './theme/icons/diary.svg';
import chart from './theme/icons/chart.svg'

import CardExamples from './pages/tutorial/CardExamples';
import InputExamples from './pages/tutorial/InputExamples';
import SegmentExamples from './pages/tutorial/SegmentExamples';
import TextAreaExamples from './pages/tutorial/TextAreaExamples';
import { SlideExample } from './pages/tutorial/Slides';
import JournalView from './components/JournalView';
import JournalGenerateMood from './pages/Journal/journalgeneratemood';
import JournalMood from './pages/Journal/journalmood';
import Question from './pages/Journal/question';

setupIonicReact();

const isAuthenticated = false;

const App: React.FC = () => {

  const tabs = [

    {
      name: "JournalOveview",
      url: "/journaloverview",
      activeIcon: diary,
      icon: diary,
      component: JournalOverview
    },
    {
      name: "Calendar",
      url: "/calendar",
      activeIcon: calendar,
      icon: calendar,
      component: Calendar
    },
    {
      name: "MoodCharts",
      url: "/moodcharts",
      activeIcon: chart,
      icon: chart,
      component: Moodcharts
    }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  
  if (isAuthenticated) { //remove ! to view home pages OR add ! to see login/signup
    return (
      <IonReactRouter>
        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect from="/" to="/login" exact />
      </IonReactRouter>
    )
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>
            <IonRouterOutlet>

              {tabs.map((tab, index) => {

                return (

                  <Route key={index} exact path={tab.url}>
                    <tab.component />
                  </Route>
                );
              })}
              <Route exact path="/journaltext">
                <JournalText />
              </Route>
              <Route exact path="/journalimage">
                <JournalImage />
              </Route>
              <Route exact path="/journaltextview">
                <JournalTextView />
              </Route>
              <Route exact path="/journalimageview">
                <JournalImageView />
              </Route>
              <Route exact path="/journalview">
                <JournalView />
              </Route>
              <Route exact path="/question">
                <Question />
              </Route>
              <Route exact path="/journalgeneratemood">
                <JournalGenerateMood />
              </Route>
              <Route exact path="/journalmood">
                <JournalMood />
              </Route>
              
              <Route exact path="/loading">
                <Loading />
              </Route>
              <Route exact path="/cardexamples">
                <CardExamples />              
              </Route>
              <Route exact path="/inputexamples">
                <InputExamples />              
              </Route>
              <Route exact path="/segmentexamples">
                <SegmentExamples />              
              </Route>
              <Route exact path="/textareaexamples">
                <TextAreaExamples />              
              </Route>
              <Route exact path="/slideexamples">
                <SlideExample />              
              </Route>
              <Route exact path="/">
                <Redirect to="/journaloverview" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              {tabs.map((tab, barIndex) => {

                const active = tab.name === activeTab;

                return (

                  <IonTabButton key={`tab_${barIndex}`} tab={tab.name} href={tab.url}>
                    <IonIcon icon={active ? tab.activeIcon : tab.icon} />
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  }

};
export default App;