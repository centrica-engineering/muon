import testRunner from 'ava';
import sinon from 'sinon';
import appRoot from 'app-root-path';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import esmock from 'esmock';
import * as utilsLibrary from '../../../scripts/utils/index.mjs';

testRunner('filterPathToCustomElements default', async (t) => {
  const componentList = await utilsLibrary.filterPathToCustomElements('all');
  t.is(componentList, '*');
});

testRunner('filterPathToCustomElements default array', async (t) => {
  const componentList = await utilsLibrary.filterPathToCustomElements(['all']);
  t.is(componentList, '*');
});

testRunner('filterPathToCustomElements single component', async (t) => {
  const componentList = await utilsLibrary.filterPathToCustomElements('inputter');
  t.is(componentList, 'inputter');
});

testRunner('filterPathToCustomElements single component in array', async (t) => {
  const componentList = await utilsLibrary.filterPathToCustomElements(['inputter']);
  t.is(componentList, 'inputter');
});

testRunner('filterPathToCustomElements multiple component', async (t) => {
  const componentList = await utilsLibrary.filterPathToCustomElements(['inputter', 'image']);
  t.is(componentList, '{inputter,image}');
});

testRunner('getConfig default file and root', async (t) => {
  const config = utilsLibrary.getConfig();
  t.true(config !== undefined);
});

testRunner('getConfig new file default root', async (t) => {
  const config = utilsLibrary.getConfig('browserstack.json');
  t.true(config !== undefined);
});

testRunner('getConfig config file not exist', async (t) => {
  const stub = sinon.stub(process, 'exit');
  utilsLibrary.getConfig('test.json');
  t.true(process.exit.called);
  t.true(process.exit.calledWith(1));
  stub.restore();
});

testRunner('getConfig config file', async (t) => {
  const config = utilsLibrary.getConfig('tests/scripts/utils/muon.config.test.json');
  t.true(config !== undefined);
});

const componentsDefinitionMacro = async (t, expected) => {
  const componentDefinition = await utilsLibrary.componentDefiner();
  t.true(componentDefinition !== undefined);
  t.true(componentDefinition.indexOf(`import '@webcomponents/scoped-custom-element-registry';`) > -1);
  Object.keys(expected).forEach((component) => {
    t.true(componentDefinition.indexOf(`import { ${expected[component]} } from '${process.cwd()}/components/${component}/src/${component}-component.js';`) > -1);
    t.true(componentDefinition.indexOf(`customElements.define('muon-${component}', ${expected[component]});`) > -1);
  });
};
componentsDefinitionMacro.title = (providedTitle, expected) => `${providedTitle} => ${Object.keys(expected)}`;

testRunner('componentDefiner', componentsDefinitionMacro, { card: 'Card', cta: 'Cta', detail: 'Detail', form: 'Form', icon: 'Icon', inputter: 'Inputter', image: 'Image' });

testRunner('getAliasPath glob', async (t) => {
  const alias = utilsLibrary.getAliasPaths('glob');

  t.deepEqual(alias, {
    '@muon/components/*': [`${appRoot}/node_modules/@muonic/muon/components/*`],
    '@muon/mixins/*': [`${appRoot}/node_modules/@muonic/muon/mixins/*`],
    '@muon/directives/*': [`${appRoot}/node_modules/@muonic/muon/directives/*`],
    '@muon/utils/*': [`${appRoot}/node_modules/@muonic/muon/utils/*`],
    '@muon/tokens': [`${appRoot}/node_modules/@muonic/muon/build/tokens/es6/muon-tokens`]
  });
});

testRunner('getAliasPath regex', async (t) => {
  const alias = utilsLibrary.getAliasPaths('regex');
  t.deepEqual(alias, [
    {
      find: /^@muon\/components\/(.*)$/,
      replacement: '@muonic/muon/components/$1'
    },
    {
      find: /^@muon\/mixins\/(.*)$/,
      replacement: '@muonic/muon/mixins/$1'
    },
    {
      find: /^@muon\/directives\/(.*)$/,
      replacement: '@muonic/muon/directives/$1'
    },
    {
      find: /^@muon\/utils\/(.*)$/,
      replacement: '@muonic/muon/utils/$1'
    },
    {
      find: /^@muon\/tokens$/,
      replacement: '@muonic/muon/build/tokens/es6/muon-tokens'
    }
  ]);
});

