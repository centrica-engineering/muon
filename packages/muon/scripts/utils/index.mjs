import ts from 'typescript';
import { analyzeText, analyzeSourceFile, transformAnalyzerResult } from 'web-component-analyzer';
import StyleDictionary from 'style-dictionary';
import formatHelpers from 'style-dictionary/lib/common/formatHelpers/index.js';
import _ from 'lodash';
import appRoot from 'app-root-path';
import { glob } from 'glob';
import globToRegExp from 'glob-to-regexp';
import fs from 'fs';
import path from 'path';

import styleConfig from '../style-dictionary.mjs';
import colorTransform from '../../tokens/utils/transforms/color.js';
import stringTransform from '../../tokens/utils/transforms/string.js';
import jsonReference from '../../tokens/utils/formats/reference.js';
import { getConfig, getDestination } from './config.mjs';
import { fileURLToPath } from 'url';
import merge from 'deepmerge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cleanup = (destination, cleanOnRollup = false) => {
  return new Promise((resolve) => {
    const cemFilePath = path.join(destination, 'custom-elements.json');
    const buildPath = path.join(__filename, '..', '..', '..', 'build');

    if (fs.existsSync(destination)) {
      if (cleanOnRollup) {
        // eslint-disable-next-line no-unused-expressions
        fs.rmSync(cemFilePath, { force: true });
      } else {
        fs.rmSync(destination, { force: true, recursive: true });
      }
    }

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    if (!cleanOnRollup) {
      fs.rmSync(buildPath, { force: true, recursive: true });
      fs.mkdirSync(buildPath);
    }
    return resolve();
  });
};

const filterPathToCustomElements = async (componentsList) => {
  let pathPattern = '*';

  if (!componentsList) {
    return undefined;
  }

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
  const componentsList = config?.components?.included;
  const pathPattern = await filterPathToCustomElements(componentsList);
  // initial Muon components
  let muonComponents = pathPattern ? path.join(__filename, '..', '..', '..', 'components', '**', `${pathPattern}-component.js`) : '';

  // additional components
  const additional = config?.components?.dir;
  if (additional) {
    muonComponents = muonComponents.length > 0 ? `{${muonComponents},${additional.toString()}}` : `${additional.toString()}`;
  }

  return glob.sync(muonComponents).map((f) => path.resolve(f));
};

const getPrefix = () => {
  const config = getConfig();
  return config?.components?.prefix || 'muon';
};

const getTagFromAnalyzerResult = (result) => {
  // @TODO: An assumption that the first component in the file is the component we are looking for
  const tags = result.componentDefinitions[0]?.declaration?.jsDoc?.tags;
  const tagName = tags?.filter((jsDocTag) => jsDocTag.tag === 'element')?.[0]?.comment;
  const prefix = tags?.filter((jsDocTag) => jsDocTag.tag === 'prefix')?.[0]?.comment ?? getPrefix();

  return { tagName, prefix };
};

const analyze = async () => {
  const files = (await findComponents()).map((file) => {
    const code = fs.readFileSync(file);

    return { fileName: file, text: code.toString() };
  });

  const { results } = analyzeText(files);

  return results.map((result) => {
    const { tagName, prefix } = getTagFromAnalyzerResult(result);
    return {
      file: result.sourceFile.fileName,
      name: tagName,
      exportName: result.sourceFile?.symbol?.exports?.keys()?.next()?.value,
      elementName: `${prefix}-${tagName}`
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
        obj[key] = [`${appRoot}/node_modules/${value}`];
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
    }).filter((alias) => alias);

    const defaultAlias = objGlobToRegexArr(defaultPaths);

    return [...additionalAlias, ...defaultAlias];
  }

  return undefined;
};

const analyzeComponents = async () => {
  const files = await findComponents();
  const paths = getAliasPaths('glob');
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
  const program = ts.createProgram(files, options);
  const sourceFiles = program.getSourceFiles().
    filter((sf) => files.map((f) => f.toLowerCase()).includes(sf.path.toLowerCase()));

  const results = sourceFiles.map((sourceFile) => analyzeSourceFile(sourceFile, {
    ts,
    program,
    verbose: true,
    config: {
      format: 'json',
      discoverNodeModules: true,
      excludedDeclarationNames: ['ScopedElementsMixin', 'ScopedElementsMixinImplementation']
    }
  }));

  return {
    results,
    program
  };
};

const sourceFilesAnalyzer = async () => {
  const { results, program } = await analyzeComponents();

  const tagNames = results?.map((result) => {
    const { tagName, prefix } = getTagFromAnalyzerResult(result);

    const elementName = `${prefix}-${tagName}`;
    result.componentDefinitions[0].tagName = elementName;
    return elementName;
  });

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
  let dictionaryConfig = {
    ...styleConfig
  };

  // Set the overriding tokens if there are any
  if (config?.tokens?.dir) {
    dictionaryConfig.source = config.tokens.dir;
  }

  if (config?.tokens?.configFile) {
    const { default: tokensConfig } = await import(path.join(process.cwd(), config.tokens.configFile));
    if (tokensConfig) {
      dictionaryConfig = merge(dictionaryConfig, tokensConfig);
    }
  }

  const tokenUtils = path.join(__dirname, '..', '..', 'tokens', 'utils');
  const cssFontTemplate = _.template(fs.readFileSync(path.join(tokenUtils, 'templates', 'font-face.css.template')));

  const styleDict = StyleDictionary.extend(dictionaryConfig);

  styleDict.registerFormat(jsonReference);

  cssFontTemplate.nested = true;

  styleDict.registerFormat({
    name: 'css/fonts',
    formatter: cssFontTemplate
  });

  const es6Formatter = function ({ dictionary, file }) {
    return formatHelpers.fileHeader({ file }) +
      'export default ' +
      JSON.stringify(dictionary.tokens, null, 2) + ';';
  };

  es6Formatter.nested = true;

  styleDict.registerFormat({
    name: 'es6/module',
    formatter: es6Formatter
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
  const compList = await analyze();
  let componentDefinition = `import '@muonic/muon/js/scoped-custom-element-registry.min.js';`;

  componentDefinition += compList.map(({ file, exportName }) => {
    return `import { ${exportName} } from '${file}';
    `;
  }).join('');

  const definingCompnents = compList.map(({ exportName, elementName }) => {
    return `customElements.define('${elementName}', ${exportName});`;
  });

  componentDefinition += `
    function defineComponents() {
      ${definingCompnents.join('')}
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        defineComponents();
      });
    } else {
      defineComponents();
    }
  `;

  return componentDefinition;
};

const componentImportExport = async () => {
  const compList = await analyze();
  let componentDefinition = `import '@muonic/muon/js/scoped-custom-element-registry.min.js';`;

  componentDefinition += compList.map(({ file, exportName }) => {
    return `import { ${exportName} } from '${file}';
    `;
  }).join('');

  componentDefinition += `
    export {
      ${compList.map(({ exportName }) => exportName).join(',')}
    };`;

  return componentDefinition;
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
  componentImportExport,
  runner,
  analyzeComponents,
  sourceFilesAnalyzer,
  getAliasPaths
};
