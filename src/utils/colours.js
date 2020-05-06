export const baseColour = "#009dff";
export const strokeColour = "#607D8B";
export const defaultColour = "#E3F0FF";

export const selectColour = () => {
  const randomHexColour =
    "#" + (Math.random().toString(16) + "000000").slice(2, 8);

  return randomHexColour;
};