testRunner('getAliasPath invalid', async (t) => {
  const alias = utilsLibrary.getAliasPaths('invalid');
  t.true(alias === undefined);
});

testRunner('getAliasPath config alias regex', async (t) => {
  const stub = await esmock('../../../scripts/utils/index.mjs', {
    '../../../scripts/utils/config.mjs': {
      getConfig: (configFile) => JSON.parse(fs.readFileSync('tests/scripts/utils/muon.config.test.json').toString())
    }
  });
  const alias = stub.getAliasPaths('regex');
  t.true(alias !== undefined);
  t.deepEqual(alias, [
    {
      find: /^@muon\/utils\/validation$/,
      replacement: `${process.cwd()}/utils/validation`
    },
    {
      find: /^@muon\/components\/(.*)$/,
      replacement: '@muonic/muon/components/$1'
    },
    {
      find: /^@muon\/mixins\/(.*)$/,
      replacement: '@muonic/muon/mixins/$1'
    },
    {
      find: /^@muon\/directives\/(.*)$/,
      replacement: '@muonic/muon/directives/$1'
    },
    {
      find: /^@muon\/utils\/(.*)$/,
      replacement: '@muonic/muon/utils/$1'
    },
    {
      find: /^@muon\/tokens$/,
      replacement: '@muonic/muon/build/tokens/es6/muon-tokens'
    }
  ]);
});

testRunner('getAliasPath config alias glob', async (t) => {
  const stub = await esmock('../../../scripts/utils/index.mjs', {
    '../../../scripts/utils/config.mjs': {
      getConfig: (configFile) => JSON.parse(fs.readFileSync('tests/scripts/utils/muon.config.test.json').toString())
    }
  });
  const alias = stub.getAliasPaths('glob');
  t.true(alias !== undefined);
  t.deepEqual(alias, {
    '@muon/utils/validation': ['./utils/validation'],
    '@muon/components/*': [
      `${appRoot}/node_modules/@muonic/muon/components/*`
    ],
    '@muon/mixins/*': [
      `${appRoot}/node_modules/@muonic/muon/mixins/*`
    ],
    '@muon/directives/*': [
      `${appRoot}/node_modules/@muonic/muon/directives/*`
    ],
    '@muon/utils/*': [
      `${appRoot}/node_modules/@muonic/muon/utils/*`
    ],
    '@muon/tokens': [
      `${appRoot}/node_modules/@muonic/muon/build/tokens/es6/muon-tokens`
    ]
  });
});

testRunner('sourceFilesAnalyzer', async (t) => {
  const result = await utilsLibrary.sourceFilesAnalyzer();
  const jsonResult = JSON.parse(result);

  const components = ['card', 'cta', 'detail', 'form', 'icon', 'image', 'inputter', 'inputter-detail'];
  const propertiesMap = {
    card: ['standardTemplate', 'image', 'alt', 'background', 'type'],
    cta: ['href', 'standardTemplate', 'submitTemplate', 'resetTemplate', 'loading', 'loadingMessage', 'disabled', 'icon', 'type'],
    detail: ['icon', 'standardTemplate', 'open', 'type'],
    form: ['standardTemplate', 'type'],
    icon: ['size', 'sizes', 'iconSize', 'standardTemplate', 'name', 'category', 'allSizes', 'url', 'describe', 'type'],
    image: ['src', 'placeholderImage', 'standardTemplate', 'background', 'backgroundsize', 'alt', 'ratio', 'placeholder', 'loading', 'type'],
    inputter: ['helper', 'slottedStyles', 'isHelperOpen', 'isPristine', 'isDirty', 'validity', 'validationMessage', 'validation', 'disableNative', 'showMessage', 'name', 'value', 'labelID', 'heading', 'mask', 'separator', 'type'],
    'inputter-detail': ['icon', 'standardTemplate', 'open', 'type']
  };
  t.deepEqual(jsonResult.tags?.map((tag) => tag.name), components);

  components.forEach((component) => {
    t.deepEqual(jsonResult.tags.filter((tag) => tag.name === component)[0].properties?.map(
      (property) => property.name), propertiesMap[component]);
  });
  jsonResult.tags?.map((tag) => {
    t.true(tag.description !== undefined, `${tag.name} description is not present`);
  });
});

