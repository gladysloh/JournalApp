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
  const [isLoad, setIsLoad] = useState(false)

  // const [moods, setMoods] = useState<any>([]);
  const [monthlyMoods, setMonthlyMoods] = useState(initialMonthlyMood)

  const [selectedMonth, setMonth] = useState(new Date().getMonth())
  const [selectedYear, setYear] = useState(new Date().getFullYear())

  const canvasPosRef = useRef<HTMLCanvasElement>(null);
  const canvasNegRef = useRef<HTMLCanvasElement>(null);

  const [arrMoods, setArrMoods] = useState<any>([]);

  const [curBtn, setCurBtn] = useState(1);

  const [active, setActive] = useState();
  const handleBtnClick = (event: any) => {
    event.preventDefault();
    setActive(event.target.id);
  }

  useIonViewWillEnter(() => {
    getLastMonths(1)
    loadWordCloud(selectedMonth, selectedYear)

  });

  useEffect(() => {
    getMoodChart()
    loadWordCloud(selectedMonth, selectedYear)
    console.log('i fire once');

    console.log(arrMoods)
    // console.log(wordArr)
  }, [isLoad, canvasNegRef, canvasPosRef])


  /**
   * Get moods for the month and year
   * @param month 
   * @param year 
   */
  const getMonthlyMoods = async (month: any, year: any) => {
    let body = {
      month: month,
      year: year
    }

    try {
      let result = await getMonthlyMood(body)

      console.log(result)
      return result.moods

    } catch (err: any) {
      console.log(err)

      //when user is unauthorized
      if (err.response.status === 401) {
        setIsLoad(true)
        history.replace("/login")
      }
      return null
    }
  }

  let sentimentarray: any = []
  let newmoodarray: any = []

  /**
   * Format sentiment data to fit chart
   */
  const getMoodChart = () => {
    sentimentarray = []
    arrMoods.forEach((moodObj: any) => {
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

    dataSource.chart.caption = getTitle()
    dataSource.data = monthlyMoods
  }

  /**
   * Set the mood values
   * @param val 
   * @param i 
   */
  function updateMood(val: number, i: any) {
    setMonthlyMoods((Mooo) => {
      Mooo[i].value = val
      return [...Mooo]
    })
  }

  /**
   * Format date to month and year object
   * Returning mood data
   * @param value 
   */
  const getUserDate = (value: any) => {
    let m = new Date(value).getMonth()
    let y = new Date(value).getFullYear()
    setMonth(m)
    setYear(y)

    setIsLoad(false)
    return getMonthlyMoods(m, y)
  }

  /**
   * Get name of Month
   */
  const getJournalMonth = () => {
    let date = selectedMonth
    return MONTH_NAMES[date];
  }

  /**
   * Get title of chart
   */
  const getTitle = () => {
    if (curBtn == 3) {
      return "Last 3 Months"
    } else if (curBtn == 6) {
      return "Last 6 Months"
    }
    return getJournalMonth()
  }

  /**
   * Get word cloud by month and year
   * @param month 
   * @param year 
   */
  const loadWordCloud = async (month: any, year: any) => {
    let body = {
      month: month,
      year: year
    }

    try {
      let wordcloud = await getWordCloud(body)
      return wordcloud
    } catch (err: any) {
      console.log(err)
      if (err.response.status === 401) {
        setIsLoad(true)
        history.replace("/login")
      }
    }
    // console.log(wordcloud)
  }

  /**
   * Set data for wordcloud 
   * @param wc 
   */
  const setWordCloud = (wc: any) => {
    let positiveWC = canvasPosRef.current as HTMLCanvasElement
    let negativeWC = canvasNegRef.current as HTMLCanvasElement

    Wordcloud(positiveWC, {
      list: wc.positive,
      shape: "circle",
      minRotation: 20,
      maxRotation: 90,
      minSize: 3,
      weightFactor: 10
    });

    Wordcloud(negativeWC, {
      list: wc.negative,
      shape: "circle",
      minRotation: 20,
      maxRotation: 90,
      minSize: 2,
      weightFactor: 5
    });
  }

  /**
   * Get data for duration
   * @param count 
   */
  const getLastMonths = async (count: number) => {
    console.log(count)
    setCurBtn(count)

    let moodArr: any = []
    let wordArr: any = {
      positive: [],
      negative: []
    }

    for (let i = 0; i < count; i++) {
      let newDate = new Date()
      newDate.setMonth(newDate.getMonth() - i)

      let moodRes = await getUserDate(newDate);
      let wordRes = await loadWordCloud(newDate.getMonth(), newDate.getFullYear())

      moodArr.push(...moodRes)
      wordArr.positive.push(...wordRes.positive)
      wordArr.negative.push(...wordRes.negative)
    }

    setArrMoods(moodArr)
    setWordCloud(wordArr)
    setIsLoad(true)
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
          <IonButton expand="block"
            onClick={(e) => { getLastMonths(6)}}
            className={curBtn === 6 ? "chartHistoryBtn chartHistoryBtnActive" : "chartHistoryBtn "}> Last 6 months </IonButton>
          <IonButton expand="block" className={curBtn === 3 ? " chartHistoryBtn chartHistoryBtnActive" : "chartHistoryBtn "} onClick={() => { getLastMonths(3)}}> Last 3 months </IonButton>
          <IonButton expand="block" className={curBtn === 1 ? "chartHistoryBtn chartHistoryBtnActive" : "chartHistoryBtn "} onClick={() => { getLastMonths(1)}}> This Month </IonButton>
          {/* <IonButton expand="block" className="dateTimeButton" color="original" id="open-monthyear"> Select month/year </IonButton> */}
        </div>

        {
          isLoad ?
            <IonCard className="chart-card">
              <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
              <ReactFC className="chart-chart" {...chartConfigs} />

              <IonCardTitle className="chart-header">MOOD CHART </IonCardTitle>
            </IonCard>
            :
            <div className="loader-container">
              <div className="lds-dual-ring"></div>
            </div>
        }
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
