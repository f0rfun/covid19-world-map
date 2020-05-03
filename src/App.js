import React, { useState } from "react";
import MapChart from "./components/MapChart";
import ReactTooltip from "react-tooltip";
import { Statistics } from "../src/components/Statistics";

const App = () => {
  const [content, setContent] = useState("");
  return (
    <div className="container">
      <div className="header">
        <h1>COVID-19 World Map</h1>
      </div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content.NAME}</ReactTooltip>
      <Statistics tooltipContent={content} />
      <div className="footer">
        <p>
          Data courtesy of{" "}
          <a href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>
        </p>
      </div>
    </div>
  );
};

export default App;
