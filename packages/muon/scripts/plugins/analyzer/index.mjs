import { dirSync } from 'tmp';
import fs from 'fs';
import path from 'path';
import { findComponents, getConfig, createComponentElementsJson } from '../../utils/index.mjs';

const config = getConfig(`muon.config.json`);

const tmp = dirSync({ unsafeCleanup: true });
const tmpName = tmp.name;

const writeFileSyncRecursive = (filename, content = '') => {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content);
};

const getTmpFilePath = (tmpName, file) => path.join(tmpName, path.relative(process.cwd(), file));

const runElementJson = async () => {
  const files = (await findComponents()).map((file) => getTmpFilePath(tmpName, file));
  await createComponentElementsJson(files);
};

const shouldSkip = (file) => {
  return file.indexOf('node_modules') > 0 || file.indexOf('virtual:') > 0;
};

const createElementJsonFile = async () => {
  const destination = config?.destination || 'dist';
  writeFileSyncRecursive(path.join(destination, 'custom-elements.json'), JSON.stringify({ tags: [] }));
};

let createElementJsonTimer;
const analyzerPlugin = () => {
  return {
    name: 'analyzer',
    async moduleParsed(obj) {
      if (shouldSkip(obj.id)) {
        return;
      }
      writeFileSyncRecursive(getTmpFilePath(tmpName, obj.id), obj.code);
      if (createElementJsonTimer) {
        clearTimeout(createElementJsonTimer);
      }
      createElementJsonTimer = setTimeout(runElementJson, 500);
    },
    async serverStart() {
      await createElementJsonFile();
    },
    serverStop() {
      tmp.removeCallback();
    },
    async buildStart() {
      await createElementJsonFile();
    },
    async buildEnd() {
      tmp.removeCallback();
    },
    async generateBundle(options, bundle) {
      let code = '';
      Object.keys(bundle).forEach((file) => {
        Object.keys(bundle[file].modules).forEach((module) => {
          code += `
          ${bundle[file].modules[module].code}
          `;
        });
      });

      writeFileSyncRecursive(getTmpFilePath(tmpName, 'code.js'), code);
      createComponentElementsJson([getTmpFilePath(tmpName, 'code.js')]);
    }
  };
};

export { analyzerPlugin as default };
