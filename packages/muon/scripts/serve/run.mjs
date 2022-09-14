import { startDevServer } from '@web/dev-server';
import commandLineArgs from 'command-line-args';
import StorybookConfig from '../../storybook/server.config.mjs';

const myServerDefinitions = [
  { name: 'no-open', type: Boolean },
  { name: 'no-watch', type: Boolean },
];

const myConfig = commandLineArgs(myServerDefinitions, { partial: true });

const main = async () => {
  await startDevServer({
    argv: myConfig._unknown,
    config: {
      ...StorybookConfig,
      open: !myConfig['no-open'],
      watch: !myConfig['no-watch'],
      mimeTypes: {
        // '**/muon.min.css': 'text/css', // @TODO: pass global style file name from config
        ...StorybookConfig.mimeTypes
      }
    }
  });
};

main();
