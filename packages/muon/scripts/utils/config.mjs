import path from 'path';
import appRoot from 'app-root-path';
import fs from 'fs';

const getConfig = (configFile = 'muon.config.json') => {
  let config = {};
  try {
    let configPath = path.join(process.cwd(), configFile);

    if (!fs.existsSync(configPath)) {
      configPath = path.join(`${appRoot}/${configFile}`);
    }
    config = JSON.parse(fs.readFileSync(configPath).toString());
  } catch (e) {
    console.error('Missing config, is this the right folder?', e);
    process.exit(1);
  }

  return config;
};

const getDestination = () => {
  const config = getConfig();
  return config?.destination || 'dist';
};

export {
  getConfig,
  getDestination
};
