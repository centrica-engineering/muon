#!/usr/bin/env node
import { getConfig } from "../../utils/index.mjs";
import * as tokens from '@muons/library/build/tokens/es6/muon-tokens.mjs';
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

const getComponentClassName = (componentName) => {
    return componentName.charAt(0).toUpperCase() + componentName.slice(1);  
};

const componentDefiner = async () => {
  const config = await getConfig();
  let componentsList = config?.components?.included;

  if(!componentsList || componentsList === 'all') {
    componentsList = await getDirectories(componentUrl);
  }

  let componentDefinition = '';
  const prefix = tokens.BRAND_NAMESPACE || 'muon';
  componentsList.forEach((componentName) => {
    const tagName = prefix + '-'+ componentName;
    const componentClassName = getComponentClassName(componentName);
    componentDefinition += `import { ${componentClassName} } from '@muons/library/components/${componentName}';`;
    componentDefinition += `customElements.define(\'${tagName}\', ${componentClassName});`; 
  });
  return componentDefinition;
};

export {
  componentDefiner
};
