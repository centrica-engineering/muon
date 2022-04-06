/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { FormElementMixin } from '@muons/library/mixins/form-element-mixin';
import { MuonElement, classMap } from '@muons/library';
import sinon from 'sinon';
import { defaultChecks, fillIn, selectEvent } from '../helpers';

const MuonFormElement = class extends FormElementMixin(MuonElement) {

  constructor() {
    super();
    this._changeEvent = 'inputter-change';
  }

  get standardTemplate() {
    const classes = {
      'slotted-content': true,
      'select-arrow': this._isSelect
    };

    return html `
      <div class="${classMap(classes)}">
          ${this._isMultiple ? this._addHeading : this._addLabel}
        <div class="input-holder">
          ${super.standardTemplate}
        </div>
      </div>`;
  }

  get singleTemplate() {
    if (this._isSingle) {
      const classes = {
        'slotted-content': true
      };

      return html `
        <div class="${classMap(classes)}">
            ${this._addLabel}
          <div class="input-holder">
            ${super.standardTemplate}
          </div>
        </div>`;
    } else {
      return this.standardTemplate;
    }
  }

  get multipleTemplate() {
    if (this._isMultiple) {
      const classes = {
        'slotted-content': true
      };

      return html `
        <div class="${classMap(classes)}">
            ${this._addHeading}
          <div class="input-holder">
            ${super.standardTemplate}
          </div>
        </div>`;
    } else {
      return this.standardTemplate;
    }
  }

  get selectTemplate() {
    if (this._isSelect) {
      const classes = {
        'slotted-content': true,
        'select-arrow': this._isSelect
      };

      return html `
        <div class="${classMap(classes)}">
            ${this._addLabel}
          <div class="input-holder">
            ${super.standardTemplate}
          </div>
        </div>`;
    } else {
      return this.standardTemplate;
    }
  }
};

const tagName = defineCE(MuonFormElement);
const tag = unsafeStatic(tagName);

describe('form-element', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('standard', async () => {
    const formElement = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    expect(holder).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
  });

  it('standard text input', async () => {
    const formElement = await fixture(html`
    <${tag} type="single">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const label = shadowRoot.querySelector('slot[name="label"]');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('single', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(label).to.not.be.null;
    expect(label.assignedElements()[0].textContent).to.equal('input label', '`label` slot has value `input label`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');
  });

  it('text input event', async () => {
    const formElement = await fixture(html`
    <${tag} type="single">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const label = shadowRoot.querySelector('slot[name="label"]');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('single', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(label).to.not.be.null;
    expect(label.assignedElements()[0].textContent).to.equal('input label', '`label` slot has value `input label`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    await fillIn(inputElement, 'hello', 'input');
    expect(formElement.value).to.equal('', '`value` property not changed');
    expect(changeEventSpy.callCount).to.equal(0, '`change` event not fired');
  });

  it('text default value', async () => {
    const formElement = await fixture(html`
    <${tag} type="single" value="test value">
      <label slot="label">input label</label>
      <input type="text" value=""/>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const label = shadowRoot.querySelector('slot[name="label"]');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('single', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(label).to.not.be.null;
    expect(label.assignedElements()[0].textContent).to.equal('input label', '`label` slot has value `input label`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelector('input');

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;
    expect(inputElement.value).to.equal('test value', '`value` attribute of input has correctt value');

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    await fillIn(inputElement, 'hello');
    expect(formElement.value).to.equal('hello', '`value` property has value `hello`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('hello', '`change` event has value `hello`');
  });

  it('standard text input labelID', async () => {
    const parentElement = await fixture(html`
    <div>
      <h1 id="label-id-test">what does it mean?</h1>
      <${tag} labelID="label-id-test">
        <input type="text" value=""/>
      </${tag}>
    </div>`);

    const formElement = parentElement.querySelector('test-0');
    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const holder = shadowRoot.querySelector('.input-holder');

    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;
    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');

    const slottedInput = formElement.querySelector('input');
    expect(slottedInput.getAttribute('aria-labelledby')).to.equal('label-id-test', '`aria-labelledby` attribute of input has value `label-id-test`');
  });

  it('standard radio input', async () => {
    const formElement = await fixture(html`
    <${tag} type="multiple" heading="What is your heating source?">
      <input type="radio" id="question-gas" name="question" value="gas" checked></input>
      <label for="question-gas">Gas</label>
      <input type="radio" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const heading = shadowRoot.querySelector('.input-heading');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('multiple', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelectorAll('input');
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;

    inputElement[1].click();
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.false;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');

    inputElement[0].click();
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.false;
    expect(formElement.value).to.equal('gas', '`value` property has value `gas`');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('gas', '`change` event has value `gas`');
  });

  it('radio default value', async () => {
    const formElement = await fixture(html`
    <${tag} type="multiple" heading="What is your heating source?" value="electricity">
      <input type="radio" id="question-gas" name="question" value="gas"></input>
      <label for="question-gas">Gas</label>
      <input type="radio" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const heading = shadowRoot.querySelector('.input-heading');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('multiple', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelectorAll('input');
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.false;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.true;
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
    // eslint-disable-next-line no-unused-expressions
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelectorAll('input');
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.false;

    inputElement[1].click();
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('gas,electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('gas,electricity', '`change` event has value `electricity`');

    inputElement[0].click();
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.false;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.true;
    expect(formElement.value).to.equal('electricity', '`value` property has value `electricity`');
    expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');
  });

  it('checkbox default value', async () => {
    const formElement = await fixture(html`
    <${tag} heading="What is your heating source?" value="gas">
      <input type="checkbox" id="question-gas" name="question" value="gas"></input>
      <label for="question-gas">Gas</label>
      <input type="checkbox" id="question-electricity" name="question" value="electricity"></input>
      <label for="question-electricity">Electricity</label>
    </${tag}>`);

    await defaultChecks(formElement);

    const shadowRoot = formElement.shadowRoot;
    const heading = shadowRoot.querySelector('.input-heading');
    const holder = shadowRoot.querySelector('.input-holder');

    expect(formElement.type).to.equal('standard', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(heading).to.not.be.null;
    expect(heading.textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const inputElement = formElement.querySelectorAll('input');
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[0].checked).to.true;
    // eslint-disable-next-line no-unused-expressions
    expect(inputElement[1].checked).to.false;
  });

  it('standard select input', async () => {
    const formElement = await fixture(html`
    <${tag} type="select">
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

    expect(formElement.type).to.equal('select', '`type` property has default value `standard`');
    // eslint-disable-next-line no-unused-expressions
    expect(heading).to.not.be.null;
    expect(heading.assignedElements()[0].textContent).to.equal('What is your heating source?', '`heading` slot has value `What is your heating source?`');
    // eslint-disable-next-line no-unused-expressions
    expect(holder).to.not.be.null;

    const selectElement = formElement.querySelector('select');
    // eslint-disable-next-line no-unused-expressions
    expect(selectElement).to.not.be.null;

    const changeEventSpy = sinon.spy();
    formElement.addEventListener('inputter-change', changeEventSpy);

    await selectEvent(selectElement, 'value3');
    expect(formElement.value).to.equal('value3', '`value` property has value `value3`');
    expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
    expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('value3', '`change` event has value `value3`');
  });
});
