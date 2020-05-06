import { filter, includes, range } from "lodash";
import { adjustHue, setSaturation } from "polished";

const hueDifferentials = range(0, 360, 36);
export const baseColour = "#009dff";
export const strokeColour = "#607D8B";
export const defaultColour = "#E3F0FF";

let randomColor = "#000000".replace(/0/g, function () {
  return (~~(Math.random() * 16)).toString(16);
});

const shuffleColours = (colourMap) => {
  for (let i = colourMap.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colourMap[i], colourMap[j]] = [colourMap[j], colourMap[i]];
  }
  return colourMap;
};

export const colourMap = hueDifferentials.map((degree, i) => {
  const newColour = adjustHue(degree, randomColor);
  // Alternate the saturation between adjacent hues to further differentiate the colors
  if (i % 2 === 0) {
    return setSaturation(0.8, newColour);
  }
  return newColour;
});

export const selectColour = (selectedCountries) => {
  // const countryColoursInUse = selectedCountries.map((o) => o.colour);
  const shuffledColours = shuffleColours(colourMap);
  //const coloursInUse = colourMap.pop();
  // const coloursInUse = filter(
  //   colourMap,
  //   (colour) => !includes(countryColoursInUse, colour)
  // );

  // if (coloursInUse.length > 0) {
  //   return coloursInUse[coloursInUse.length - 1];
  // }

  return shuffledColours[0];
};
