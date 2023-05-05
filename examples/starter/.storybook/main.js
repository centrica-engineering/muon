const stories = require('@muonic/muon/storybook/find-stories');

const findStories = async () => {
  const muonStories = await stories(__dirname);
  return [
    ...muonStories,
    '../components/**/story.@(js|jsx|ts|tsx)',
    '../mnx-components/**/story.@(js|jsx|ts|tsx)'
  ]
}

module.exports = {
  stories: async () => await findStories()
};
