import customValidations from '@muons/library/utils/validation';

const isFirstName = (inputter, value) => {
  const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]{1,24}$/i.test(value);
  return value.length > 0 && !isName && 'Your First Name does not look right';
};

const validations = {
  ...customValidations,
  isFirstName
};

export { validations as default };
