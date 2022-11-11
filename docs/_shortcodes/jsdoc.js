const jsdoc = require('../_data/muon/custom-elements.json');
const section = require('../_shortcodes/section.js');

module.exports = ({compName}) => {
  const component = jsdoc.tags.filter(comp => comp.name === compName.toLowerCase())[0];

  if(!component) {
    return undefined;
  }

  const { name, description } = component;
  
  return `
    <h1>
      ${name}
    </h1>

    ${section(`<p>${description}</p>`, { heading: 'Purpose' })}
  `;
};