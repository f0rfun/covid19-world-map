import { useState, useEffect } from "react";
import { processCOVIDAggregatedData } from "./processCovidData";

export const useFetchAggregatedData = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const res = await fetch(url);

    const text = await res.text();
    setResponse(processCOVIDAggregatedData(text));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [response, loading];
};
