import React, { useState, useEffect } from "react";
import "../css/dailyFigures.css";

const DailyFigures = ({
  selectedCountryConfirmedCasesToday,
  confirmedCases,
  updateConfirmedCases,
}) => {
  const defaultValue =
    !!selectedCountryConfirmedCasesToday.length > 0
      ? selectedCountryConfirmedCasesToday[0].cases
      : "Data is unavailable yet";
  const [disabled, setDisabled] = useState(true);
  const [testValue, updateTestValue] = useState(defaultValue);

  useEffect(() => {
    updateTestValue(confirmedCases);
  }, [confirmedCases]);

  updateConfirmedCases(defaultValue);

  const handleEdit = () => {
    updateTestValue("");
    setDisabled(!disabled);
  };

  const handleOnChange = (event) => {
    updateTestValue(event.target.value.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(!disabled);
    // console.log(confirmedCases);
    //submit to api
  };

  return (
    <div className="bottom">
      <h2>Daily Figures</h2>

      <label>
        Confirmed cases:
        <input
          type="text"
          className="confirmed-cases-input"
          value={testValue}
          disabled={disabled}
          onChange={handleOnChange}
        />
      </label>
      <input
        className="edit-button"
        type="button"
        defaultValue="Edit"
        onClick={handleEdit}
      />
      <input
        className="save-button"
        type="Submit"
        defaultValue="Save"
        onClick={handleSubmit}
      />
    </div>
    // return selectedCountries.map(({ ISO_A3, NAME, color }) => (
    //   <p key={ISO_A3}>
    //     {NAME}, {ISO_A3}
    //   </p>
    // ));
  );
};

export default DailyFigures;
