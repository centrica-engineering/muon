const formatter = function ({ dictionary }) {
  const tokens = dictionary.allTokens.map((token) => {
    token.usesReference = dictionary.usesReference(token.original.value);
    if (token.usesReference) {
      token.references = dictionary.getReferences(token.original.value);
    }

    token.nestedName = token.path.join('.').toLowerCase();

    return token;
  });

  return JSON.stringify(tokens, null, 2);
};

formatter.nested = true;

module.exports = {
  name: 'json/reference',
  formatter
};
