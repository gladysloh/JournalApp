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

import Tab1 from './pages/Journal/Tab1';
import Tab2 from './pages/Calendar/Tab2';
import Tab3 from './pages/MoodCharts/Tab3';

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

setupIonicReact();

const isAuthenticated = false;

const App: React.FC = () => {

  const tabs = [

    {
      name: "Journal",
      url: "/journal",
      activeIcon: diary,
      icon: diary,
      component: Tab1
    },
    {
      name: "Calendar",
      url: "/calendar",
      activeIcon: calendar,
      icon: calendar,
      component: Tab2
    },
    {
      name: "MoodCharts",
      url: "/moodcharts",
      activeIcon: chart,
      icon: chart,
      component: Tab3
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

              <Route exact path="/">
                <Redirect to="/journal" />
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