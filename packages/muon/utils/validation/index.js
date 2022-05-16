import {
  VALIDATION_IS_REQUIRED_MESSAGE,
  VALIDATION_IS_NUMBER_MESSAGE,
  VALIDATION_IS_INTEGER_MESSAGE,
  VALIDATION_IS_EMAIL_MESSAGE,
  VALIDATION_MIN_LENGTH_MESSAGE,
  VALIDATION_MAX_LENGTH_MESSAGE,
  VALIDATION_IS_BETWEEN_MESSAGE,
  VALIDATION_IS_DATE_MESSAGE,
  VALIDATION_MIN_DATE_MESSAGE,
  VALIDATION_MAX_DATE_MESSAGE,
  VALIDATION_HAS_NUMBERS_MESSAGE,
  VALIDATION_HAS_LETTERS_MESSAGE
} from '@muonic/muon/build/tokens/es6/muon-tokens';

const regularExpressions = {
  // eslint-disable-next-line no-useless-escape
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
};

const withoutChar = (value, separator) => {
  return value.split(separator).join('');
};

const convertIsoDate = (isoDate) => {
  return isoDate.split('-').reverse().join('/');
};

const isRequired = (inputter, value) => {
  return (value === undefined || value.length === 0) && VALIDATION_IS_REQUIRED_MESSAGE;
};

const isNumber = (inputter, value) => {
  const number = inputter.separator ? withoutChar(value, inputter.separator) : value;
  const val = Number(number);
  const isNum = typeof val === 'number' && !isNaN(val);
  return value.length > 0 && !isNum && VALIDATION_IS_NUMBER_MESSAGE;
};

const isInteger = (inputter, value) => {
  const number = inputter.separator ? withoutChar(value, inputter.separator) : value;
  const val = Number(number);
  const isInt = typeof val === 'number' && isFinite(val) && Math.floor(val) === val;

  return value.length > 0 && !isInt && VALIDATION_IS_INTEGER_MESSAGE;
};

const isEmail = (inputter, value) => {
  const emailRegexp = new RegExp(regularExpressions.email, 'i');
  return value.length > 0 && !emailRegexp.test(value) && VALIDATION_IS_EMAIL_MESSAGE;
};

const minLength = (inputter, value, min) => {
  const str = inputter.separator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && str.length < min && VALIDATION_MIN_LENGTH_MESSAGE.replace('$min', min);
};

const maxLength = (inputter, value, max) => {
  const str = inputter.separator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && str.length > max && VALIDATION_MAX_LENGTH_MESSAGE.replace('$max', max);
};

const isBetween = (inputter, value, min, max) => {
  const str = inputter.separator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && (str.length < min || str.length > max) && VALIDATION_IS_BETWEEN_MESSAGE.replace('$min', min).replace('$max', max);
};

const stringToDate = (dateString) => {
  const arr = dateString.indexOf('/') !== -1 ? dateString.split('/') : dateString.split('-');

  let dayString;
  let monthString;
  let yearString;

  if (dateString.indexOf('/') !== -1) {
    dayString = arr[0];
    monthString = arr[1];
    yearString = arr[2];
  } else {
    dayString = arr[2];
    monthString = arr[1];
    yearString = arr[0];
  }

  const day = parseInt(dayString, 10);
  const month = parseInt(monthString, 10) - 1;
  const year = parseInt(yearString, 10);
  const date = new Date(year, month, day);
  return date;
};

const isDate = (inputter, dateString) => {
  const isValid = (string, length, a, b) => {
    return string && string.length === length && isNumeric(string) && a === b;
  };

  const arr = dateString.indexOf('/') !== -1 ? dateString.split('/') : dateString.split('-');

  let dayString;
  let monthString;
  let yearString;

  if (dateString.indexOf('/') !== -1) {
    dayString = arr[0];
    monthString = arr[1];
    yearString = arr[2];
  } else {
    dayString = arr[2];
    monthString = arr[1];
    yearString = arr[0];
  }

  const day = parseInt(dayString, 10);
  const month = parseInt(monthString, 10) - 1;
  const year = parseInt(yearString, 10);

  // Check formatting first
  const formatValid =
    dateString.length === 10 && isNumeric(dayString) && isNumeric(monthString) && isNumeric(yearString);

  if (dateString.length > 0 && !formatValid) {
    return VALIDATION_IS_DATE_MESSAGE;
  }

  // Check date is a valid date
  const date = new Date(year, month, day);
  const dayValid = isValid(dayString, 2, date.getDate(), day);
  const monthValid = isValid(monthString, 2, date.getMonth(), month);
  const yearValid = isValid(yearString, 4, date.getFullYear(), year);
  const valid = dayValid && monthValid && yearValid;

  return dateString.length > 0 && !valid ? VALIDATION_IS_DATE_MESSAGE : '';
};

const minDate = (inputter, value, min) => {
  if (isDate(inputter, value) === '') {
    const minDate = stringToDate(min);
    const date = stringToDate(value);
    const displayDate = convertIsoDate(min);

    if (value.length > 0 && date < minDate) {
      return VALIDATION_MIN_DATE_MESSAGE.replace('$minDate', displayDate);
    }
  }

  return '';
};

const maxDate = (inputter, value, max) => {
  if (isDate(inputter, value) === '') {
    const maxDate = stringToDate(max);
    const date = stringToDate(value);
    const displayDate = convertIsoDate(max);

    if (value.length > 0 && date > maxDate) {
      return VALIDATION_MAX_DATE_MESSAGE.replace('$maxDate', displayDate);
    }
  }

  return '';
};

/**
 * A function to check whether the value is numeric or not.
 *
 * @function
 * @param {string} value -  value to check.
 * @returns {boolean} - True or false.
 * @example
 * // returns false
 * isNumeric('abcd');
 * @example
 * // returns true
 * isNumeric('374');
 */
function isNumeric(value) {
  const regex = /[^0-9]/g;
  return value && !value.match(regex);
}

const hasNumbers = (inputter, value) => {
  return value.length > 0 && !/\d/.test(value) ? VALIDATION_HAS_NUMBERS_MESSAGE : '';
};

const hasLetters = (inputter, value) => {
  const regExp = /[a-zA-Z]/g;
  return value.length > 0 && !regExp.test(value) ? VALIDATION_HAS_LETTERS_MESSAGE : '';
};

const validations = {
  isRequired,
  isNumber,
  isInteger,
  isEmail,
  minDate,
  maxDate,
  minLength,
  maxLength,
  isBetween,
  isDate,
  hasNumbers,
  hasLetters
};

export { validations as default };
