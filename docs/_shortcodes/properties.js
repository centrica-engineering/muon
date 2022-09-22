const jsdoc = require('../_data/muon/custom-elements.json');
const section = require('../_shortcodes/section.js');

const ignoreList = [
  'standardTemplate',
  'scopedElements',
  'shadowRootOptions',
  'registry',
  'renderOptions',
  'slottedStyles'
];

module.exports = ({ name }) => {
  const comp = jsdoc.tags.filter(comp => comp.name === name.toLowerCase())[0];

  if (!comp || !comp?.properties) {
    return undefined;
  }

  const tableData = comp.properties.map(({ name: propName, attribute, type, default: propDefault, description }) => {
    if (ignoreList.includes(propName)) {
      return undefined;
    }

    return `
      <tr>
        <td data-label="Property">${propName}</td>
        <td data-label="Attribute">${attribute || ''}</td>
        <td data-label="Type">${type || ''}</td>
        <td data-label="Default">${propDefault || ''}</td>
        <td data-label="Description">${description || ''}</td>
      </tr>`
  }).filter(token => token).join('');

  return `
    ${section(`<div class="table-container"><table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Attribute</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      ${tableData}
    </table></div>`, { heading: 'Properties' })}
  `;
};