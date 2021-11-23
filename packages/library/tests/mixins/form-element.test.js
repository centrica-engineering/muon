/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { FormElementMixin } from '@muon/library/mixins/form-element-mixin';
import { MuonElement } from '@muon/library';
import sinon from 'sinon';
import {  defaultChecks, fillIn, selectEvent } from '../helpers';

const MuonFormElement = class extends FormElementMixin(MuonElement) {

  get standardTemplate() {
    return html `
    <div class="slotted-content">
        ${ this._isMultiple ? this._headingTemplate : this._labelTemplate }
      <div class="input-holder">
        ${ super.standardTemplate }
      </div>
    </div>
    `;
  }
};
const tagName = defineCE(MuonFormElement);
const tag = unsafeStatic(tagName);

describe('form-element', () => {
  it('standard', async () => {
    const formElement = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    expect(holder).to.not.be.null;
    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
  });

  it('standard text input', async () => {
    const formElement = await fixture(html`
    <${tag}>
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const label = shadowRoot.querySelector('slot[name="label"]');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(label).to.not.be.null;
    expect(label.assignedElements()[0].textContent).to.equal('input label', '`label` slot has value `input label`')
    expect(holder).to.not.be.null;

    let inputElement = formElement.querySelector('input');
    
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');
  });

  it('standard text input labelID', async () => {
    const formElement = await fixture(html`
    <h1 id="label-id-test">what does it mean?</h1>
    <${tag} labelID="label-id-test">
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    expect(holder).to.not.be.null;
    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');

    const slottedInput = formElement.querySelector('#text-input');
    expect(slottedInput.getAttribute('aria-labelledby')).to.equal('label-id-test', '`aria-labelledby` attribute of input has value `label-id-test`')
    
  });

  it('standard radio input', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?">
      <input type="radio" id="question-gas" name="question" value="gas" checked></input>
      <label for="question-gas">Gas</label>
      <input type="radio" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const heading = shadowRoot.querySelector('.input-heading');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`')
    expect(holder).to.not.be.null;

    let inputElement = formElement.querySelectorAll('input');
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    expect(inputElement[0].checked).to.true;

    inputElement[1].click();
    expect(inputElement[0].checked).to.false;
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');

    inputElement[0].click();
    expect(inputElement[0].checked).to.true;
    expect(inputElement[1].checked).to.false;
    expect(formElement.value).to.equal('gas', '`value` property has value `gas`');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('gas', '`change` event has value `gas`');
  });

  it('standard checkbox input', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?">
      <input type="checkbox" id="question-gas" name="question" value="gas" checked></input>
      <label for="question-gas">Gas</label>
      <input type="checkbox" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const heading = shadowRoot.querySelector('.input-heading');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`')
    expect(holder).to.not.be.null;

    let inputElement = formElement.querySelectorAll('input');
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    expect(inputElement[0].checked).to.true;
    expect(inputElement[1].checked).to.false;

    inputElement[1].click();
    expect(inputElement[0].checked).to.true;
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('gas,electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('gas,electricity', '`change` event has value `electricity`');

    inputElement[0].click();
    expect(inputElement[0].checked).to.false;
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');
  });

  it('standard select input', async () => {
    const formElement = await fixture(html`
    <${tag}>
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
    const heading = shadowRoot.querySelector('slot[name="label"]');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(heading).to.not.be.null;
    expect(heading.assignedElements()[0].textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`')
    expect(holder).to.not.be.null;

    let selectElement = formElement.querySelector('select');
    expect(selectElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('change', changeEventSpy);

    await selectEvent(selectElement, 'value3');
    expect(formElement.value).to.equal('value3', '`value` property has value `value3`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('value3', '`change` event has value `value3`');
  });
});