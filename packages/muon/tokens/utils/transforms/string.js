module.exports = {
  name: 'string/css',
  type: 'value',
  filter: (token) => token.type === 'string',
  transform: (token) => `"${token.value}"`
};
