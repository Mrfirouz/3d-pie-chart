import "./styles.css";
import React, {useState,useEffect} from 'react';
//import React from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more'

import highcharts3d from 'highcharts/highcharts-3d'
import PieChart from './PieChart'
import './testGrid.css'

import './PieChart.css'

import samplePieData from './data'
import _ from "lodash";

HC_more(Highcharts)
highcharts3d(Highcharts)

//source (why the fuck do I still use this shit library that doesn't work in react)
//https://jsfiddle.net/gspd2ua6/10/


const App = () =>{

  return (

      <div><PieChart/></div>
    
    
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
