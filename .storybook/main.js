const findStories = require('@muons/library/storybook/find-stories.js');

module.exports = {
  stories: async () => [...findStories()],
}