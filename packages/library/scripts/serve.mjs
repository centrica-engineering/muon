#!/usr/bin/env node
import { cleanup } from './cleanup.mjs';
import { createTokens } from './style-dictionary-create.mjs';
import { getConfig } from './get-config.mjs';

const run = async () => {
  const config = await getConfig();
  const destination = config?.destination || 'dist';

  cleanup(destination).then(async () => {
    await createTokens();

    import('./run-serve.mjs');
  });
};

run();
