import { useState, useEffect } from "react";
import axios from "axios";
import {
  processCOVIDAggregatedData,
  processOneCOVIDTimeSeries,
} from "./processCovidData";

export const useFetchTimeSeries = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const res = await fetch(url);

    const text = await res.text();

    setResponse(processOneCOVIDTimeSeries(text));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [response, loading];
};

export const useFetchAggregatedData = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setLoading(true);
      try {
        const casesCountry = await axios.get(url);
        setResponse(casesCountry.data);
      } catch (e) {
        setIsError({ message: e.message, isError: true });
      }
      setLoading(false);
    };
    getData();
  }, []);
  return [response, loading, error];
};
