import React from "react";
import { scaleLinear } from "d3-scale";
import { extent, max, min } from "d3-array";
import { useFetch } from "./hooks/useFetch";

function InClass() {

    // https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/weather.csv

    const [weatherData, loading] = useFetch(
        "https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/weather.csv"
    );
    // const dataSmallSample = data.slice(0, 5000);
    const dataSmallSample = weatherData.slice(0, 5000);
    extent(weatherData.slice(0, 5000), (d) => {
        d.TMAX;
    });
    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;

    // // Usage of max
    // const maxValueOfTMAX = max([1,2,3]);
    // console.log(maxValueOfTMAX, dataSmallSample)
 

    const maxValueOfTMAX = max(
        dataSmallSample.map((measurement) => {
            return +measurement.TMAX;
        })
    );
  

    const minValueOfTMAX = min(
        dataSmallSample.map((measurement) => {
            return +measurement.TMAX;
        })
    );

    console.log(maxValueOfTMAX, minValueOfTMAX)
    // console.log(maxValueOfTMAX) // , minValueOfTMAX);

    const yScale = scaleLinear()
        .domain([minValueOfTMAX, maxValueOfTMAX]) //unit: km
        .range([size, size - 250]); // unit: pixels

    return (
        <div>
            <h1>Exploratory Data Analysis, In Class</h1>
            <p>{loading && "Loading data!"}</p>
            <h3>Scales in D3</h3>
            <svg width={size} height={size} style={{ border:" 1px solid black" }}>
                <text
                    x={size / 2 - 12}
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor}
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >0
                </text>
                <text
                    x={size /2 - 12}
                    textAnchor="end"
                    y={size - margin - 100 + axisTextAlignmentFactor}
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >100
                </text>
                <line
                    x1={size / 2 - 10}
                    y1={size - margin - 100}
                    x2={size / 2 - 5}
                    y2={size - margin - 100}
                    stroke={"black"}
                />
                <line
                    x1={size / 2 - 10}
                    y1={yScale -  margin}
                    x2={size / 2 - 5}
                    y2={yScale - margin}
                    stroke={"black"}
                />

                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return (
                        <line
                            key={index}
                            x1={size / 2}
                            y1={yScale(measurement.TMAX)}
                            x2={size /  + 20}
                            y2={yScale(measurement.TMAX)}
                            stroke={highlight ? "red": "steelblue"}
                            strokeOpacity={highlight? 1 : 0.1}
                        />
                    );
                })}                 
            </svg>
        </div>
    )
    // const viewWidth = 500;
    // const viewHeight = 500; 

    // return (<svg style={{ border: "1px solid pink", width: viewWidth, height: viewHeight }}>
    //             <circle cx={100} cy="50" r="5" />
    //             <rect x={90} y="55" width="20" height="35" />
                
    //             <rect x={212} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
    //             <rect x={224} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
    //             <rect x={200} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
    //             <rect x={236} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
    //             <rect x={248} y={200} width={10} height={10} />
                
    //             <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
                
    //             <text x={25} y="300" style={{ font: "italic 18px Times"}}>
    //                 Hey, this is supposed to be fancy text
    //             </text>
    //     </svg>)
  

}



  export { InClass };