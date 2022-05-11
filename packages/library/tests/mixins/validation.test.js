/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import sinon from 'sinon';
import { defaultChecks, fillIn, selectEvent } from '../helpers';
import { ValidationMixin } from '@muons/library/mixins/validation-mixin';

const MuonValidationElement = class extends ValidationMixin(MuonElement) {

  get standardTemplate() {
    return html `
    <div class="slotted-content">
        ${this._isMultiple ? this._addHeading : this._addLabel}
      <div class="input-holder">
        ${super.standardTemplate}
      </div>
      ${this.isPristine ? html`` : this._addValidationMessage}
    </div>
    `;
  }

  get customTemplate() {
    return html `
    <div class="slotted-content">
        ${this._isMultiple ? this._addHeading : this._addLabel}
      <div class="input-holder">
        ${super.standardTemplate}
      </div>
      ${this._addValidationListMessage}
    </div>
    `;
  }

  _onChange(changeEvent) {
    this._pristine = false;
    super._onChange(changeEvent);
    this.validate();
  }

  _onBlur(blurEvent) {
    this._pristine = false;
    super._onBlur(blurEvent);
    this.validate();
  }

  _onInput(inputEvent) {
    this._pristine = false;
    super._onInput(inputEvent);
    if (this.validation?.length > 0 && this._isSingle) {
      if (this.value !== this._slottedValue) {
        this.value = this._slottedValue;
        this._fireChangeEvent();
      }
      this.validate();
    }
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
    <${tag} validation=["isRequired","isBetween(5,10)"] disableNative="true">
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

  it('text validation on input', async () => {
    const formElement = await fixture(html`
    <${tag} validation=["isRequired","isBetween(5,10)"] disableNative="true">
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

    await fillIn(inputElement, 'hello', 'input');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');

    await fillIn(inputElement, '', 'input');
    expect(formElement.value).to.equal('', '`value` property has value ``');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');

    await formElement.updateComplete;
    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

    await fillIn(inputElement, 'hello world', 'input');
    expect(formElement.value).to.equal('hello world', '`value` property has value `hello world`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello world', '`change` event has value `hello world`');

    await formElement.updateComplete;
    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('Length must be between 5 and 10 characters.', 'validation message has correct value');
  });

  it('text native validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation=["isRequired"]>
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
    let validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim().toLowerCase()).contains('fill out this field.', 'validation message has correct value');

    await fillIn(inputElement, 'test validation');
    expect(formElement.value).to.equal('test validation', '`value` property has value `test validation`');
    expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('test validation', '`change` event has value `test validation`');

    await formElement.updateComplete;
    validationMessage = shadowRoot.querySelector('.validation');
    expect(validationMessage).to.be.null; // eslint-disable-line no-unused-expressions
  });

  it('tel native validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation=["isRequired"]>
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
    <${tag} type="custom" validation=["isRequired"]>
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
    <${tag} heading="What is your heating source?" validation=["isRequired"]>
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
    <${tag} heading="What is your heating source?" validation=["isRequired"]>
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
    <${tag} validation=["isRequired"]>
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
    <${tag} validation=["isRequired","minDate('11/11/2021')"]>
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
