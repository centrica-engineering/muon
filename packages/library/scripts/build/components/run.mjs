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

  if(componentsList === 'all') {
    componentsList = await getDirectories(componentUrl);
  }

  const destination = path.join(__filename, '..', '..', '..', '..', 'build');
  const componentDefinitionDest = path.join(destination, 'custom-elements.js');
  let componentDefinition = '';
  const prefix = variables.BRAND_NAMESPACE || 'muon';
  componentsList.forEach((componentName) => {
    componentDefinition += `\n const ${componentName} = await import('@muons/library/components/${componentName}');`;

    const tagName = prefix + '-'+ componentName;
    componentDefinition += '\n customElements.define(\'';
    componentDefinition += tagName + '\', Object.keys(';
    componentDefinition += componentName + ')[0]);'; 
  });
  fs.writeFileSync(componentDefinitionDest, componentDefinition, 'utf8');

  // const prefix = variables.BRAND_NAMESPACE || 'muon';
  // componentsList.forEach((componentName) => {
  //   const tagName = prefix + '-'+ componentName;
  //   customElements.define(tagName, async (componentName) => {
  //     const component = await import(`@muons/library/components/${componentName}`);
  //     return Object.keys(component)[0];
  //   });
  // });
};

componentDefiner();