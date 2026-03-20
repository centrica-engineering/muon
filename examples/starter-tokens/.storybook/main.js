const stories = require('@muonic/muon/storybook/find-stories');
const config = require('@muonic/muon/storybook/storybook.config');

const findStories = [
  ...stories(__dirname),
  '../components/**/story.@(js|jsx|ts|tsx)'
];

module.exports = {
  stories: [...findStories],
  ...config
};
