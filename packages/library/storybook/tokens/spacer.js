import tokens from '@muons/library/build/tokens/es6/muon-tokens-module.js';

export default {
  title: 'Tokens/Theme'
};

const spacerHTML = (key, data) => {
  const size = data.value;
  return `
    <h2>${key}</h2>
    <span>${size}</span>
    <div style="width: ${size}; height: ${size};"  class="square"></div>
  `;
};

const generateAll = () => {
  return Object.entries(tokens.theme.spacer).map((entry) => {
    const key = entry[0];
    const data = entry[1];

    if (data.value) {
      return spacerHTML(key, data);
    }

    return undefined;
  }).filter((entry) => entry).join('');
};

export const spacer = () => {
  return `<div class="inner" type="page">
  <style>
    body {
      padding: 2em;
    }

    h2 {
      text-transform: uppercase;
    }

    .square {
      background: #888;
      border: 2px solid #FFF;
    }
  </style>
  <h1>Spacers</h1>
    ${generateAll()}
</div>`;
};
