export default {
  globs: [
    'components/**/src/*-component.js',
    'mixins/*-mixin.js',
    'directives/*.js',
    'muon-element/*.js'
  ],
  litelement: true,
  plugins: [
    {
      name: 'custom-element-define',
      moduleLinkPhase({ moduleDoc }) {
        const definitionDoc = {
          ...moduleDoc.exports[0],
          kind: 'custom-element-definition'
        };

        moduleDoc.exports = [...moduleDoc.exports || [], definitionDoc];
      }
    }
  ]
};
