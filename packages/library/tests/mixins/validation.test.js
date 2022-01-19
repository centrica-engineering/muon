/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import sinon from 'sinon';
import { defaultChecks, fillIn, selectEvent } from '../helpers';
import { ValidationMixin } from '../../mixins/validation-mixin';

const isFirstName = (inputter, value) => {
  const isName = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\s]{1,24}$/i.test(value);

  return value.length > 0 && !isName && 'Your First Name does not look right';
};

const MuonValidationElement = class extends ValidationMixin(MuonElement) {

  get standardTemplate() {
    return html `
    <div class="slotted-content">
        ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
      <div class="input-holder">
        ${super.standardTemplate}
      </div>
      ${this._validationMessageTemplate}
    </div>
    `;
  }

  get customTemplate() {
    return html `
    <div class="slotted-content">
        ${this._isMultiple ? this._headingTemplate : this._labelTemplate}
      <div class="input-holder">
        ${super.standardTemplate}
      </div>
      ${this._validationListMessageTemplate}
    </div>
    `;
  }

  firstUpdated() {
    super.firstUpdated();

    const customValidation = { isFirstName: isFirstName };
    this._addValidations(customValidation);
  }
};

const tagName = defineCE(MuonValidationElement);
const tag = unsafeStatic(tagName);

describe('form-element-validation', () => {
  it('standard', async () => {
    const validationElement = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(validationElement);

    const shadowRoot = validationElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    expect(holder).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationElement.type).to.equal('standard', '`type` property has default value `standard`');
  });

  it('text validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;,&quot;isBetween(5,10)&quot;]" disableNative="true">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');

    await fillIn(inputElement, '');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

    await fillIn(inputElement, 'hello world');
    expect(formElement.value).to.equal('hello world', '`value` property has value `hello world`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello world', '`change` event has value `hello world`');

    await formElement.updateComplete;
    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('Length must be between 5 and 10 characters.', 'validation message has correct value');
  });

  it('text extended validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;,&quot;isFirstName&quot;]" disableNative="true">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');

    await fillIn(inputElement, '');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

    await fillIn(inputElement, 'hello worldfjgbd dfghdfgd djhfdvfkj');
    expect(formElement.value).to.equal('hello worldfjgbd dfghdfgd djhfdvfkj', '`value` property has value `hello world`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello worldfjgbd dfghdfgd djhfdvfkj', '`change` event has value `hello world`');

    await formElement.updateComplete;
    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('Your First Name does not look right.', 'validation message has correct value');
  });

  it('text native validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;]">
      <label slot="label">input label</label>
      <input type="text" value="" required/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');

    await fillIn(inputElement, '');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    const validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).contains('This field is required.', 'validation message has correct value');
  });

  it('tel native validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;]">
      <label slot="label">input label</label>
      <input type="tel" value="" pattern="[0-9]{3}" title="match the pattern"/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, '124');
    expect(formElement.value).to.equal('124', '`value` property has value `124`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('124', '`change` event has value `124`');

    await fillIn(inputElement, '');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

    await fillIn(inputElement, '56');
    expect(formElement.value).to.equal('56', '`value` property has value `56`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('56', '`change` event has value `56`');

    await formElement.updateComplete;
    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('match the pattern.', 'validation message has correct value');

  });

  it('text custom type validation', async () => {
    const formElement = await fixture(html`
    <${tag} type="custom" validation="[&quot;isRequired&quot;]">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');

    await fillIn(inputElement, '');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    const validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    const listMessage = validationMessage.querySelectorAll('ul > li > p');
    expect(listMessage[0].textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('radio validation', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?" validation="[&quot;isRequired&quot;]">
      <input type="radio" id="question-gas" name="question" value="gas"></input>
      <label for="question-gas">Gas</label>
      <input type="radio" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement.checked).to.false;

    await inputElement.focus();
    await inputElement.blur();

    await formElement.updateComplete;
    const validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('checkbox validation', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?" validation="[&quot;isRequired&quot;]">
      <input type="checkbox" id="question-gas" name="question" value="gas" checked></input>
      <label for="question-gas">Gas</label>
      <input type="checkbox" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelectorAll('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;

    await inputElement[0].click();
    await formElement.updateComplete;

    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    const validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('select validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;]">
      <label slot="label" for="select-input">What is your heating source?</label>
      <select name="select" id="select-input">
        <option value="">Please Select</option>
        <option value="value1">One</option>
        <option value="value2">Two</option>
        <option value="value3">Three</option>
        <option value="value4">Four</option>
      </select>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const selectElement = formElement.querySelector('select');
    // eslint-disable-next-line no-unused-expressions
    expect(selectElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await selectEvent(selectElement, '');
    await formElement.updateComplete;

    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    const validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('date validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;,&quot;minDate('11/11/2021')&quot;]">
      <label slot="label">input label</label>
      <input type="text" value="" />
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, '12/11/2021');
    await formElement.updateComplete;
    expect(formElement.value).to.equal('12/11/2021', '`value` property has value `12/11/2021`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12/11/2021', '`change` event has value `12/11/2021`');

    await fillIn(inputElement, '');
    await formElement.updateComplete;
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

    await fillIn(inputElement, '10/11/2021');
    await formElement.updateComplete;
    expect(formElement.value).to.equal('10/11/2021', '`value` property has value `10/11/2021`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('10/11/2021', '`change` event has value `10/11/2021`');

    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('Date must be on or after 11/11/2021.', 'validation message has correct value');
  });
});
