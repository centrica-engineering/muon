import ts from 'typescript';
import { analyzeText, analyzeSourceFile, transformAnalyzerResult } from 'web-component-analyzer';
import StyleDictionary from 'style-dictionary';
import formatHelpers from 'style-dictionary/lib/common/formatHelpers/index.js';
import _ from 'lodash';
import appRoot from 'app-root-path';
import glob from 'glob';
import globToRegExp from 'glob-to-regexp';
import fs from 'fs';
import path from 'path';

import styleConfig from '../style-dictionary.mjs';
import colorTransform from '../../tokens/utils/transforms/color.js';
import stringTransform from '../../tokens/utils/transforms/string.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {};

const cleanup = (destination, cleanOnRollup = false) => {
  return new Promise((resolve) => {
    const cemFilePath = path.join(destination, 'custom-elements.json');
    const buildPath = path.join(__filename, '..', '..', '..', 'build');

    if (fs.existsSync(destination)) {
      if (cleanOnRollup) {
        // eslint-disable-next-line no-unused-expressions
        fs.existsSync(cemFilePath) && fs.rmSync(cemFilePath);
      } else {
        fs.rmSync(destination, { force: true, recursive: true });
        fs.rmSync(buildPath, { force: true, recursive: true });
      }
    }

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    if (!cleanOnRollup) {
      fs.mkdirSync(buildPath);
    }
    return resolve();
  });
};

const getConfig = (configFile = 'muon.config.json') => {
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

const filterPathToCustomElements = async (componentsList) => {
  let pathPattern = '*';
  if (Array.isArray(componentsList) && componentsList?.length > 0) {
    if (componentsList.length > 1) {
      pathPattern = `{${componentsList.toString()}}`;
    } else {
      pathPattern = componentsList[0] === 'all' ? '*' : componentsList[0]; // single component defined within array
    }
  } else {
    pathPattern = componentsList === 'all' ? '*' : componentsList; // single component defined as string
  }
  return pathPattern;
};

const findComponents = async () => {
  const config = getConfig();
  const additional = config?.components?.dir;
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);
  // initial Muon components
  let muonComponents = path.join(__filename, '..', '..', '..', 'components', '**', `${pathPattern}-component.js`);
  // additional components
  if (additional) {
    muonComponents = `{${muonComponents},${additional}}`;
  }

  return glob.sync(muonComponents).map((f) => path.resolve(f));
};

const analyze = async () => {
  const files = (await findComponents()).map((file) => {
    const code = fs.readFileSync(file);

    return { fileName: file, text: code.toString() };
  });

  const { results } = analyzeText(files);

  return results.map((result) => {
    // @TODO: An assumption that the first component in the file is the component we are looking for
    return {
      file: result.sourceFile.fileName,
      name: result.componentDefinitions[0].tagName,
      exportName: result.sourceFile?.symbol?.exports?.keys()?.next()?.value
    };
  });
};

const getAliasPaths = (type) => {
  const defaultPaths = {
    '@muon/components/*': '@muonic/muon/components/*',
    '@muon/mixins/*': '@muonic/muon/mixins/*',
    '@muon/directives/*': '@muonic/muon/directives/*',
    '@muon/utils/*': '@muonic/muon/utils/*',
    '@muon/tokens': '@muonic/muon/build/tokens/es6/muon-tokens'
  };

  const config = getConfig();
  const alias = config?.alias || {};

  if (type === 'glob') {
    const paths = {
      ...alias,
      ...defaultPaths
    };
    const obj = {};

    Object.keys(paths).forEach((key) => {
      const value = paths[key];
      if (
        value.startsWith('./') ||
        value.startsWith('../') ||
        value.startsWith('/')
      ) {
        obj[key] = [value];
      } else {
        // @TODO: This needs a better way to find the node_modules folder
        obj[key] = [`node_modules/${value}`];
      }
    });

    return obj;
  }

  if (type === 'regex') {
    const objGlobToRegexArr = (paths) => {
      if (!paths) {
        return [];
      }

      return Object.keys(paths).map((key) => {
        //TODO: What happens if someone uses ** in their glob?
        const regKey = globToRegExp(key.replaceAll('*', '{*}'), { extended: true });
        //@TODO: See how to replace * better
        return { find: regKey, replacement: paths[key].replaceAll('*', '$1') };
      });
    };

    const additionalAlias = objGlobToRegexArr(config?.alias)?.map(({ find, replacement }) => {
      return {
        find,
        replacement: path.join(process.cwd(), replacement)
      };
    }).filter((alias) => alias) ?? [];

    const defaultAlias = objGlobToRegexArr(defaultPaths);

    return [...additionalAlias, ...defaultAlias];
  }

  return undefined;
};

