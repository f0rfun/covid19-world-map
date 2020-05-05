import { useState, useEffect } from "react";
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

  const fetchData = async () => {
    const res = await fetch(url);

    const rawData = await res.text();
    setResponse(processCOVIDAggregatedData(rawData));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [response, loading];
};
