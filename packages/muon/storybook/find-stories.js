const path = require('path');
const fs = require('fs');
const pathIsInside = require('path-is-inside');
const { getConfig, getDestination, filterPathToCustomElements } = require('../scripts/utils/index.mjs');

const findStories = (dir = process.cwd()) => {
  const config = getConfig();
  const componentsList = config?.components?.included;

  if (!componentsList) {
    return [];
  }

  const pathPattern = filterPathToCustomElements(componentsList);
  const patterns = path.join(__filename, '..', '..', 'components', pathPattern, 'story.js');

  if (
    pathIsInside(process.cwd(), path.join(__filename, '..', '..')) ||
    pathIsInside(path.join(__filename, '..', '..'), process.cwd())
  ) {
    return path.relative(dir, patterns);
  } else {
    const destination = getDestination();
    const symlink = path.join(destination, 'stories');

    let symlinkExists = false;
    try {
      fs.lstatSync(symlink); // lstatSync does not follow symlinks, so detects broken symlinks too
      symlinkExists = true;
    } catch (e) {
      // symlink path does not exist at all
    }

    if (!symlinkExists) {
      fs.mkdirSync(destination, { recursive: true });
      fs.symlinkSync(path.join(__filename, '..', '..', 'components'), symlink, 'dir');
    }

    return path.relative(dir, path.join(symlink, pathPattern, 'story.js'));
  }
};

module.exports = findStories;