const sourceFilesAnalyzer = async () => {
  const files = await findComponents();
  const paths = await getAliasPaths('glob');
  const options = {
    noEmitOnError: false,
    allowJs: true,
    maxNodeModuleJsDepth: 3,
    experimentalDecorators: true,
    target: ts.ScriptTarget.Latest,
    downlevelIteration: true,
    module: ts.ModuleKind.ESNext,
    strictNullChecks: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    noEmit: true,
    allowSyntheticDefaultImports: true,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    skipLibCheck: true,
    baseUrl: '.',
    paths
  };
  const filePaths = Array.isArray(files) ? files : [files];
  const program = ts.createProgram(filePaths, options);
  const sourceFiles = program.getSourceFiles().filter((sf) => files.includes(sf.fileName));

  const results = sourceFiles.map((sourceFile) => analyzeSourceFile(sourceFile, {
    ts,
    program,
    verbose: true,
    config: {
      format: 'json',
      discoverNodeModules: true
    }
  }));

  const tagNames = results?.map((result) => result.componentDefinitions[0].tagName);
  const tagsSet = new Set(tagNames);
  if (tagsSet?.size !== tagNames?.length) {
    console.error('---------------------------------------------');
    console.error('No two custom elements can have same tag name `%s`', tagNames);
    console.error('---------------------------------------------');
    process.exit(1);
  }
  return transformAnalyzerResult('json', results, program);
};

const styleDictionary = async () => {
  const config = getConfig();

  // Set the overriding tokens if there are any
  if (config.tokens && config.tokens.dir) {
    styleConfig.source = config.tokens.dir;
  }

  const tokenUtils = path.join(__dirname, '..', '..', 'tokens', 'utils');
  const cssFontTemplate = _.template(fs.readFileSync(path.join(tokenUtils, 'templates', 'font-face.css.template')));

  const styleDict = StyleDictionary.extend(styleConfig);

  styleDict.registerFormat({
    name: 'css/fonts',
    formatter: cssFontTemplate
  });

  styleDict.registerFormat({
    name: 'es6/module',
    formatter: function ({ dictionary, file }) {
      return formatHelpers.fileHeader({ file }) +
        'export default ' +
        JSON.stringify(dictionary.tokens, null, 2) + ';';
    }
  });

  styleDict.registerTransform(stringTransform);
  styleDict.registerTransform(colorTransform);

  return styleDict;
};

const createTokens = async () => {
  const dictionary = await styleDictionary();

  return dictionary.buildAllPlatforms();
};

const componentDefiner = async () => {
  const config = getConfig();
  const compList = await analyze();
  const prefix = config?.components?.prefix || 'muon';
  let componentDefinition = `import '@webcomponents/scoped-custom-element-registry';`;

  componentDefinition += compList.map(({ file, name, exportName }) => {
    const elName = `${prefix}-${name}`;

    return `import { ${exportName} } from '${file}';
    customElements.define('${elName}', ${exportName});
    `;
  }).join('');

  return componentDefinition;
};

const getDestination = () => {
  const config = getConfig();
  return config?.destination || 'dist';
};

const runner = async (file, overrideDestination) => {
  const destination = overrideDestination || getDestination();

  cleanup(destination).then(async () => {
    import(file);
  });
};

export {
  cleanup,
  getConfig,
  getDestination,
  filterPathToCustomElements,
  createTokens,
  componentDefiner,
  runner,
  sourceFilesAnalyzer,
  getAliasPaths
};
