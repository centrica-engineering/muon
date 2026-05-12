const stories = require('@muonic/muon/storybook/find-stories');
const config = require('@muonic/muon/storybook/storybook.config');

const findStories = [
    '../components/**/story.@(js|jsx|ts|tsx)',
    stories(__dirname)
  ];

module.exports = {
  stories: [...findStories],
  ...config
};
