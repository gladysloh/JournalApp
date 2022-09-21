import React from "react";
import { IonApp } from "@ionic/react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import './Moodchart.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonInput, IonFooter } from '@ionic/react';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const dataSource = {
  chart: {
    caption: "INSERT MONTH",
    theme: "fusion",
    "palettecolors":"f2726f",
    "showValues" : "1",
    "numberSuffix":"%",
   
    
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
const Moodchart : React.FC = () => (
  <IonPage>
    <IonCard className = "chart-card">
      <IonCardTitle className="chart-header">MONTHLY</IonCardTitle>
    <ReactFC className = "chart-chart" {...chartConfigs}/>
    <IonCardTitle className = "chart-header">MOOD CHART </IonCardTitle>
    </IonCard>
  </IonPage>
);

export default Moodchart;


