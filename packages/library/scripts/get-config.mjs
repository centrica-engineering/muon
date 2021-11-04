import fs from 'fs';

let config = {};

const getConfig = (configFile = 'muon.config.json') => {
  try {
    config = JSON.parse(fs.readFileSync(configFile).toString());
  } catch (e) {
    console.error('Missing config, is this the right folder?', e);
    process.exit(1);
  }

  return config;
};

export {
  getConfig
};
