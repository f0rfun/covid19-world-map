import React, { useState, useEffect } from "react";
import "../css/dailyFigures.css";

const DailyFigures = ({
  selectedCountryConfirmedCasesToday,
  selectedCountryConfirmedCasesYesterday,
  confirmedCases,
  updateConfirmedCases,
}) => {
  let newCases = "Data is unavailable yet";

  if (
    !!selectedCountryConfirmedCasesToday.length > 0 &&
    !!selectedCountryConfirmedCasesYesterday.length > 0
  ) {
    newCases =
      selectedCountryConfirmedCasesToday[0].cases -
      selectedCountryConfirmedCasesYesterday[0].cases;
  }

  const [disabled, setDisabled] = useState(true);
  const [dailyNew, updateDailyNew] = useState(newCases);

  useEffect(() => {
    updateDailyNew(confirmedCases);
  }, [confirmedCases]);

  useEffect(() => {
    updateConfirmedCases(newCases);
  }, [newCases]);

  const handleEdit = () => {
    updateDailyNew("");
    setDisabled(!disabled);
  };

  const handleOnChange = (event) => {
    updateDailyNew(event.target.value.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisabled(!disabled);
    console.log("Submit", dailyNew);
    //post to api
  };

  return (
    <div className="bottom">
      <h3>Today&apos;s Figures</h3>

      <label>
        New:
        <input
          type="text"
          className="confirmed-cases-input"
          value={dailyNew}
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
  );
};

export default DailyFigures;
