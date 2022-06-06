// https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
const toDecimalPlaces = (number, decimalPlaces) => Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces);

const ratios = {
  // "minor-second": 1.067, // commented out are not used
  'major-second': 1.125,
  'minor-third': 1.2,
  'major-third': 1.25
  // "perfect-fourth": 1.333,
  // "aug-fourth": 1.414,
  // "perfect-fifth": 1.5,
  // "minor-sixth": 1.6,
  // "golden-section": 1.618,
  // "major-sixth": 1.667,
  // "minor-seventh": 1.778,
  // "major-seventh": 1.875,
  // "octave": 2,
  // "major-tenth": 2.5,
  // "major-eleventh": 2.667,
  // "major-twelfth": 3,
  // "double-octave": 4
};

const calculate = (base, ratio, exponent) => {
  const r = ratios[ratio];
  const result = base * Math.pow(r, exponent);

  return toDecimalPlaces(result, 3);
};

module.exports = {
  calculate
};
