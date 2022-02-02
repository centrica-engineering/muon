import tokens from '@muons/library/build/tokens/es6/muon-tokens-module.js';

export default {
  title: 'Tokens/Theme'
};

const fontHTML = (key, data, type, args) => {
  return `
    <h3>${key} - ${data.value}</h3>

    <span style="font-${type}: ${data.value}">${args.text}</span>
  `;
};

const generate = (type, args) => {
  const entries = Object.entries(tokens.theme.font[type]);
  let allHTML = `<h2>${type}</h2>`;

  for (const [key, data] of entries) {

    if (data.value) {
      allHTML += fontHTML(key, data, type, args);
    }
  }

  return allHTML;
};

const generateAll = (args) => {
  return Object.entries(tokens.theme.font).map((entry) => {
    const key = entry[0];
    return generate(key, args);
  }).join('');
};

export const font = (args) => {
  return `<div class="inner" type="page">
  <style>
    body {
      padding: 2em;
    }

    h2 {
      text-transform: capitalize;
    }
  </style>
  <h1>Font</h1>
    ${generateAll(args)}
</div>`;
};

font.args = { text: 'The quick brown fox jumps over the lazy dog' };
