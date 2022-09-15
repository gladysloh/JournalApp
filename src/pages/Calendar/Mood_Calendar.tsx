import React from 'react';       
import { IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter } from '@ionic/react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
//import React, { useState } from "react";
import { Calendar, dateFnsLocalizer,Views,EventPropGetter } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Mood_Calendar.css";
import logo from "../google.png"


function Mood_Calendar(){

    const locales = {
        'en-us': require("date-fns/locale/en-us"),
      }

   // Views:{month:false}

 
      const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
      })





  const events = [
    {
    title:"..😁",
    start:new Date(2022,8,3),
    end:new Date(2022,8,3),
    },

    {
      title:"..😁",
      start:new Date(2022,8,4),
      end:new Date(2022,8,4),
      },

      {
          title:"..😁",
          start:new Date(2022,8,5),
          end:new Date(2022,8,5),
          },

          {
              title:"..{logo}",
              start:new Date(2022,8,6),
              end:new Date(2022,8,6),
              },

              {
                  title:"..😁",
                  start:new Date(2022,8,7),
                  end:new Date(2022,8,7),
                  },
                  {
                      title:"..😁",
                      start:new Date(2022,8,8),
                      end:new Date(2022,8,8),
                      },

]    






  return(
      <IonPage>
  <IonCard className = "calendar-card">
     <IonCardTitle className="chart-header">MOOD TRACKER</IonCardTitle>
      <Calendar className = "calendar-class" 
      localizer = {localizer} 
      events = {events} 
      startAccessor = "start" 
      endAccessor= "end" views = {['month']} 
      style = {{height:350,width:320,margin:"0px" }}

      eventPropGetter={(event, start, end, isSelected) => ({
        event,
        start,
        end,
        isSelected,
        style: { backgroundColor: "white" }})}

     
      
      />
      <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
   </IonCard>
    </IonPage>
  )
}

export default Mood_Calendar;

