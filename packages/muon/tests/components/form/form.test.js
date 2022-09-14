/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import sinon from 'sinon';
import { defaultChecks } from '../../helpers';
import { Form } from '@muonic/muon/components/form';
import { Inputter } from '@muonic/muon/components/inputter';
import { Cta } from '@muonic/muon/components/cta';

const tagName = defineCE(Form);
const tag = unsafeStatic(tagName);

const inputterTagName = defineCE(Inputter);
const inputterTag = unsafeStatic(inputterTagName);

const ctaTagName = defineCE(Cta);
const ctaTag = unsafeStatic(ctaTagName);

describe('form', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('implements standard self [no form]', () => {
    const el = new Form();
    const message = 'No form node found. Did you put a <form> element inside?';
    expect(() => el.__checkForFormEl()).to.throw(message, 'no `form` added');
    expect(() => el._reset()).to.throw(message, 'no `form` added for reset');
  });

  it('implements standard self [with form]', async () => {
    const el = await fixture(html`<${tag}><form></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._submitButton).to.equal(null, 'no `submit` button added');
    expect(el._resetButton).to.equal(null, 'no `reset` button added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(el._nativeForm).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with submit button', async () => {
    const el = await fixture(html`<${tag}><form><button type="submit">submit</button></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._submitButton.nodeName).to.equal('BUTTON', 'has submit button');
    expect(el._submitButton.type).to.equal('submit', 'has submit type button');
    expect(el._resetButton).to.equal(null, 'no `reset` button added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with submit cta', async () => {
    const el = await fixture(html`<${tag}><form><${ctaTag} type="submit">submit</${ctaTag}></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._submitButton.nodeName.toLowerCase()).to.equal(ctaTagName, 'has submit cta');
    expect(el._submitButton.type).to.equal('submit', 'has submit type button');
    expect(el._resetButton).to.equal(null, 'no `reset` cta added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with submit input', async () => {
    const el = await fixture(html`<${tag}><form><input type="submit">submit</input></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._submitButton.nodeName).to.equal('INPUT', 'has submit input');
    expect(el._submitButton.type).to.equal('submit', 'has submit type input');
    expect(el._resetButton).to.equal(null, 'no `reset` button added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with reset button', async () => {
    const el = await fixture(html`<${tag}><form><button type="reset">reset</button></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._resetButton.nodeName).to.equal('BUTTON', 'has reset button');
    expect(el._resetButton.type).to.equal('reset', 'has reset type button');
    expect(el._submitButton).to.equal(null, 'no `submit` button added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with reset cta', async () => {
    const el = await fixture(html`<${tag}><form><${ctaTag} type="reset">reset</${ctaTag}></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._resetButton.nodeName.toLowerCase()).to.equal(ctaTagName, 'has reset cta');
    expect(el._resetButton.type).to.equal('reset', 'has reset type button');
    expect(el._submitButton).to.equal(null, 'no `submit` cta added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form with reset input', async () => {
    const el = await fixture(html`<${tag}><form><input type="reset">reset</input></form></${tag}>`);
    await defaultChecks(el);

    const shadowRoot = el.shadowRoot;
    const slot = shadowRoot.querySelector('slot');
    const hiddenSubmit = el.querySelector('input[hidden][type="submit"]');

    expect(el.type).to.equal('standard', '`type` property has default value `standard`');
    expect(el._resetButton.nodeName).to.equal('INPUT', 'has reset input');
    expect(el._resetButton.type).to.equal('reset', 'has reset type input');
    expect(el._submitButton).to.equal(null, 'no `submit` button added');
    expect(slot).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(hiddenSubmit).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  it('form submitting', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`<${tag} @submit=${submitSpy}><form><button type="submit">submit</button></form></${tag}>`);
    const submitBtn = el.querySelector('button');

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(1);
  });

  it('form submitting with input', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`<${tag} @submit=${submitSpy}><form><label for="foo">Bar</label><input id="foo" type="text" required /><button type="submit">submit</button></form></${tag}>`);
    const submitBtn = el.querySelector('button');

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(0);
  });

  it('form submitting with inputter [validate]', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`
      <${tag} @submit=${submitSpy}>
        <form>
          <${inputterTag} validation='["isRequired"]' value="foo" name="bar">
            <label slot="label" for="foo">Bar</label>
            <input id="foo" type="text" />
          </${inputterTag}>
          <button type="submit">submit</button>
        </form>
      </${tag}>
    `);

    const inputter = document.querySelector(inputterTagName);

    await defaultChecks(el);

    expect(el.validate()).to.deep.equal(
      {
        isValid: true,
        validationStates:
          [
            {
              name: 'bar',
              value: 'foo',
              error: undefined,
              isValid: true,
              formElement: inputter,
              validity: inputter.validity
            }
          ]
      }
    );
  });

  it('form submitting with inputter', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`
      <${tag} @submit=${submitSpy}>
        <form>
          <${inputterTag} validation='["isRequired"]'>
            <label slot="label" for="foo">Bar</label>
            <input id="foo" type="text" />
          </${inputterTag}>
          <button type="submit">submit</button>
        </form>
      </${tag}>
    `);
    const submitBtn = el.querySelector('button');

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(0);
  });

  it('form submitting with inputter parent', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`
      <${tag} @submit=${submitSpy}>
        <form>
          <${inputterTag} heading="foo" validation='["isRequired"]'>
            <div>
              <input type="checkbox" name="checkboxes" value="a" id="check-01">
              <label for="check-01">Option A</label>
              <input type="checkbox" name="checkboxes" value="b" id="check-02">
              <label for="check-02">Option B</label>
            </div>
          </${inputterTag}>
          <button type="submit">submit</button>
        </form>
      </${tag}>
    `);
    const submitBtn = el.querySelector('button');

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(0);
  });

  it('form button disabled submitting', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`<${tag} @submit=${submitSpy}><form><button disabled type="submit">submit</button></form></${tag}>`);
    const submitBtn = el.querySelector('button');

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(0);
  });

  it('form cta loading submitting', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`<${tag} @submit=${submitSpy}><form><${ctaTag} loading type="submit">submit</${ctaTag}></form></${tag}>`);
    const submitBtn = el.querySelector(ctaTagName);

    await defaultChecks(el);

    submitBtn.click();

    expect(submitSpy.callCount).to.equal(0);
  });

  it('form with reset button', async () => {
    const el = await fixture(html`<${tag}><form><label for="foo">Bar</label><input id="foo" type="text" value="foo" /><button type="reset">reset</button></form></${tag}>`);
    const input = el.querySelector('input');
    const resetBtn = el.querySelector('button');

    await defaultChecks(el);

    expect(input.value).to.equal('foo', 'default input value');

    input.value = '';

    expect(input.value).to.equal('', 'changed input value');

    resetBtn.click();

    expect(input.value).to.equal('foo', 'reset input value');
  });

  it('form cta loading reset', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`<${tag} @submit=${submitSpy}><form><label for="foo">Bar</label><input id="foo" type="text" value="foo" /><${ctaTag} loading type="reset">submit</${ctaTag}></form></${tag}>`);
    const input = el.querySelector('input');
    const resetBtn = el.querySelector(ctaTagName);

    await defaultChecks(el);

    expect(input.value).to.equal('foo', 'default input value');

    input.value = '';

    expect(input.value).to.equal('', 'changed input value');

    resetBtn.click();

    expect(input.value).to.equal('foo', 'no reset input value');
  });

  it('form cta reset with inputter', async () => {
    const submitSpy = sinon.spy();
    const el = await fixture(html`
      <${tag} @submit=${submitSpy}>
        <form>
          <${inputterTag} validation='["isRequired"]' value='test'>
            <label slot="label" for="foo">Bar</label>
            <input id="foo" type="text" />
          </${inputterTag}>
          <${ctaTag} type="reset">Reset</${ctaTag}>
        </form>
      </${tag}>
    `);
    const input = el.querySelector(inputterTagName);
    const resetBtn = el.querySelector(ctaTagName);

    await defaultChecks(el);
    expect(input.value).to.equal('test', 'default input value');

    input.value = '';
    expect(input.value).to.equal('', 'changed input value');

    resetBtn.click();
    expect(input.value).to.equal('test', 'no reset input value');
  });
});
