import React from "react";
import { useFetch } from "./hooks/useFetch";
import { A2 } from "./A2";
import { A3 } from "./A3";
import { A4 } from "./A4";
import { InClass } from "./InClass";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { extent, max, min } from "d3-array";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const viewWidth = 500;
const viewHeight = 500;

export default function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/inclass">InClass</Link></li>
                    <li><Link to="/assignment2">Assignment2</Link></li>
                    <li><Link to="/assignment3">Assignment3</Link></li>
                    <li><Link to="/assignment4">Assignment4</Link></li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/"><Dashboard /></Route>
                    <Route path="/inclass"><InClassCode /></Route>
                    <Route path="/assignment2"><Assignment2 /></Route>
                    <Route path="/assignment3"><Assignment3 /></Route>
                    <Route path="/assignment4"><Assignment4 /></Route>
                </Switch>
            </div>
        </Router>
    );
}

function InClassCode() {
    return InClass();
}

function Dashboard() {
    // Load data with a created function useFetch
    // return a line "Loading Data" and do not show after loading
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/DorisLL/Spr21_Info474/main/data/education.csv"
      )
      console.log("from hook", loading, data);
    return (
        <div>
            <h2>Dashboard</h2>
            <p>{loading && "Loading Data!"} </p>
        </div>
    )
}

function Assignment2() {
    const Assignment2 = A2();
    return Assignment2;
}


function Assignment3() {
    return A3();
  }
  
  function Assignment4() {
    return A4();
  }