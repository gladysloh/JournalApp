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
import { ellipse, square, triangle } from 'ionicons/icons';

import Tab1 from './pages/Journal/Tab1';
import Tab2 from './pages/Calendar/Tab2';
import Tab3 from './pages/MoodCharts/Tab3';

import Login from './pages/Login/login';
import Signup from './pages/Login/login';

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

setupIonicReact();

const isAuthenticated = false;

const App: React.FC = () => {
const authInfo = false;

  // useEffect(() => {
  //   !authInfo?.initialized && (async () => await initialize())();
  // },[authInfo, initialize]);

  if (authInfo) {
    return (
      <IonApp>
        <IonLoading isOpen={false} /> //change back to true
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <>
          {authInfo ? (
            <IonReactRouter>
              <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/tab1">
                  <Tab1 />
                </Route>
                <Route exact path="/tab2">
                  <Tab2 />
                </Route>
                <Route path="/tab3">
                  <Tab3 />
                </Route>
                <Route exact path="/">
                  <Redirect to="/tab1" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={triangle} />
                  <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
            </IonReactRouter>
          ) : (
            <IonReactRouter>
              <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect from="/" to="/login" exact />
            </IonReactRouter>
          )}
        </>
      </IonApp>
    );
  }
};

export default App;