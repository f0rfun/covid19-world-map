import { filter, includes, range } from "lodash";
import { adjustHue, setSaturation } from "polished";

const hueDifferentials = range(0, 360, 36);
export const baseColour = "#009dff";
export const strokeColour = "#607D8B";
export const defaultColour = "#E3F0FF";

export const colourMap = hueDifferentials.map((degree, i) => {
  const newColour = adjustHue(degree, baseColour);
  // Alternate the saturation between adjacent hues to further differentiate the colors
  if (i % 2 == 0) {
    return setSaturation(0.8, newColour);
  }
  return newColour;
});

export const selectColour = (selectedCountries) => {
  const countryColoursInUse = selectedCountries.map((o) => o.colour);
  const coloursInUse = filter(
    colourMap,
    (colour) => !includes(countryColoursInUse, colour)
  );

  if (coloursInUse.length > 0) {
    return coloursInUse[0];
  }
  return baseColour;
};
