import { useState, useEffect } from "react";
import { processCOVIDAggregatedData } from "./processCovidData";

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
