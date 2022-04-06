const path = require('path');

const findStories = async (dir = process.cwd()) => {
  const { getConfig, filterPathToCustomElements } = await import('../scripts/utils/index.mjs');

  const config = await getConfig();
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);

  const patterns = path.join(__filename, '..', '..', 'components', pathPattern, 'story.js');
  return [path.relative(dir, patterns)];
};

module.exports = findStories;
