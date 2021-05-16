import React from "react";
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { useFetch } from "./hooks/useFetch";
// import { geoNaturalEarth1 } from "d3-geo-projection"
import { scale } from "vega";
import * as topojson from "topojson-client"
import world from "../countries-50m";

function InClass() {

    // https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/weather.csv

    const [weatherData, loading] = useFetch(
        "https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/weather.csv"
    );
    // const dataSmallSample = data.slice(0, 5000);
    const dataSmallSample = weatherData.slice(0, 5000);
    extent(dataSmallSample, (d) => {
        return +d.TMAX;
    });


    const land = topojson.feature(world, world.objects.land);
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);
    const mapPathString = path(land);

    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;
    const histogramLeftPadding = 20;
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
        .range([size - margin, size - 400]); // unit: pixels


    _bins = bin().thresholds(30);
    tmaxBins = _bins(
        weatherData.map((d) => {
            return +d.TMAX;
        })
    )
    // console.log(
    //     tmaxBins.map((bin, i) => {
    //         console.log(i, bin.x0, bin.x1, bin);
    //     })
    // )

    // console.log("d3", d3.geoNaturalEarth1)

    return (
        <div>
            <h1>Exploratory Data Analysis, In Class</h1>
            <p>{loading && "Loading data!"}</p>

            <h3> Working with geo data </h3>
            <svg width={1000} height={600} style={{ border: "1px solid black" }}>
                <path d={mapPathString} fill="rgb(200, 200, 200)" />
                {dataSmallSample.map((measurement) => {
                    return (
                        <circle 
                            transform={`translate(
                                ${projection([measurement.longitude, measurement.latitude])})`} r="1.5" />
                    );
                            })}
            </svg>




            <h3> Binning </h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {tmaxBins.map((bin, i) => {
                    // const binHeight = bin.length && bin.length * 0.001 < 1 ? 1 : bin.length * 0.001;
                    return (
                        // <rect width="10" x={index * 11} y={size} height={bin.length} />
                        <rect 
                            y={size - 50 - bin.length * 0.001}
                            width="10" 
                            height={bin.length * 0.001} 
                            x={histogramLeftPadding + i * 11} />
                    );
                })}
            </svg>



            <h3>Scales in D3</h3>
            <svg width={size} height={size} style={{ border:" 1px solid black" }}>
                <text
                    x={size / 2 - 12}
                    textAnchor="end"
                    y={yScale(0) + axisTextAlignmentFactor}
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >0
                </text>
                <text
                    x={size / 2 - 12}
                    textAnchor="end"
                    y={yScale(100) + axisTextAlignmentFactor}
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
                >100
                </text>
                <line
                    x1={size / 2 - 10}
                    y1={yScale(100)}
                    x2={size / 2 - 5}
                    y2={yScale(100)}
                    stroke={"black"}
                />
                <line
                    x1={size / 2 - 10}
                    y1={yScale(0)}
                    x2={size / 2 - 5}
                    y2={yScale(0)}
                    stroke={"black"}
                />

                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return (
                        <line
                            key={index}
                            x1={highlight ? size / 2 - 5 : size / 2 }
                            y1={yScale(+measurement.TMAX)}
                            x2={highlight ? size / 2 + 25 : size / 2 + 20}
                            y2={yScale(+measurement.TMAX)}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight? 1 : .1}
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