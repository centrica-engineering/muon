const path = require('path');
const fs = require('fs');
const pathIsInside = require('path-is-inside');

const findStories = async (dir = process.cwd()) => {
  const { getConfig, getDestination, filterPathToCustomElements } = await import('../scripts/utils/index.mjs');

  const config = getConfig();
  const componentsList = config?.components?.included;

  if (!componentsList) {
    return [];
  }

  const pathPattern = await filterPathToCustomElements(componentsList);
  const patterns = path.join(__filename, '..', '..', 'components', pathPattern, 'story.js');

  if (
    pathIsInside(process.cwd(), path.join(__filename, '..', '..')) ||
    pathIsInside(path.join(__filename, '..', '..'), process.cwd())
  ) {
    return [path.relative(dir, patterns)];
  } else {
    const destination = getDestination();
    const symlink = path.join(destination, 'stories');

    if (!fs.existsSync(symlink)) {
      fs.symlinkSync(path.join(__filename, '..', '..', 'components'),
        symlink, 'dir');
    }

    return [path.relative(dir, path.join(symlink, pathPattern, 'story.js'))];
  }
};

module.exports = findStories;
