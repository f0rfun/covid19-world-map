import { csvArray } from "./csvArray";
import { filter, reduce } from "lodash";
import { statsArray } from "../components/Statistics";

const filterEmptyObjs = (collection) =>
  filter(collection, (o) => o.Country_Region !== "");

export const processCOVIDAggregatedData = (text) => {
  const templateLiteralString = `${text}`;
  const textCollection = csvArray(templateLiteralString);
  return filterEmptyObjs(textCollection).map((o) =>
    reduce(
      statsArray,
      (memo, current) => ({
        ...o,
        ...memo,
        [current]: parseInt(o[current]),
      }),
      {}
    )
  );
};
