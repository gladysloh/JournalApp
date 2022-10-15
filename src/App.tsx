import { Redirect, Route, Switch } from 'react-router-dom';
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
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton, IonSplitPane
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
import JournalOverview from './pages/Journal/journaloverview';
import { SideMenu } from './pages/SideMenu/sidemenu';
import Example from './components/LockScreen/lockscreen';
import { getUserName } from './services/UserService';

setupIonicReact();

const App: React.FC = () => {
  const [userStatus, setUserStatus] = useState(false);

  const checkUser = async () => {
    let result = await getUserName()

    if(result.displayname){
      setUserStatus(true)
    }else{
      setUserStatus(false)
    }

  }


  useEffect(() => {
    checkUser()
  }, [userStatus])


  return (
    // <IonApp>
    //   <IonReactRouter >
    //     <SideMenu />
    //     <IonRouterOutlet>
    //       <Route path="/login" component={Login} exact={true} />
    //       <Route path="/signup" component={SignUp} exact={true} />
    //       <Route path="/tabs" component={TabRoot} exact={true} />
    //       <Route path="/tabs/journaloverview" component={JournalOverview} exact={true} />

    //       <Route path="/tabs" render={() => { return userStatus ? <TabRoot /> : <Login /> }} />
    //       <Route path="/" render={() => { return userStatus ? <TabRoot /> : <Login /> }} exact={true} />
    //       {userStatus ? <TabRoot /> : <Redirect to="/login" />}

    //       <Route path="/lockscreen" component={Example} />

    //     </IonRouterOutlet>
    //   </IonReactRouter>
    // </IonApp>

    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main" when="(min-width: 20000px)">
          <SideMenu />
          <IonRouterOutlet id="main">
              <Route path="/login" component={Login} exact={true} />
              <Route path="/signup" component={SignUp} exact={true} />
              <Route path="/welcome" component={WelcomeSlides
              } exact={true} />
              <Route path="/tabs" component={TabRoot} exact={true} />
              <Route path="/tabs/journaloverview" component={JournalOverview} exact={true} />

              <Route path="/tabs" render={() => { return userStatus ? <TabRoot /> : <Login /> }} />
              <Route path="/" render={() => { return userStatus ? <TabRoot /> : <Login /> }} exact={true} />
   
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}
export default App;