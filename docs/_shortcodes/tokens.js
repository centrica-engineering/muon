const tokens = require('../_data/muon/muon-tokens-reference.json');
const section = require('../_shortcodes/section.js');

module.exports = ({ name }) => {
  const compTokens = tokens.filter(token => token?.path?.[0] === name.toLowerCase());

  if (!compTokens) {
    return undefined;
  }

  const tableData = compTokens.map(({ name, nestedName, description, value, usesReference, original }) => {
    // @TODO: Decide if we want to show private tokens
    if (name.startsWith('__private')) {
      return undefined;
    }

    const ref = usesReference ? original.value : value;
    return `
      <tr>
        <td data-label="Name">${nestedName}</td>
        <td data-label="Token value">${ref}</td>
        <td data-label="Rendered value">${value}</td>
        <td data-label="Description">${description}</td>
      </tr>`
  }).filter(token => token).join('');

  return `
    ${section(`<div class="table-container"><table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Token value</th>
          <th>Rendered value</th>
          <th>Description</th>
        </tr>
      </thead>
      ${tableData}
    </table></div>`, { heading: 'Tokens' })}
  `;
};