const path = require('path');
const fs = require('fs');
const pathIsInside = require('path-is-inside');

const findStories = async (dir = process.cwd()) => {
  const { getConfig, filterPathToCustomElements } = await import('../scripts/utils/index.mjs');

  const config = await getConfig();
  const componentsList = config?.components?.included;

  if (!componentsList) {
    return [];
  }

  const pathPattern = await filterPathToCustomElements(componentsList);

  const patterns = path.join(__filename, '..', '..', 'components', pathPattern, 'story.js');
  if (pathIsInside(process.cwd(), path.join(__filename, '..', '..'))) {
    return [path.relative(dir, patterns)];
  } else {

    const unlink = (fileURL) => {
      try {
        fs.unlinkSync(new URL(fileURL));
        return true;
      } catch (e) {
        return false;
      }
    };

    const destination = config?.destination || 'dist';
    const symlink = path.join(destination, 'stories');

    unlink(symlink);

    fs.symlinkSync(path.join(__filename, '..', '..', 'components'),
      symlink, 'dir');

    return [path.relative(dir, path.join(symlink, pathPattern, 'story.js'))];
  }
};

module.exports = findStories;
