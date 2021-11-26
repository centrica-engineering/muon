/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { MuonElement } from '@muon/library';
import sinon from 'sinon';
import { defaultChecks, fillIn } from '../helpers';
import { ValidationMixin } from '../../mixins/validation-mixin';

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
};

const tagName = defineCE(MuonValidationElement);
const tag = unsafeStatic(tagName);

describe('form-element', () => {
  it('standard', async () => {
    const validationElement = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(validationElement);

    const shadowRoot = validationElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    expect(holder).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationElement.type).to.equal('standard', '`type` property has default value `standard`');
  });

  it('text onchange validation', async () => {
    const formElement = await fixture(html`
    <${tag} validation="[&quot;isRequired&quot;]">
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
    expect(formElement.value).to.equal('', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value `hello`');

    const validationMessage = shadowRoot.querySelector('.error');
    //expect(formElement.validity)
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('radio onchange validation', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?" validation="[&quot;isRequired&quot;]">
      <input type="radio" id="question-gas" name="question" value="gas"></input>
      <label for="question-gas">Gas</label>
      <input type="radio" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const inputElement = formElement.querySelectorAll('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.false;

    await inputElement[0].focus();
    await inputElement[0].blur();

    await formElement.updateComplete;
    const validationMessage = shadowRoot.querySelector('.error');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });

  it('checkbox onblur validation', async () => {
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
    const validationMessage = shadowRoot.querySelector('.error');
    expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');
  });
});
