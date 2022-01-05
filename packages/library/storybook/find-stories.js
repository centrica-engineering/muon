const path = require('path');

const findStories = async () => {
  const { getConfig } = await import('../scripts/get-config.mjs');
  const { filterPathToCustomElements } = await import('../scripts/custom-elements-json.mjs');

  const config = await getConfig();
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);

  return path.join(__filename, '..', '..', 'components', pathPattern, 'story.js');
};

module.exports = findStories;
