import testRunner from 'ava';
import sinon from 'sinon';
import { executeStorybook } from '../../../scripts/build/storybook/execute.mjs';

testRunner('storybook build inherits child process output', async (t) => {
  const execute = sinon.stub();
  const execArgs = [
    'build',
    '--config-dir', `${process.cwd()}/.storybook`,
    '--output-dir', `${process.cwd()}/storybook-static`
  ];

  executeStorybook(execArgs, execute);

  t.true(execute.calledOnce);
  t.deepEqual(execute.firstCall.args, [
    'storybook',
    execArgs,
    { stdio: 'inherit' }
  ]);
});