import path from 'path';
import fs from 'fs';

const findConfig = (configFile) => {
  let directory = process.cwd();

  while (true) {
    const configPath = path.resolve(directory, configFile);

    if (fs.existsSync(configPath)) {
      return configPath;
    }

    const parent = path.dirname(directory);
    if (parent === directory) {
      return path.resolve(process.cwd(), configFile);
    }
    directory = parent;
  }
};

const getConfig = (configFile = 'muon.config.json') => {
  let config = {};
  try {
    const configPath = findConfig(configFile);
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
