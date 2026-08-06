import { execFileSync } from 'child_process';

const executeStorybook = (execArgs, execute = execFileSync) => {
  execute('storybook', execArgs, { stdio: 'inherit' });
};

export { executeStorybook };