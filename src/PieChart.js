import React, {useState,useEffect,useRef} from 'react';
//import React from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more'

import highcharts3d from 'highcharts/highcharts-3d'
// import Drilldown from 'highcharts/drilldown'
import drilldown from 'highcharts/modules/drilldown.js';
//import './PieChart.css'

import {series,drilldownSeries} from './BrowserData'
import _ from "lodash";

HC_more(Highcharts)
highcharts3d(Highcharts)
drilldown(Highcharts)

//name
//piechart-stacked (broken css grid stack attempt)

//highcharts exmaple drilldown pie
//https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/pie-drilldown

//highcharts 3D pie example
//https://jsfiddle.net/gspd2ua6/10/

//animated pie chart
//https://codepen.io/djtechnoo/pen/KKNNbGN
//https://www.highcharts.com/blog/tutorials/animation-with-highcharts-to-create-a-lottery-wheel/


function PieChart(props) {

	let chart = null;

  
  var offset = 180;

  //putting Firefox first means we'll measure what I consider 'backwards'
  //so need to reverse order of input elements. b/c 0 is the top of the pie,
  //I always add offset = starting point of 

 
  const [angle, setAngle] = useState(offset);
  //const [angle, setAngle] = useState(angleMap.IE);


  var sample_options = {
    credits: {enabled: false},
    chart: {
        type: 'pie',
         backgroundColor: 'rgba(0,0,0,0)',
        //backgroundColor: 'black',
        margin: [0,0,0,15],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        options3d: {
            enabled: true,
            alpha: 65,
            beta: 0
        }
    },
    title: {text: undefined},
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
			// allowPointSelect: true,
			// todo: don't think I'm seeing this shadow here
			shadow:true,
            startAngle:angle,
            cursor: 'pointer',
            depth: 55,
            size: '120%'
		},
		series: {
            allowPointSelect: true,
             dataLabels: {
                enabled: false,
                //distance:-30,
                format: '{point.name}'
            },
            point: {
                events: {
                    select: function () {
						console.log("chart event",chart);
                        // if (chart.chart.drilldownLevels.length > 0) {
						// 	chart.chart.drillUp();
						// }
                    }
                }
            }
        }
	},
	series: series,
	drilldown: drilldownSeries
}

	const elementRef = useRef();

// 	useEffect(() => {

// 		let angleMap = {
// 			Firefox:0 + offset,
// 			IE: .45 * 360 + offset
// 		  }
// 		console.log(angleMap);
 
// 		setTimeout(e =>{
// 		setAngle(angleMap['IE'])
// 		},2000)
//   },[]);
  

    const drillUp = () =>{
		//console.log("chart",chart.chart.series[0]);
		//if (chart.chart.drilldownLevels.length > 0) {
			// chart.chart.drillUp();
		///}

		//console.log(elementRef.current);
		elementRef.current.chart.drillUp()
	}

    
    const drillDown = () =>{
        console.log("drill",elementRef.current.chart.series);
        //todo: interacting with both of them below causes the series value above to change?
        //making whatever one comes 2nd fail. fucking weird

        //thing is I think I need to be able to manipulate the startAngle of each of these
        //independently, so not sure this is even the road to go down...
        
        elementRef.current.chart.series[0].data[1].doDrilldown(false);
        // setTimeout(e =>{
        //     elementRef.current.chart.series[1].data[1].doDrilldown(false);
        // },1000)
        
		//elementRef.current.chart.drillUp()
	}


	return(
		<div>
            {/* testing: restore */}
			<button style={{position:"relative",zIndex:50}} onClick={() =>{drillUp()}} >drillUp</button>
			<button style={{position:"relative",zIndex:50}} onClick={() =>{drillDown()}} >drillDown</button>
			
            <div >
				<HighchartsReact  ref={elementRef} highcharts={Highcharts}
                  allowChartUpdate={true}
                  options={sample_options} /> 
			</div>

	</div>)

}
export default PieChart;