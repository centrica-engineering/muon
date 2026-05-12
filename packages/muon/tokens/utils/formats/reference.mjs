import { getReferences, usesReferences } from 'style-dictionary/utils';

const format = ({ dictionary }) => {
  const tokens = dictionary.allTokens.map((token) => {
    const originalValue = token.original?.$value ?? token.original?.value;
    token.usesReference = usesReferences(originalValue);

    if (token.usesReference) {
      token.references = getReferences(originalValue, dictionary.tokens);
    }

    token.nestedName = token.path.join('.').toLowerCase();

    return token;
  });

  return JSON.stringify(tokens, null, 2);
};

format.nested = true;

export default {
  name: 'json/reference',
  format
};
