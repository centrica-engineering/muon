const stories = require('@muonic/muon/storybook/find-stories');

const findStories = async () => {
  const muonStories = await stories(__dirname);
  console.log([
    ...muonStories,
    '../components/**/story.@(js|jsx|ts|tsx)'
  ])
  return [
    ...muonStories,
    '../components/**/story.@(js|jsx|ts|tsx)'
  ]
}

module.exports = {
  stories: async () => await findStories()
};
