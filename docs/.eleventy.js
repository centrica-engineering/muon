

module.exports = eleventyConfig => {
  return {
    dir: {
      passthroughFileCopy: true,
      input: "./content",
      output: "./dist",
      // includes: "../_includes",
      layouts: "../_layouts",
      data: "../_data"
    }
  };
}