const regularExpressions = {
  // eslint-disable-next-line no-useless-escape
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  // eslint-disable-next-line no-useless-escape
  phone: /^([\+]?1\s*[-\/\.]?\s*)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT]?[\.]?|extension)\s*([#*\d]+))*$/,
  // eslint-disable-next-line no-useless-escape
  url: /(?:([A-Za-z]+):)?(\/{0,3})[a-zA-Z0-9][a-zA-Z-0-9]*(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-{}]*[\w@?^=%&amp;\/~+#-{}])??/,
  // eslint-disable-next-line no-useless-escape
  password: /^(?=.*\d)(?=.*[a-zA-Z])([\w:!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]{8,20})$/
};

const withoutChar = (value, separator) => {
  if (!separator) {
    return value;
  }
  return value.split(separator).join('');
};

const convertIsoDate = (isoDate, readableToIso) => {
  if (readableToIso === true) {
    return isoDate.split('/').reverse().join('-');
  }

  return isoDate.split('-').reverse().join('/');
};

const isRequired = (inputter, value) => {
  return (value === undefined || value.length === 0) && 'This field is required';
};

const isNumber = (inputter, value) => {
  const number = inputter.ignoreSeparator ? withoutChar(value, inputter.separator) : value;
  const val = Number(number);
  const isNum = typeof val === 'number' && !isNaN(val);
  return value.length > 0 && !isNum && 'Needs to be a number';
};

const isInteger = (inputter, value) => {
  const number = inputter.ignoreSeparator ? withoutChar(value, inputter.separator) : value;
  const val = Number(number);
  const isInt = typeof val === 'number' && isFinite(val) && Math.floor(val) === val;

  return value.length > 0 && !isInt && 'Needs to be a whole number';
};

const isPassword = (inputter, value) => {
  const regex = regularExpressions.password;
  return value.length > 0 && !regex.test(value) && 'Your password should be between 8 and 20 characters and a mix of both letters and numbers';
};

const isPostcode = (inputter, value, includeEircode) => {
  const checkPostcode = function (str) {
    const regList = [
      '^((([A-PR-UWYZ][0-9])',
      '([A-PR-UWYZ][0-9][0-9])',
      '([A-PR-UWYZ][A-HK-Y][0-9])',
      '([A-PR-UWYZ][A-HK-Y][0-9][0-9])',
      '([A-PR-UWYZ][0-9][A-HJKSTUW])',
      '([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\\s?([0-9][ABD-HJLNP-UW-Z]{2})',
      '(GIR)\\s?(0AA))\\ ?$'
    ];
    if (includeEircode) {
      regList.push('(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$');
    }
    const postcodeRegexp = new RegExp(regList.join('|'), 'i');

    return postcodeRegexp.test(str);
  };

  return value.length > 0 && !checkPostcode(value) && 'Not a valid postcode';
};

const isFirstName = (inputter, value) => {
  const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]{1,24}$/i.test(value);

  return value.length > 0 && !isName && 'Your First Name does not look right';
};

const isLastName = (inputter, value) => {
  const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s']{1,32}$/i.test(value);

  return value.length > 0 && !isName && 'Your Last Name does not look right';
};

const isFullName = (inputter, value) => {
  const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s']{1,60}$/i.test(value);

  return value.length > 0 && !isName && 'Your Full Name does not look right';
};

const isTitle = (inputter, value) => {
  const title = [
    'Mr',
    'Mrs',
    'Ms',
    'Miss',
    'Dr',
    'Sir',
    'Reverend',
    'Dame',
    'Lady',
    'Professor',
    'Lord'
  ];

  return value.length > 0 && !title.includes(value) && 'Your title does not look right';
};

const isEmail = (inputter, value) => {
  const emailRegexp = new RegExp(regularExpressions.email, 'i');
  return value.length > 0 && !emailRegexp.test(value) && 'Your email does not look right';
};

const phoneValidation = (value, isMobile, includeEircode) => {
  const eirMobilePrefix = '822|83|84|85|86|87|88|89';
  const eirPrefix = '1|505|504|404|402|99|98|97|96|95|94|93|91|90|74|71|69|68|67|66|65|64|63|62|61|59|58|57|56|53|52|51|49|47|46|45|44|43|42|41|29|28|27|26|25|24|23|22|21';

  const isCorrectlyFormatted = (number) => {
    const eir = new RegExp(`^0(${eirPrefix}|${eirMobilePrefix})`);
    const regexPhoneFormat = includeEircode && eir.test(number) ? /^0[0-9]{8,10}$/ : /^0[0-9]{10}$/;

    return regexPhoneFormat.test(number);
  };

  const isNotReserved = (number) => {
    const dramaRegexes = [
      /^(0113|0114|0115|0116|0117|0118|0121|0131|0141|0151|0161)(4960)[0-9]{3}$/,
      /^02079460[0-9]{3}$/,
      /^01914980[0-9]{3}$/,
      /^02890180[0-9]{3}$/,
      /^02920180[0-9]{3}$/,
      /^01632960[0-9]{3}$/,
      /^07700900[0-9]{3}$/,
      /^08081570[0-9]{3}$/,
      /^09098790[0-9]{3}$/,
      /^03069990[0-9]{3}$/
    ];

    // check if telephoneNumber matches any of the disallowed numbers
    for (let i = 0; i < dramaRegexes.length; i += 1) {
      if (dramaRegexes[i].test(number)) {
        return false;
      }
    }

    return true;
  };

  const isValidlyPrefixed = function (num) {
    if (isMobile) {
      const hasEirMobilePrefix = includeEircode ? `|${eirMobilePrefix}` : '';
      const regexMobileValidPrefix = new RegExp(`^0(70|71|72|73|74|75|7624|77|78|79${hasEirMobilePrefix})`);

      return regexMobileValidPrefix.test(num);
    }

    const hasEirPrefix = includeEircode ? `|${eirPrefix}` : '';
    const regexValidPrefix = new RegExp(`^0(1|2|3|5|70|71|72|73|74|75|7624|77|78|79|8${hasEirPrefix})`);

    return regexValidPrefix.test(num);
  };

  const isValidNumber = (number) => {
    return (
      isCorrectlyFormatted(number) &&
      isValidlyPrefixed(number) &&
      isNotReserved(number)
    );
  };

  return value.length > 0 && !isValidNumber(value) && 'Your number does not look right';
};

const minLength = (inputter, value, min) => {
  const str = inputter.ignoreSeparator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && str.length < min && `Length must be at least ${min} characters`;
};

const maxLength = (inputter, value, max) => {
  const str = inputter.ignoreSeparator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && str.length > max && `Length must be no longer than ${max} characters`;
};

const isBetween = (inputter, value, min, max) => {
  const str = inputter.ignoreSeparator ? withoutChar(value, inputter.separator) : value;
  return value.length > 0 && (str.length < min || str.length > max) && `Length must be between ${min} and ${max} characters`;
};

const isPhoneNumber = (inputter, value, includeEircode) => {
  return phoneValidation(value, false, includeEircode);
};

const isMobileNumber = (inputter, value, includeEircode) => {
  return phoneValidation(value, true, includeEircode);
};

const isDateOfBirth = (inputter, value) => {
  const DATEISO_REGEX = /(\d{4})-(\d{2})-(\d{2})$/;
  const isDate = DATEISO_REGEX.test(value);
  return value.length > 0 && !isDate && 'Your date of birth does not look right';
};

const stringToDate = function (dateString) {
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
  const message = 'Your date does not look right';

  // Check formatting first
  const formatValid =
    dateString.length === 10 && isNumeric(dayString) && isNumeric(monthString) && isNumeric(yearString);

  if (dateString.length > 0 && !formatValid) {
    return message;
  }

  // Check date is a valid date
  const date = new Date(year, month, day);
  const dayValid = isValid(dayString, 2, date.getDate(), day);
  const monthValid = isValid(monthString, 2, date.getMonth(), month);
  const yearValid = isValid(yearString, 4, date.getFullYear(), year);
  const valid = dayValid && monthValid && yearValid;

  return dateString.length > 0 && !valid ? message : '';
};

const minDate = (inputter, value, min) => {
  if (isDate(inputter, value) === '') {
    const minDate = stringToDate(min);
    const date = stringToDate(value);
    const displayDate = convertIsoDate(min);

    if (value.length > 0 && date < minDate) {
      return `Date must be on or after ${displayDate}`;
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
      return `Date must be on or before ${displayDate}`;
    }
  }

  return '';
};

function isNumeric(value) {
  const regex = /[^0-9]/g;
  return value && !value.match(regex);
}

const hasNumbers = (inputter, value) => {
  return value.length > 0 && !/\d/.test(value) ? 'Must include at least one number' : '';
};

const hasLetters = (inputter, value) => {
  const regExp = /[a-zA-Z]/g;
  return value.length > 0 && !regExp.test(value) ? 'Must include at least one letter' : '';
};

export {
  isRequired,
  isNumber,
  isInteger,
  isPostcode,
  isFirstName,
  isLastName,
  isFullName,
  isTitle,
  isEmail,
  isPassword,
  isPhoneNumber,
  isMobileNumber,
  isDateOfBirth,
  minDate,
  maxDate,
  minLength,
  maxLength,
  isBetween,
  isDate,
  hasNumbers,
  hasLetters
};
