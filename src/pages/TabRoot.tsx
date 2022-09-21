import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar
} from '@ionic/react';
/** Pages */
import CardExamples from './tutorial/CardExamples';
import InputExamples from './tutorial/InputExamples';
import SegmentExamples from './tutorial/SegmentExamples';
import TextAreaExamples from './tutorial/TextAreaExamples';
import { SlideExample } from './tutorial/Slides';

import JournalTextView from '../components/JournalTextView'
import JournalView from '../components/JournalView';
import JournalImageView from '../components/JournalImageView'

import JournalText from './Journal/journaltext'
import JournalImage from './Journal/journalimage'
import JournalOverview from './Journal/journaloverview';
import JournalGenerateMood from './Journal/journalgeneratemood';
import JournalMood from './Journal/journalmood';
import Question from './Journal/question';

import Loading from './Loading/loading';

// import Tab1 from './Journal/Tab1';
import Mood_Calendar from './Calendar/Mood_Calendar';
import MoodChart from './MoodCharts/Moodchart';

import Login from './Account/Login/login';
import SignUp from './Account/SignUp/signup';
import WelcomeSlides from '../components/WelcomeSlides';
import { IonReactRouter } from '@ionic/react-router';

/** Tab bar icons */
import calendar from '../theme/icons/calendar.svg'
import diary from '../theme/icons/diary.svg';
import chart from '../theme/icons/chart.svg'

const TabRoot: React.FC = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route exact path="/">
                <Redirect to="/tabs/journaloverview" />
            </Route>
            <Route exact path="/tabs/journaloverview">
                <JournalOverview />
            </Route>
            <Route exact path="/tabs/calendar">
                <Mood_Calendar />
            </Route>
            <Route path="/tabs/moodcharts">
                <MoodChart />
            </Route>
            <Route path="/journaltext">
                <JournalText />
            </Route>
            <Route path="/journalimage">
                <JournalImage />
            </Route>
            <Route path="/journaltextview">
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
            <Route path="/tabs" render={() => <Redirect to="/tabs/journaloverview" />} exact={true} />
            <Route path="/" render={() => <Redirect to="/tabs/journaloverview" />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
            <IonTabButton tab="journaloverview" href="/tabs/journaloverview">
                <IonIcon icon={diary} />
            </IonTabButton>
            <IonTabButton tab="calendar" href="/tabs/calendar">
                <IonIcon icon={calendar} />
                {/* <IonLabel>Tab 2</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab="moodchart" href="/tabs/moodchart">
                <IonIcon icon={chart} />
                {/* <IonLabel>Tab 3</IonLabel> */}
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default TabRoot;
