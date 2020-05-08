import React, { useState, useEffect } from "react";
import { useFetchTimeSeries } from "../utils/useFetch";
import DailyFigures from "./DailyFigures";
import dayjs from "dayjs";
import "../css/styles.css";

const filteredCountries = (date, filter) => {
  return Object.keys(date).reduce(
    (acc, val) =>
      val !== filter
        ? acc
        : {
            ...acc,
            ISO_A3: val,
            cases: date[val],
            date: date["date"],
          },
    {}
  );
};

const getTodayCases = (aCountry) => {
  const today = dayjs().format("M/D/YY");
  if (aCountry.date === "5/5/20") {
    return aCountry;
  }
};

const getYesterdayCases = (aCountry) => {
  const yesterday = dayjs().subtract(1, "day").format("M/D/YY");
  if (aCountry.date === "5/4/20") {
    return aCountry;
  }
};

const TimelineStats = ({ selectedCountries }) => {
  const [confirmedCases, updateConfirmedCases] = useState("");
  //get from api
  const [allConfirmedCases, isConfirmedLoading] = useFetchTimeSeries(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
    {}
  );

  if (selectedCountries.length < 1) {
    return (
      <div className="bottom">
        <p>No countries are selected, why not select a few to compare them?</p>
      </div>
    );
  }

  if (isConfirmedLoading) {
    return <div className="bottom">Loading...</div>;
  }
  const allSelectedCountriesConfirmedCases = [];

  selectedCountries.map(({ ISO_A3 }) => {
    allConfirmedCases.NORMAL.forEach((date) => {
      allSelectedCountriesConfirmedCases.push(filteredCountries(date, ISO_A3));
    });
  });

  const selectedCountryConfirmedCasesToday = allSelectedCountriesConfirmedCases.filter(
    getTodayCases
  );

  const selectedCountryConfirmedCasesYesterday = allSelectedCountriesConfirmedCases.filter(
    getYesterdayCases
  );

  return (
    <DailyFigures
      selectedCountryConfirmedCasesToday={selectedCountryConfirmedCasesToday}
      selectedCountryConfirmedCasesYesterday={
        selectedCountryConfirmedCasesYesterday
      }
      confirmedCases={confirmedCases}
      updateConfirmedCases={updateConfirmedCases}
    />
  );
};

export default TimelineStats;
