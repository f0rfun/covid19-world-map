import React from "react";
import { filter, sumBy, reduce } from "lodash";
import { useFetchAggregatedData } from "../utils/useFetch";

import "../css/styles.css";

export const statsArray = ["Confirmed", "Deaths", "Recovered", "Active"];

export const Statistics = ({ tooltipContent }) => {
  const [result, loading] = useFetchAggregatedData(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv"
  );

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const aggConfirmed = reduce(
    statsArray,
    (memo, curr) => ({
      ...memo,
      [curr]: sumBy(result, (o) => o[curr]),
    }),
    {}
  );

  const { ISO_A3, NAME } = tooltipContent;

  const covidAggregatedData =
    filter(result, {
      ISO3: ISO_A3,
    })[0] || {};

  const { Country_Region } = covidAggregatedData;

  const thArray = Country_Region ? ["Stats", NAME] : ["Stats", "Global"];
  const tdArray = statsArray.map((attr) =>
    Country_Region
      ? [attr, covidAggregatedData[attr]]
      : [attr, aggConfirmed[attr]]
  );

  return (
    <div className="top">
      <h2>Data</h2>
      <table className="stats-table">
        <thead>
          <tr>
            {thArray.map((i) => (
              <th key={`${i}-head`}>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tdArray.map((row, i) => (
            <tr key={`${i}-row`}>
              {row.map((col, index) => (
                <td
                  key={`${i}-row-${col}`}
                  className={index === 0 ? "stats-row-name" : ""}
                >
                  {col.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
