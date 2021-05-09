import React from "react";

const viewWidth = 500;
const viewHeight = 500;

const App = () => {
    return <svg style={{ border: "1px solid pink", 
            width: viewWidth, height: viewHeight }}>
                <circle cx={100} cy="50" r="5" />
                <rect x={90} y="55" width="20" height="35" />
                
                <rect x={212} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
                <rect x={224} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
                <rect x={200} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
                <rect x={236} y={200} width={10} height={10} fill="rgb(230,230,230)"/>
                <rect x={248} y={200} width={10} height={10} />
                
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
                
                <text x={26} y="300" style={{ font: "italic 18px Times"}}>
                    Hey, this is supposed to be fancy text
                </text>

            </svg>;
}

export default App;