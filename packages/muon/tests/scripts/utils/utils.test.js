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

testRunner('findComponents', async (t) => {
  const componentsList = await utilsLibrary.findComponents();
  t.true(componentsList !== undefined);
  t.true(componentsList.includes(process.cwd() + '/components/card/src/card-component.js'));
});
