const chroma = require('chroma-js');

const colorTransform = (token) => {
  const { value, modify = [] } = token;
  let color = chroma(value);
  // iterate over the modify array (see tokens/color.json)
  // and apply each modification in order
  modify.forEach(({ type, amount, ratio = 0.5 }) => {
    // modifier type must match a method name in chromajs
    // https://gka.github.io/chroma.js/
    // chroma methods can be chained, so each time we override the color variable
    // we can still call other chroma methods, similar to
    // chroma(value).brighten(1).darken(1).hex();

    // if the modifier type is 'mix', we need to pass in the color to mix with
    // and the ratio to mix by
    if (type === 'mix') {
      color = color.mix(amount, ratio);
    } else {
      color = color[type](amount);
    }
  });

  return color.hex();
};

module.exports = {
  name: 'color/css',
  type: 'value',
  transitive: true,
  matcher: (token) => token.modify,
  transformer: colorTransform
};
