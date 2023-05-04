import { Progress } from './progress-component';
import setup from '@muonic/muon/storybook/stories';

const details = setup('progress', Progress, 'mnx');

export default {
  ...details.defaultValues,
  argTypes: {
    steps: {
      options: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      control: {
        type: 'select'
      }
    },
    current: {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      control: {
        type: 'select'
      }
    }
  }
};

export const ProgressStory = (args) => details.template(args);
ProgressStory.args = {
  current: 3,
  steps: 10
};