testRunner('sourceFilesAnalyzer error', async (t) => {
  const stub = await esmock('../../../scripts/utils/index.mjs', {
    '../../../scripts/utils/config.mjs': {
      getConfig: (configFile) => JSON.parse(fs.readFileSync('tests/scripts/utils/muon.config.test.json').toString())
    }
  });
  const sinonStub = sinon.stub(process, 'exit');
  await stub.sourceFilesAnalyzer();
  t.true(process.exit.called);
  t.true(process.exit.calledWith(1));
  sinonStub.restore();
});

testRunner('sourceFilesAnalyzer single file', async (t) => {
  const stub = await esmock('../../../scripts/utils/index.mjs', {
    '../../../scripts/utils/config.mjs': {
      getConfig: (configFile) => JSON.parse(fs.readFileSync('tests/scripts/utils/single.component.config.json').toString())
    }
  });
  const result = await stub.sourceFilesAnalyzer();
  const jsonResult = JSON.parse(result);

  const components = ['card'];
  const propertiesMap = {
    card: ['standardTemplate', 'image', 'alt', 'background', 'type'],
  };
  t.deepEqual(jsonResult.tags?.map((tag) => tag.name), components);

  components.forEach((component) => {
    t.deepEqual(jsonResult.tags.filter((tag) => tag.name === component)[0].properties?.map(
      (property) => property.name), propertiesMap[component]);
  });
  jsonResult.tags?.map((tag) => {
    t.true(tag.description !== undefined, `${tag.name} description is not present`);
  });
});

testRunner('create tokens', async (t) => {
  await utilsLibrary.createTokens();
  t.true(fs.existsSync(path.join(process.cwd(), 'build', 'tokens', 'css', 'mn-fonts.css')), 'font css file not exist');
  t.true(fs.existsSync(path.join(process.cwd(), 'build', 'tokens', 'es6', 'muon-tokens-module.js')), 'muon-tokens-module.js don\'t exist');
  t.true(fs.existsSync(path.join(process.cwd(), 'build', 'tokens', 'es6', 'muon-tokens.js')), 'muon-tokens.js don\'t exist');
  t.true(fs.existsSync(path.join(process.cwd(), 'build', 'tokens', 'es6', 'muon-tokens.mjs')), 'muon-tokens.mjs don\'t exist');
  t.true(fs.existsSync(path.join(process.cwd(), 'build', 'tokens', 'json', 'muon-tokens-reference.json')), 'muon-tokens-reference.json don\'t exist');
});

testRunner('getDestination', async (t) => {
  const destination = utilsLibrary.getDestination();
  t.is(destination, 'dist');
});

testRunner('runner', async (t) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  utilsLibrary.runner(path.join(__dirname, 'test-runner.mjs'));
  t.pass();
});

testRunner('cleanup on rollup', async (t) => {
  const destination = utilsLibrary.getDestination();
  const cemPath = path.join(destination, 'custom-elements.json');
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  fs.openSync(cemPath, 'w');
  t.true(fs.existsSync(destination));
  t.true(fs.existsSync(cemPath));
  utilsLibrary.cleanup(destination, true);
  t.true(fs.existsSync(destination));
  t.false(fs.existsSync(cemPath));
});

testRunner('cleanup on serve', async (t) => {
  const destination = utilsLibrary.getDestination();
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
  t.true(fs.existsSync(destination));
  utilsLibrary.cleanup(destination);
  t.true(fs.existsSync(destination));
});
