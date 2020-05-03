import React, { useState } from "react";
import MapChart from "./components/MapChart";
import ReactTooltip from "react-tooltip";
import { Statistics } from "../src/components/Statistics";

const App = () => {
  const [content, setContent] = useState("");
  return (
    <div className="container">
      <div className="header">
        <p>Header</p>
      </div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <Statistics tooltipContent={content} />
      <div className="footer">
        <p>Footer</p>
      </div>
    </div>
  );
};

export default App;
