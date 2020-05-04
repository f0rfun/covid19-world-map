export const csvArray = (csv) => {
  let lines = csv.split("\n");
  let result = [];
  let headers = lines[0].split(",");

  for (let lineNumber = 1; lineNumber < lines.length; lineNumber++) {
    let aCountry = {};
    // let currentline = lines[lineNumber].split(",");
    let currentline = lines[lineNumber].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
    if (lines[lineNumber] !== "") {
      // for (let columnIndex = 0; columnIndex < headers.length; columnIndex++) {
      //   //obj[headers[j]] = currentline[j];
      //   aCountry.headers[columnIndex] = currentline[columnIndex];
      // }

      headers.forEach((aHeader, index) => {
        aCountry[aHeader] = currentline[index];
      });

      result.push(aCountry);
    }
  }
  return result;
};
