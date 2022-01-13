/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic, waitUntil } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import { MaskMixin } from '@muons/library/mixins/mask-mixin';
import { defaultChecks, fillIn } from '../helpers';

const Inputter = class extends MaskMixin(MuonElement) {
  get standardTemplate() {
    return html`
      ${this._labelTemplate}
      ${this._htmlFormElementTemplate}
      ${this._maskTemplate}
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
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="00000" >
          <label slot="label">input label</label>
          <input type="text" value=""/>
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
      expect(maskedInput.textContent).to.be.equal('00000', '`input-mask` has correct value');
    });

    it('input value `1`', async () => {
      await fillIn(inputElement, '1', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0000', '`input-mask` has correct value');
    });

    it('input value `12`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '12');
      maskedInput = shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12', 'Input has correct value');
      expect(inputter.value).to.be.equal('12', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('  000', '`input-mask` has correct value');
    });
  });

  describe('mask separator', async () => {
    let inputter;
    let shadowRoot;
    let maskedInput;
    let inputElement;
    before(async () => {
      inputter = await fixture(html`
        <${tag} mask="00-00-00" separator="-">
          <label slot="label">input label</label>
          <input type="text" value=""/>
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
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
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

    it('input value `123`', async () => {
      await fillIn(inputElement, '123', 'input');
      await waitUntil(() => inputter.value === '12-3');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-3', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-3', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('    0-00', '`input-mask` has correct value');
    });

    it('delete value `3`', async () => {
      await fillIn(inputElement, '12-', 'input');
      await waitUntil(() => inputter.value === '12-');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('   00-00', '`input-mask` has correct value');
    });

    it('delete value `2`', async () => {
      await fillIn(inputElement, '12', 'input');
      await waitUntil(() => inputter.value === '1');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('1', 'Input has correct value');
      expect(inputter.value).to.be.equal('1', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal(' 0-00-00', '`input-mask` has correct value');
    });

    it('input value `123`', async () => {
      await fillIn(inputElement, '123');
      await waitUntil(() => inputter.value === '12-3');
      maskedInput = inputter.shadowRoot.querySelector('.input-mask');
      expect(inputElement.value).to.be.equal('12-3', 'Input has correct value');
      expect(inputter.value).to.be.equal('12-3', 'Inputter has correct value');
      expect(maskedInput.textContent).to.be.equal('    0-00', '`input-mask` has correct value');
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
});
