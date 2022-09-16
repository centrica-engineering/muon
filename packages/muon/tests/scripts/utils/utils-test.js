const testRunner = require('ava');
const sinon = require('sinon');

let utilsLibrary;
testRunner.before(async () => {
  await import('../../../scripts/utils/index.mjs').then((utils) => {
    utilsLibrary = utils;
  });
});

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
  sinon.stub(process, 'exit');
  utilsLibrary.getConfig('test.json');
  t.true(process.exit.called);
  t.true(process.exit.calledWith(1));
});

testRunner('getConfig config file', async (t) => {
  const config = utilsLibrary.getConfig('tests/scripts/utils/test.json');
  t.true(config !== undefined);
});

const componentsListMacro = async (t, expected) => {
  const componentsList = await utilsLibrary.findComponents();
  t.true(componentsList !== undefined);
  expected.forEach((component) => {
    t.true(componentsList.includes(`${process.cwd()}/components/${component}/src/${component}-component.js`));
  });
};
componentsListMacro.title = (providedTitle, expected) => `${providedTitle} => ${expected}`;

testRunner('findComponents', componentsListMacro, ['card', 'cta', 'detail', 'form', 'icon', 'inputter', 'image']);

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
    '@muon/components/*': ['node_modules/@muonic/muon/components/*'],
    '@muon/mixins/*': ['node_modules/@muonic/muon/mixins/*'],
    '@muon/directives/*': ['node_modules/@muonic/muon/directives/*'],
    '@muon/utils/*': ['node_modules/@muonic/muon/utils/*'],
    '@muon/tokens': ['node_modules/@muonic/muon/build/tokens/es6/muon-tokens']
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

testRunner('sourceFilesAnalyzer', async (t) => {
  const result = await utilsLibrary.sourceFilesAnalyzer();
  const jsonResult = JSON.parse(result);

  const components = ['card', 'cta', 'detail', 'form', 'icon', 'image', 'inputter', 'inputter-detail'];
  t.deepEqual(jsonResult.tags?.map((tag) => tag.name), components);

  components.forEach((component) => {
    console.log(`properties of ${component} ${jsonResult.tags.filter((tag) => tag.name === component)[0].properties?.map((property) => property.name)}`);
    t.deepEqual(jsonResult.tags.filter((tag) => tag.name === component)[0].properties?.map((property) => property.name), ['type']);
  });
  jsonResult.tags?.map((tag) => {
    t.true(`${tag.name} description is not present`, tag.description);
  });
});
