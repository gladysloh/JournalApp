import React, { useEffect, useState } from 'react';
import { IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter, useIonViewDidEnter, useIonViewWillEnter, IonButtons, IonMenuButton } from '@ionic/react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
//import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views, EventPropGetter } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Mood_Calendar.css";
import logo from "../google.png"
import axios from 'axios';
import { useHistory } from 'react-router';
import { secondsToMilliseconds } from 'date-fns/esm';
import { getMonthlyMood } from '../../services/MoodService';


function Mood_Calendar() {

  const locales = {
    'en-us': require("date-fns/locale/en-us"),
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const initialState = [{
    title: '',
    start: new Date(0),
    end: new Date(0)
  }]
  const [events, setEvents] = useState(initialState)
  const [isEvent, setIsEvent] = useState(false)

  const history = useHistory();

  const [selectedMonth, setMonth] = useState(new Date().getMonth())
  const [selectedYear, setYear] = useState(new Date().getFullYear())

  const [moods, setMood] = useState([])


  useIonViewWillEnter(() => {
    getMood(selectedMonth, selectedYear)
  });

  const getMood = async (month: any, year:any) =>{
    let body = {
      month: month,
      year: year
    }

    console.log(body)

    let result = await getMonthlyMood(body)
    console.log(result)
    setMood(result.moods)
    setIsEvent(true)
  }

  useEffect(()=>{
    setEvents(initialState)
    moods.forEach((el, i) => {
      let title = getEmotion(el['sentiment']).emoji
      let start = getJournalDate(el['timestamp'])
      let end = getJournalDate(el['timestamp'])
      console.log({title: title, start: start, end: end })
      setEvents(events => [...events, {title: title, start: start, end: end }])
    })

    console.log(events)
  }, [isEvent] )


  const getEmotion = (sentiment: any) => {
    if (sentiment >= -1 && sentiment < -0.6) {
      return { name: 'Very Sad', emoji: '😭' }
    } else if (sentiment >= -0.6 && sentiment < -0.2) {
      return { name: 'Sad', emoji: '😔' }
    } else if (sentiment >= -0.2 && sentiment < 0.2) {
      return { name: 'Neutral', emoji: '😐' }
    } else if (sentiment >= 0.2 && sentiment < 0.6) {
      return { name: 'Happy', emoji: '😊' }
    } else if (sentiment >= 0.6 && sentiment <= 1) {
      return { name: 'Elated', emoji: '😄' }
    }

    return { name: 'Elated', emoji: '😄' }
  }

  const getJournalDate = (timestamp: any) => {
    let seconds = timestamp._seconds;
    const date = new Date(seconds * 1000)
    return date;
  }

  const getSelected = (month: Date) =>{
    let currDate = month.getMonth()
    let currYear = month.getFullYear()

    setMonth(currDate)
    setYear(currYear)
    getMood(currDate, currYear)
    setIsEvent(false)

  }


  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar class="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton auto-hide="false" color="medium"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="calendar-card">
          <IonCardTitle className="chart-header">MOOD TRACKER</IonCardTitle>
          <Calendar className="calendar-class"
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end" views={['month']}
            style={{ height: 350, width: 320, margin: "0px" }}
            onNavigate={(month)=>getSelected(month)}

            eventPropGetter={(event, start, end, isSelected) => ({
              event,
              start,
              end,
              isSelected,
              style: { backgroundColor: "white" }
            })}
          />
          <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
        </IonCard>
      </IonContent>

    </IonPage>
  )
}

export default Mood_Calendar;


