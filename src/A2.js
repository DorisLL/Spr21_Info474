import React from "react";
import { useFetch } from "./hooks/useFetch";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { count, extent, max, min } from "d3-array";
import { selectAll } from 'd3-selection';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function A2() {
  const width = 1000;
  const height = 500;
  const margin = 20;
  const axisTextAlignmentFactor = 3;
  const size = 500;

  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/education.csv"
  )
  console.log("from hook", loading, data);
  const filterChina = data[(FilterCriteriaChina)];
  const filterUSA = data[(FilterCriteriaUSA)];
  return (
    <div>
      <h1>Assignment 2: Exploratory Data Analysis</h1>
      <p>{loading && "Loading Data!"} </p>
      <ul>
        <li>Data: The World Bank Data, 1960-2017
          <ul>
            <li>The World Bank has tracked global human development by indicators education.</li>
            <li>URL: https://github.com/ZeningQu/World-Bank-Data-by-Indicators </li>
          </ul>
        </li>
      </ul>

      {/* Adolescents out of school (% of lower secondary school age) */}
      <h3>Q1: Trends of Adolescents out of school rate (% of lower secondary school age) over time</h3>
      <h4>Especially for East Asia and Pacific area</h4>
      <p>The first topic is related to the adolescents out of school rate. Especially for East Asia and Pacific area. From the red lines we are able to see the trend that the rate is going down over time, which is great and implying that education has been considered as more inmportant. </p>
      <svg 
        width={width} // 1000
        height={height}  // 500
        style={{ border: "1px solid black" }}>
        
        <line
          x1={width / 2 - 10}
          y1={height - margin - 100}
          x2={width / 2 - 5}
          y2={height - margin - 100}
          stroke={"black"}
        />
        <text
          x={width/2 - 200}
          // textAnchor="end"
          y={margin}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >Trends of Adolescents out of school rate over time</text>
        <text
          x={margin + 20}
          textAnchor="end"
          y={height - margin- 10 }
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >1960</text>

        <text
          x={margin + (2017- 1960 + 1)*(width - 6*margin)/(2017-1960 + 1) + 15}
          textAnchor="end"
          y={height - margin - 10}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >2017</text>

        {data.map((data, index) => {
          const highlight = data["Country Name"] === "East Asia & Pacific";
            return (
            <line 
              key={index} 
              x1 = {margin + (data["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960)} 
              y1 = {height - 3*margin - 15*data['Adolescents out of school (% of lower secondary school age)']}
              x2 = {margin + (data["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960 + 1) + 15}
              y2 = {height - 3*margin - 15*data['Adolescents out of school (% of lower secondary school age)']}
              stroke={highlight? "red": "steelblue"}
              strokeOpacity={highlight? 1: "0.2"}>
            </line>
            )
        })}
      </svg>


        {/* Secondary education, teachers*/}
        {/* Secondary education, teachers, female */}
        <h3>Q2: Number of teachers for secondary education for China from 1960 - 2017</h3>
        <p> The second topic is related to the number of teachers for secondary education for China over time. It shows an increase of teachers. From the trend, I may say that education is in public considered as important and more and more people have it as occupation.</p>
        <svg 
          width={width} // 1000
          height={height}  // 500
          style={{ border: "1px solid black" }}>
          <text
          x={width/2 - 200}
          textAnchor="end"
          y={margin}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >Number of Teachers for Secondary Education in China from 1960 - 2017</text>
          <text
          x={150}
          y={height - 0.5*margin}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >1960</text>

        <text
          x={930}
          textAnchor="end"
          y={height - 0.5* margin}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >2017</text>
        {data.map((filterChina, index) => {
          
          return (
            <rect transform='rotate(180)'
              key={index} 
              x = {0-(margin + (filterChina["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960))} 
              y = {-height + margin}
              x2 = {margin + (filterChina["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960 + 1) + 10}
              width={10}
              height={0.00001*filterChina["Secondary education, teachers"]}
              >
            </rect>
          )
        })}
      </svg>

      <h3>Q3: The trend of female school enrollment for secondary school from 1960 - 2017</h3>
      <h4>Especially for China</h4>
      <p>The third one is related to female school enrollment for secondary school from 1960 - 2017. It does not show a whole lot of changes, especially for China, which is in red. </p>
      <svg 
        width={width} // 1000
        height={height}  // 500
        style={{ border: "1px solid black" }}>
        
        <line
          x1={width / 2 - 10}
          y1={height - margin - 100}
          x2={width / 2 - 5}
          y2={height - margin - 100}
          stroke={"black"}
        />
        <text
          x={width/2 - 200}
          textAnchor="end"
          y={margin}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >The trend of female school enrollment for secondary school from 1960 - 2017
        </text>
        <text
          x={margin + 20}
          textAnchor="end"
          y={height - margin- 10 }
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >1960</text>

        <text
          x={margin + (2017- 1960 + 1)*(width - 6*margin)/(2017-1960 + 1) + 15}
          textAnchor="end"
          y={height - margin - 10}
          style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}
        >2017</text>

        {data.map((data, index) => {
          const highlight = data["Country Name"] === "United States";
          return (
            <line 
              key={index} 
              x1 = {margin + (data["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960)} 
              y1 = {height - 3*margin - 2*data['School enrollment, secondary, female (% net)']}
              x2 = {margin + (data["Year"] - 1960 + 1)*(width - 6*margin)/(2017-1960 + 1) + 15}
              y2 = {height - 3*margin - 2*data['School enrollment, secondary, female (% net)']}
              stroke={highlight? "red": "steelblue"}
              strokeOpacity={highlight? 2: "0.2"}>
            </line>
          )
        })}
      </svg>

      {/* total (% of total expenditure in public institutions) */}
      {/* Trained teachers in secondary education */}
      <h3>Q4: Adolescents out of school (% of lower secondary school age) for China </h3>
      <p> The last one is related to Adolescents out of school rate again, this time focused on China specifically. It shows that the rate for China is relateively small. </p>
      <svg 
        width={size} 
        height={size}  
        style={{ border: "1px solid black" }}>
        {data.slice(0,1000).map((data, index) => {
          //console.log('drawing circle');
          const highlight = data['Country Name'] === "China";
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 : size / 2 +20} 
              cy={size - margin - data['Adolescents out of school (% of lower secondary school age)']}  
              // cy={size - margin - 5}
              r="3" 
              fill="none"
              stroke={
                data['Country Name'] ==="China" 
                  ? "red"
                  : "steelblue"
              }
              strokeOpacity="0.2"
              // opacity=".2"
            />
          );
        })}
      </svg> 
    </div>
  );
}

function FilterCriteriaChina(d) {
  return d["Country Name"] = "China";
}

function FilterCriteriaUSA(d) {
  return d["Country Name"] = "United Kingdom";
}

export { A2 }


