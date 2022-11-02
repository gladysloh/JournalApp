import React, { useEffect, useRef, useState } from "react";
import { IonApp, IonButtons, IonCol, IonDatetime, IonGrid, IonMenuButton, IonModal, IonRow, useIonViewWillEnter } from "@ionic/react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import './Moodchart.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter } from '@ionic/react';
import axios from "axios";
import { useHistory } from "react-router";
import { MONTH_NAMES } from "../../SharedVariables";
import { getMonthlyMood, getWordCloud } from "../../services/MoodService";
import Wordcloud from "wordcloud";
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
let dataSource = {
  chart: {
    caption: "INSERT MONTH",
    theme: "fusion",
    "palettecolors": "f2726f",
    "showValues": "1"
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

  const canvasPosRef = useRef<HTMLCanvasElement>(null);
  const canvasNegRef = useRef<HTMLCanvasElement>(null);

  useIonViewWillEnter(() => {
    loadData(selectedMonth, selectedYear)
  });

  useEffect(() => {
    console.log(moods)
    getMoodChart()
    loadWordCloud()
    console.log('i fire once');
  }, [isLoad, canvasNegRef, canvasPosRef])

  const loadData = async (month: any, year: any) => {
    let body = {
      month: month,
      year: year
    }

    try {
      let result = await getMonthlyMood(body)
      console.log(result)
      setMoods(result.moods)
      setIsLoad(true)
    } catch (err: any) {
      //when user is unauthorized
      if (err.response.status === 401) {
        setIsLoad(true)
        history.replace("/login")
      }
    }
  }

  let sentimentarray: any = []
  let newmoodarray: any = []

  const getMoodChart = () => {
    sentimentarray = []
    moods.forEach((moodObj: any) => {
      sentimentarray.push(moodObj.sentiment)
    })

    newmoodarray = [0, 0, 0, 0, 0]
    //map each sentiment value in the sentiment array to the correct index in the monthlyMoods and store in newmoodsarray
    sentimentarray.forEach((item: any) => {
      if (item >= -1 && item < -0.6) {
        newmoodarray[0]++
      }
      else if (item >= -0.6 && item < -0.2) {
        newmoodarray[1]++
      }
      else if (item >= -0.2 && item < 0.2) {
        newmoodarray[2]++
      }
      else if (item >= 0.2 && item < 0.6) {
        newmoodarray[3]++
      }
      else {
        newmoodarray[4]++
      }
    })

    newmoodarray.forEach((item: any, i: any) => {
      updateMood(item, i)
    })

    dataSource.chart.caption = getJournalMonth()
    dataSource.data = monthlyMoods
  }



  function updateMood(val: number, i: any) {
    setMonthlyMoods((Mooo) => {
      Mooo[i].value = val
      return [...Mooo]
    })
  }

  const getUserDate = (value: any) => {
  
    let m =  new Date(value).getMonth()
    let y = new Date(value).getFullYear()
    setMonth(m)
    setYear(y)
    setIsLoad(false)
    loadData(m, y)
  }

  const getJournalMonth = () => {
    let date = selectedMonth
    return MONTH_NAMES[date];
  }

  const loadWordCloud = async () => {
    let body = {
      month: selectedMonth,
      year: selectedYear
    }

    let wordcloud = await getWordCloud(body)

    let positiveWC = canvasPosRef.current as HTMLCanvasElement
    let negativeWC = canvasNegRef.current as HTMLCanvasElement

    Wordcloud(positiveWC, {
      list: wordcloud.positive,
      shape: "circle",
      minRotation: 20,
      maxRotation: 90,
      minSize: 3,
      weightFactor: 10
    });

    Wordcloud(negativeWC, {
      list: wordcloud.negative,
      shape: "circle",
      minRotation: 20,
      maxRotation: 90,
      minSize: 2,
      weightFactor: 5
    });

    // console.log(wordcloud)
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
      <IonContent>
        <div className="chartButton">
          <IonButton expand="block" className="dateTimeButton" color="original" id="open-monthyear"> Select Month and Year </IonButton>
        </div>
        
        <IonModal keepContentsMounted={true} trigger="open-monthyear" class="filter-modal">
          <IonDatetime
            // value={currDate}
            id="datetime"
            presentation="month-year"
            showDefaultButtons={true} color="original"
            max={new Date().toISOString()}
            onIonChange={(val) => getUserDate(val.detail.value)}
            ></IonDatetime>
        </IonModal>
        <IonCard className="chart-card">
          <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
          <ReactFC className="chart-chart" {...chartConfigs} />
          <IonCardTitle className="chart-header">MOOD CHART </IonCardTitle>
        </IonCard>

        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol>
              <IonCard className="wordcloud-pos">
                <IonCardSubtitle> On your happier days.. </IonCardSubtitle>
                <div className="wordcloud-div">
                  <canvas ref={canvasPosRef} />
                </div>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard className="wordcloud-neg">
                <IonCardSubtitle> Some other days... </IonCardSubtitle>
                <div className="wordcloud-div">
                  <canvas ref={canvasNegRef} />
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )

};

export default Moodchart;
