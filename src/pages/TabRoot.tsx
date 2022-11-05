import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonIcon,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';

import JournalView from './Journal/JournalView';
import JournalOverview from './Journal/journaloverview';
import JournalMood from './Journal/journalmood';

import Loading from './Loading/loading';
import Mood_Calendar from './Calendar/Mood_Calendar';
import MoodChart from './MoodCharts/Moodchart';

/** Tab bar icons */
import calendar from '../theme/icons/calendar.svg'
import diary from '../theme/icons/diary.svg';
import chart from '../theme/icons/chart.svg'
import JournalTextEdit from './Journal/JournalTextEdit';
import { SideMenu } from './SideMenu/sidemenu';
import Settings from './Settings/settings';
import { settingsOutline } from 'ionicons/icons';


const TabRoot: React.FC = () => (
    <IonTabs>
        
        <IonRouterOutlet>
            <Route path="/sidemenu">
                <SideMenu />
            </Route>
            <Route exact path="/sidemenu/settings">
                <Settings />
            </Route>
            
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
            <Route path="/tabs/journaltextedit">
                <JournalTextEdit />
            </Route>
            <Route exact path="/tabs/journalview">
                <JournalView />
            </Route>
            <Route exact path="/tabs/journalmood">
                <JournalMood />
            </Route>
            <Route exact path="/tabs/loading">
                <Loading />
            </Route>
            {/* <Route exact path="/tabs/cardexamples">
                <CardExamples />
            </Route>
            <Route exact path="/tabs/inputexamples">
                <InputExamples />
            </Route>
            <Route exact path="/tabs/segmentexamples">
                <SegmentExamples />
            </Route>
            <Route exact path="/tabs/textareaexamples">
                <TextAreaExamples />
            </Route>
            <Route exact path="/tabs/slideexamples">
                <SlideExample />
            </Route> */}
            <Route exact path="/tabs/settings">
                <Settings />
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
            </IonTabButton>
            <IonTabButton tab="moodchart" href="/tabs/moodcharts">
                <IonIcon icon={chart} />
            </IonTabButton>

            {/* <IonTabButton tab="settings" href="/tabs/settings">
                <IonIcon icon={settingsOutline} />
            </IonTabButton> */}
        </IonTabBar>
    </IonTabs>
);

export default TabRoot;
