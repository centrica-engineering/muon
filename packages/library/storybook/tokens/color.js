import tokens from '@muons/library/build/tokens/es6/muon-tokens-module.js';

const colorDetails = ([key, data]) => {
  return `
    <div class='swatch'>
      <div style="background: ${data.value}" class='colour slide-right'></div>
      <div class='details ${key}-decoration'>
        <p class='name'>
          <span class='value'>${key}</span>
        </p>
        <p class='value'>
          <span class='value'>${data.value}</span>
        </p>
      </div>
    </div>`;
};

const colorLoop = (entries) => {
  let palletteHtml = '';

  for (const [key, data] of entries) {

    if (data.value) {
      palletteHtml += colorDetails([key, data]);
    } else {
      const entries = Object.entries(data);
      palletteHtml += `<h2>${key}</h2>`;
      palletteHtml += colorLoop(entries);
      palletteHtml += `<hr>`;
    }
  }

  return palletteHtml;
};

const generatePallette = () => {
  const entries = Object.entries(tokens.theme.color);

  return colorLoop(entries);
};

export default {
  title: 'Tokens/Theme'
};

export const color = () => {
  return `<div class="inner" type="page">
  <style>
    body {
      padding: 2em;
    }
    .swatch {
      position: relative;
      margin: 24px;
      min-width: 175px;
      border: 2px solid #EEE;
      border-radius: 8px;
      overflow: hidden;
      display: inline-block;
    }
    .swatch .colour {
      width: 100%;
      height: 100px;
    }
    .swatch .details {
      padding: 16px;
      background: #fff;
    }
    .swatch .name {
      text-transform: capitalize;
      font-size: 18px;

    }
    .colour-value {
      font-size: 0.75em;
      display: block;
    }

    h1, h2 {
      text-transform: capitalize;
      color: currentColor;
    }
  </style>
  <h1>Colors</h1>
  ${generatePallette()}
</div>`;
};
