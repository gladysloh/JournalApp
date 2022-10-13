import React, { useEffect, useRef, useState } from "react";
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
import monthlymood from "../../server/functions/routes/monthlymood";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
let dataSource = {
  chart: {
    caption: "INSERT MONTH",
    theme: "fusion",
    "palettecolors": "f2726f",
    "showValues": "1",
    "numberSuffix": "%",
  },
  data: [{}]
};

let chartConfigs = {
  type: "column2d",
  width: 300,
  height: 350,
  dataFormat: "json",
  dataSource: dataSource
};

const Moodchart: React.FC = () => {

  const initialMonthlyMood = [
    { label: "😭", value: 0 },
    { label: "😔", value: 0 },
    { label: "😕", value: 0 },
    { label: "😊", value: 0 },
    { label: "😄", value: 0 },
  ]

  const history = useHistory();
  const [moods, setMoods] = useState([]);
  const [monthlyMoods, setMonthlyMoods] = useState(initialMonthlyMood)
  const [isLoad, setIsLoad] = useState(false)
  const [selectedMonth, setMonth] = useState(new Date().getMonth())
  const [selectedYear, setYear] = useState(new Date().getFullYear())

  useIonViewWillEnter(() => {
    
    loadData()
  });

  useEffect(() => {
    console.log(moods)
    setMonthlyMoods(initialMonthlyMood)
    getMoodChart()
  }, [isLoad])

  const loadData = () =>{
    const instance = axios.create({
      withCredentials: true,
      baseURL: 'http://localhost:5001/onceaday-48fb7/us-central1/api'
    })

    let body = {
      month: selectedMonth,
      year: selectedYear
    }

    instance.post('/monthlymood', body).then((res) => {
      console.log(res);
      setMoods(res.data.moods)
      setIsLoad(true)

    }).catch((err) => {
      console.error("ERROR: ", err);
      if (err.response.status == 401) history.replace("/login")
    })
  }

  const getMoodChart = () => {
    moods.forEach((j: any) => {
      let sentiment = j['sentiment']
      console.log(sentiment)

      if (sentiment >= -1 && sentiment < -0.6) {
        updateMood(0)
      } else if (sentiment >= -0.6 && sentiment < -0.2) {
        updateMood(1)
      } else if (sentiment >= -0.2 && sentiment < 0.2) {
        updateMood(2)
      } else if (sentiment >= 0.2 && sentiment < 0.6) {
        updateMood(3)
      } else if (sentiment >= 0.6 && sentiment <= 1) {
        updateMood(4)
      }
    })
    dataSource.chart.caption = getJournalMonth()
    dataSource.data = monthlyMoods

    console.log(monthlyMoods)
  }

  const updateMood = (id: any) => {
    console.log(id)
    setMonthlyMoods(
      monthlyMoods.map((item, i) => {
        let value = item.value++;
        if (i === id) {
          return { ...item, value: value };
        } else {
          return item;
        }
      })
    );
  };

  const getJournalMonth = () => {
    let date = new Date().getMonth()
    return MONTH_NAMES[date];
  }

  return (
    <IonPage>
      <IonContent>
        <IonCard className="chart-card">
          <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
          <ReactFC className="chart-chart" {...chartConfigs} />
          <IonCardTitle className="chart-header">MOOD CHART </IonCardTitle>
        </IonCard>
      </IonContent>
    </IonPage>
  )

};

export default Moodchart;


