#!/usr/bin/env node
import { getConfig } from "../../utils/index.mjs";
import * as variables from '../../../build/tokens/es6/muon-tokens.mjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const componentUrl = path.join(__filename, '..', '..', '..', '..', 'components');

const getDirectories = async (source) => {
  return (fs.readdirSync(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);
};

const componentDefiner = async () => {
  const config = await getConfig();
  let componentsList = config?.components?.included;

  if(!componentsList || componentsList === 'all') {
    componentsList = await getDirectories(componentUrl);
  }

  let componentDefinition = '';
  const prefix = variables.BRAND_NAMESPACE || 'muon';
  componentsList.forEach((componentName) => {
    const tagName = prefix + '-'+ componentName;
    componentDefinition += `import ${componentName} from '@muons/library/components/${componentName}';`;
    componentDefinition += `customElements.define(\'${tagName}\', ${componentName});`; 
  });
  return componentDefinition;
};

export {
  componentDefiner
};