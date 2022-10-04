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
<<<<<<< HEAD
  useIonViewWillEnter
=======
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton
>>>>>>> origin/frontend
} from '@ionic/react';

import React, { useEffect, useContext } from "react";

// import { AuthContext } from './context/auth.context.js';

import { IonReactRouter } from '@ionic/react-router';

/** Pages */
import Login from './pages/Account/Login/login';
import SignUp from './pages/Account/SignUp/signup';
import WelcomeSlides from './components/WelcomeSlides';
import TabRoot from './pages/TabRoot';

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
import axios from 'axios';
import JournalGenerateMood from './pages/Journal/journalgeneratemood';
import JournalOverview from './pages/Journal/journaloverview';


<<<<<<< HEAD
=======
import CardExamples from './pages/tutorial/CardExamples';
import InputExamples from './pages/tutorial/InputExamples';
import SegmentExamples from './pages/tutorial/SegmentExamples';
import TextAreaExamples from './pages/tutorial/TextAreaExamples';
import { SlideExample } from './pages/tutorial/Slides';
import JournalView from './components/JournalView';
import JournalGenerateMood from './pages/Journal/journalgeneratemood';
import JournalMood from './pages/Journal/journalmood';
import Question from './pages/Journal/question';
import { SideMenu } from './pages/SideMenu/sidemenu';
import Settings from './pages/Settings/settings';
>>>>>>> origin/frontend

setupIonicReact();

const App: React.FC = () => {
  const [userStatus, setUserStatus] = useState(false);

  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
  })

  instance.get('/getuser').then((res) => {
    console.log(res);
    setUserStatus(true)
  })
  .catch((err) => {
    console.error("ERROR: ", err);
    setUserStatus(false)

  })


  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/signup" component={SignUp} exact={true} />
          <Route path="/tabs" component={TabRoot} exact={true} />
          <Route path="/tabs/journaloverview" component={JournalOverview} exact={true} />

          <Route path="/tabs" render={() => { return userStatus ? <TabRoot /> : <Login /> }} />
          <Route path="/" render={() => { return userStatus ? <TabRoot /> : <Login /> }} exact={true} />

        </IonRouterOutlet>
      </IonReactRouter>
<<<<<<< HEAD
    </IonApp>
  )
}
=======
    )
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          <SideMenu />
          <IonTabs onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>
            <IonRouterOutlet id='main'>

              {tabs.map((tab, index) => {

                return (

                  <Route key={index} exact path={tab.url}>
                    <tab.component />
                  </Route>
                );
              })}

              <Route path="/sidemenu">
                <SideMenu />
              </Route>
              <Route exact path ="/sidemenu/settings">
                <Settings />
              </Route>
              <Route exact path="/journaloverview">
                <JournalOverview />
              </Route>
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
>>>>>>> origin/frontend
export default App;