import stories from '@muonic/muon/storybook/find-stories';
import config from '@muonic/muon/storybook/storybook.config.mjs';

/** @type {import('@web/storybook-framework-web-components').StorybookConfig} */
const findStories = async () => {
  const muonStories = await stories(__dirname);
  return [
    ...muonStories,
    '../examples/stories/*.story.@(js|jsx|ts|tsx)'
  ]
}

module.exports = {
  stories: async () => await findStories(),
  ...config,
}
