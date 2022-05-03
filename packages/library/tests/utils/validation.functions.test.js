/* eslint-disable no-undef */
import { expect, fixture, html } from '@open-wc/testing';
import customValidations from '@muons/library/utils/validation';

describe('validation', () => {
  it('isRequired', () => {
    let validation = customValidations.isRequired(null, '');
    expect(validation).to.equal('This field is required', 'validation has correct value');

    validation = customValidations.isRequired(null, 'fdgdfdf');
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('isNumber', async () => {
    let inputElement = {};
    let validation = customValidations.isNumber(inputElement, '');
    expect(validation).to.equal(false, 'validation has correct value');

    inputElement = { separator: '-' };
    validation = customValidations.isNumber(inputElement, 'fdgd-fdf');
    expect(validation).to.equal('Needs to be a number', 'validation has correct value');

    validation = customValidations.isNumber(inputElement, '343');
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.isNumber(inputElement, '343-23');
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('isInteger', async () => {
    let inputElement = {};
    let validation = customValidations.isInteger(inputElement, '');
    expect(validation).to.equal(false, 'validation has correct value');

    inputElement = { separator: '-' };
    validation = customValidations.isInteger(inputElement, 'fdgdf-df');
    expect(validation).to.equal('Needs to be a whole number', 'validation has correct value');

    validation = customValidations.isInteger(inputElement, 'Infinity');
    expect(validation).to.equal('Needs to be a whole number', 'validation has correct value');

    validation = customValidations.isInteger(inputElement, '343-67');
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('isEmail', async () => {
    let inputElement = await fixture(html`<input></input>`);
    let validation = customValidations.isEmail(inputElement, '');
    expect(validation).to.equal(false, 'validation has correct value');

    inputElement = await fixture(html`<input></input>`);
    validation = customValidations.isEmail(inputElement, 'fdgdf-df');
    expect(validation).to.equal('Your email does not look right', 'validation has correct value');

    validation = customValidations.isEmail(inputElement, 'djfgdfg');
    expect(validation).to.equal('Your email does not look right', 'validation has correct value');

    validation = customValidations.isEmail(inputElement, 'fjjdf.dfgd@dfd.com');
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('minLength', async () => {
    let inputElement = {};
    let validation = customValidations.minLength(inputElement, '', 2);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.minLength(inputElement, '353434', 6);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.minLength(inputElement, 'f', 2);
    expect(validation).to.equal('Length must be at least 2 characters', 'validation has correct value');

    inputElement = { separator: '-' };
    validation = customValidations.minLength(inputElement, 'djfg-dfg', 8);
    expect(validation).to.equal('Length must be at least 8 characters', 'validation has correct value');

    validation = customValidations.minLength(inputElement, 'djfg-dfg8', 8);
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('maxLength', async () => {
    let inputElement = {};
    let validation = customValidations.maxLength(inputElement, '', 2);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.maxLength(inputElement, '353434', 6);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.maxLength(inputElement, 'djf-gdf-gdjd', 10);
    expect(validation).to.equal('Length must be no longer than 10 characters', 'validation has correct value');

    inputElement = { separator: '-' };
    validation = customValidations.maxLength(inputElement, '353-434', 6);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.maxLength(inputElement, 'fer', 2);
    expect(validation).to.equal('Length must be no longer than 2 characters', 'validation has correct value');
  });

  it('isBetween', async () => {
    let inputElement = {};
    let validation = customValidations.isBetween(inputElement, '', 2, 8);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.isBetween(inputElement, 's', 2, 8);
    expect(validation).to.equal('Length must be between 2 and 8 characters', 'validation has correct value');

    validation = customValidations.isBetween(inputElement, 'df', 2, 8);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.isBetween(inputElement, 'dfedfdfd', 2, 8);
    expect(validation).to.equal(false, 'validation has correct value');

    validation = customValidations.isBetween(inputElement, 'dfdfgdsfgsdfasd', 2, 8);
    expect(validation).to.equal('Length must be between 2 and 8 characters', 'validation has correct value');

    inputElement = { separator: '-' };
    validation = customValidations.isBetween(inputElement, 'd-', 2, 8);
    expect(validation).to.equal('Length must be between 2 and 8 characters', 'validation has correct value');

    validation = customValidations.isBetween(inputElement, 'd-jfg-dfg', 2, 8);
    expect(validation).to.equal(false, 'validation has correct value');
  });

  it('isDate', async () => {
    const inputElement = {};
    let validation = customValidations.isDate(inputElement, '');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '23/10/2021');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '2021-10-23');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '36-10-2021');
    expect(validation).to.equal('Your date does not look right', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '23/3d/2021');
    expect(validation).to.equal('Your date does not look right', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '2f/03/2021');
    expect(validation).to.equal('Your date does not look right', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '12/12/20');
    expect(validation).to.equal('Your date does not look right', 'validation has correct value');

    validation = customValidations.isDate(inputElement, '2021-23-10');
    expect(validation).to.equal('Your date does not look right', 'validation has correct value');
  });

  it('minDate', async () => {
    const inputElement = {};
    let validation = customValidations.minDate(inputElement, '', '');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.minDate(inputElement, '21/12/2021', '11/12/2021');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.minDate(inputElement, '09/12/2021', '11/12/2021');
    expect(validation).to.equal('Date must be on or after 11/12/2021', 'validation has correct value');
  });

  it('maxDate', async () => {
    const inputElement = {};
    let validation = customValidations.maxDate(inputElement, '', '');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.maxDate(inputElement, '09/12/2021', '11/12/2021');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.maxDate(inputElement, '21/12/2021', '11/12/2021');
    expect(validation).to.equal('Date must be on or before 11/12/2021', 'validation has correct value');
  });

  it('hasNumbers', async () => {
    const inputElement = {};
    let validation = customValidations.hasNumbers(inputElement, '');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.hasNumbers(inputElement, 'rgdfgdf');
    expect(validation).to.equal('Must include at least one number', 'validation has correct value');

    validation = customValidations.hasNumbers(inputElement, 'fgdf3gd');
    expect(validation).to.equal('', 'validation has correct value');
  });

  it('hasLetters', async () => {
    const inputElement = {};
    let validation = customValidations.hasLetters(inputElement, '');
    expect(validation).to.equal('', 'validation has correct value');

    validation = customValidations.hasLetters(inputElement, '43232');
    expect(validation).to.equal('Must include at least one letter', 'validation has correct value');

    validation = customValidations.hasLetters(inputElement, '232d23');
    expect(validation).to.equal('', 'validation has correct value');
  });
});
