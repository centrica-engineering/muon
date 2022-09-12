const MarkdownIt = require('markdown-it');
const FrontMatter = require('markdown-it-front-matter');

const jsdoc = require('./_shortcodes/jsdoc');
const tokens = require('./_shortcodes/tokens');
const properties = require('./_shortcodes/properties');
const section = require('./_shortcodes/section');
const story = require('./_shortcodes/story');

const fs = require('fs');
const path = require('path');

module.exports = eleventyConfig => {
  // I want to watch everything!
  // eleventyConfig.addWatchTarget('/**/*');

  eleventyConfig.addShortcode('jsdoc', jsdoc);
  eleventyConfig.addShortcode('tokens', tokens);
  eleventyConfig.addShortcode('properties', properties);
  eleventyConfig.addPairedShortcode('section', section);
  eleventyConfig.addShortcode('story', story);

  const md = new MarkdownIt({}).use(FrontMatter, (fm) => {
    console.log(fm)
  });

  eleventyConfig.addShortcode('markdown', ({file}) => {
    let relativeFilePath = `.${file}`

    if (path.extname(file) != '.md') {
      throw new Error('markdown shortcode requires a filetype of md');
    }

    if (!fs.existsSync(relativeFilePath)) {
      return '';
    }

    let data = fs.readFileSync(relativeFilePath, function (err, contents) {
      if (err) {
        throw new Error(err)
      }
      return contents;
    });

    return md.render(data.toString());
  });

  return {
    dir: {
      passthroughFileCopy: true,
      input: './content',
      output: './dist',
      includes: '../_includes',
      layouts: '../_layouts',
      data: '../_data'
    }
  };
}