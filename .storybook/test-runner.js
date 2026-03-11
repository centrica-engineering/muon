// .storybook/test-runner.js
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';

const config = {
  async preVisit(page, context) {
    // Inject Axe utilities in the page before the story renders
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not test a11y for stories that disable a11y
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    // in Storybook 6.x, the selector is #root
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // pass axe options defined in @storybook/addon-a11y
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};
export default config;
