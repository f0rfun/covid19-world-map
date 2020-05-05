import React from "react";
import { useFetchTimeSeries } from "../utils/useFetch";
import "../css/styles.css";

const filteredCountries = (date, filter) => {
  const lala = Object.keys(date).reduce(
    (acc, val) =>
      val !== filter
        ? acc
        : {
            ...acc,
            [val]: date[val],
            date: date["date"],
          },
    {}
  );

  return lala;
};

const TimelineStats = ({ selectedCountries }) => {
  const [allConfirmed, ConfirmedLoading] = useFetchTimeSeries(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
    {}
  );

  const currentCase = allConfirmed;
  // console.log(currentCase);

  if (selectedCountries.length < 1) {
    return (
      <div className="bottom">
        <p>No countries are selected, why not select a few to compare them?</p>
      </div>
    );
  }

  if (ConfirmedLoading) {
    return <div className="bottom">Loading</div>;
  }
  const casesByDate = [];

  selectedCountries.map(({ ISO_A3 }) => {
    currentCase.NORMAL.forEach((date) => {
      casesByDate.push(filteredCountries(date, ISO_A3));
    });
  });

  console.log(casesByDate);

  return <div>hi</div>;
  // return selectedCountries.map(({ ISO_A3, NAME, color }) => (
  //   <p key={ISO_A3}>
  //     {NAME}, {ISO_A3}
  //   </p>
  // ));
};

export default TimelineStats;
