/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic, waitUntil } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';
import { defaultChecks, fillIn } from '../helpers';
import sinon from 'sinon';

const Inputter = class extends MaskMixin(MuonElement) {

  _onInput(inputEvent) {
    super._onInput(inputEvent);
    this.value = this._processMaskInputValue(this._slottedValue);
    this._fireChangeEvent();
  }

  _onChange(changeEvent) {
    changeEvent.stopPropagation();
    let value = this._processFormChangeValue(this._slottedValue);
    if (this.mask) {
      value = this._processMaskChangeValue(value);
    }
    if (value !== this.value) {
      this.value = value;
      this._fireChangeEvent();
    }
  }

  get standardTemplate() {
    return html`
      ${this._addLabel}
      ${this._addSlottedContent}
      ${this._addMask}
    `;
  }
};
const tagName = defineCE(Inputter);
const tag = unsafeStatic(tagName);

describe('mask & separator', () => {
  describe('mask', async () => {
    let inputter;
    let shadowRoot;
    let maskedInput;
    let inputElement;
    let changeEventSpy;
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="00000" >
          <label slot="label">input label</label>
          <input type="text" value=""/>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
      maskedInput = shadowRoot.querySelector('.input-mask');
      inputElement = inputter.querySelector('input');

      changeEventSpy = sinon.spy();
      inputter.addEventListener('inputter-change', changeEventSpy);
    });

    it('default checks', async () => {
      await defaultChecks(inputter);
    });

    it('masked input check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(maskedInput.textContent).to.be.equal('00000', '`input-mask` has correct value');
    });

    it('input value `1`', async () => {
      await fillIn(inputElement, '1', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0000', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('1', '`change` event has value `1`');
    });

    it('input value `12`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '12');
      maskedInput = shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12', 'Input has correct value');
      expect(inputter.value).to.be.equal('12', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('  000', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12', '`change` event has value `12`');
    });
    it('input value `123`', async () => {
      await fillIn(inputElement, '123', 'change');
      await waitUntil(() => inputter.value === '123');
      maskedInput = shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('123', 'Input has correct value');
      expect(inputter.value).to.be.equal('123', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('   00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('123', '`change` event has value `123`');
    });
  });

  describe('mask separator', async () => {
    let inputter;
    let shadowRoot;
    let maskedInput;
    let inputElement;
    let changeEventSpy;
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="00-00-00" separator="-">
          <label slot="label">input label</label>
          <input type="text" value=""/>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
      maskedInput = shadowRoot.querySelector('.input-mask');
      inputElement = inputter.querySelector('input');
      changeEventSpy = sinon.spy();
      inputter.addEventListener('inputter-change', changeEventSpy);
    });

    it('default checks', async () => {
      await defaultChecks(inputter);
    });

    it('masked input check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(maskedInput.textContent).to.be.equal('00-00-00', '`input-mask` has correct value');
    });

    it('input value `1`', async () => {
      await fillIn(inputElement, '1', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0-00-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('1', '`change` event has value `1`');
    });

    it('input value `12`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '12-');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('   00-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12-', '`change` event has value `12-`');
    });

    it('input value `123`', async () => {
      await fillIn(inputElement, '123', 'input');
      await waitUntil(() => inputter.value === '12-3');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-3', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-3', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('    0-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(3, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12-3', '`change` event has value `12-3`');
    });

    it('delete value `3`', async () => {
      await fillIn(inputElement, '12-', 'input');
      await waitUntil(() => inputter.value === '12-');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('   00-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(4, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12-', '`change` event has value `12-`');
    });

    it('delete value `2`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0-00-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(5, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('1', '`change` event has value `1`');
    });

    it('input value `123`', async () => {
      await fillIn(inputElement, '123', 'change');
      await waitUntil(() => inputter.value === '12-3');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-3', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-3', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('    0-00', '`input-mask` has correct value');
      expect(changeEventSpy.callCount).to.equal(6, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('12-3', '`change` event has value `12-3`');
    });
  });

  describe('tel mask seprator', async () => {
    let inputter;
    let shadowRoot;
    let maskedInput;
    let inputElement;
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="00-00-00" separator="-">
          <label slot="label">input label</label>
          <input type="tel" value=""/>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
      maskedInput = shadowRoot.querySelector('.input-mask');
      inputElement = inputter.querySelector('input');
    });

    it('default checks', async () => {
      await defaultChecks(inputter);
    });

    it('masked input check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(maskedInput.textContent).to.be.equal('00-00-00', '`input-mask` has correct value');
    });

    it('input value `1`', async () => {
      await fillIn(inputElement, '1', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0-00-00', '`input-mask` has correct value');
    });

    it('input value `12`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '12-');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('   00-00', '`input-mask` has correct value');
    });
  });
  describe('radio mask', async () => {
    let inputter;
    let shadowRoot;
    let maskedInput;
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="xxx">
          <label for="radio-option">input label</label>
          <input type="radio" id="radio-option" value="yes"/>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
      maskedInput = shadowRoot.querySelector('.input-mask');
    });

    it('default checks', async () => {
      await defaultChecks(inputter);
    });

    it('masked input check', async () => {
      expect(maskedInput).to.be.null; // eslint-disable-line no-unused-expressions
    });
  });
});
