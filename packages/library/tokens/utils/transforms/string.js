module.exports = {
  name: 'string/css',
  type: 'value',
  matcher: (token) => token.type === 'string',
  transformer: (token) => `"${token.value}"`
};
