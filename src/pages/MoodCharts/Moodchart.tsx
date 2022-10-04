import React, { useEffect, useState } from "react";
import { IonApp, useIonViewWillEnter } from "@ionic/react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import './Moodchart.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter } from '@ionic/react';
import axios from "axios";
import { useHistory } from "react-router";
import { MONTH_NAMES } from "../../SharedVariables";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const dataSource = {
  chart: {
    caption: "INSERT MONTH",
    theme: "fusion",
    "palettecolors": "f2726f",
    "showValues": "1",
    "numberSuffix": "%",


  },
  data: [
    { label: "😁", value: "10" },
    { label: "😭", value: "30" },
    { label: "😊", value: "40" },
    { label: "😂", value: "10" },
    { label: "😉", value: "10" },
  ]
};

const chartConfigs = {
  type: "column2d",
  width: 300,
  height: 350,
  dataFormat: "json",
  dataSource: dataSource
};

const Moodchart: React.FC = () => {
  const history = useHistory();
  const [moods, setMoods] = useState([]);

  useIonViewWillEnter(() => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    instance.get('/monthlymood').then((res) => {
      console.log(res.data);
      setMoods(res.data.moods)
    }).catch((err) => {
      console.error("ERROR: ", err);
      if (err.response.status == 401) history.replace("/login")

    })
  });

  useEffect(() => {
    console.log(moods)
    

  }, [moods])

  const getJournalMonth = () => {
    // return MONTH_NAMES[new Date(moods[0]['timestamp']['_seconds'] * 1000).getMonth()]

  }

  return (
    <IonPage> 
      <IonCard className="chart-card">
        <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
        <ReactFC className="chart-chart" {...chartConfigs} />
        <IonCardTitle className="chart-header">MOOD CHART </IonCardTitle>
      </IonCard>
    </IonPage>
  )

};

export default Moodchart;


