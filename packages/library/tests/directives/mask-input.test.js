/* eslint-disable no-undef */
import { expect, html } from '@open-wc/testing';
import { render } from 'lit';
import { maskInput } from '@muons/library/directives/mask-input';

describe('mask', async () => {
  describe('mask initial 00000', async () => {
    let maskedInput;
    before(async () => {
      maskedInput = document.createElement('div');
      render(html`${maskInput('00000', '', '')}`, maskedInput);
    });

    it('directive element present check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
    });

    it('directive masked value', async () => {
      const maskedValue = maskedInput.querySelector('.input-mask');
      expect(maskedValue.textContent).to.be.equal('00000', 'directive has correct mask value');
    });
  });

  describe('mask with value 00000', async () => {
    let maskedInput;
    before(async () => {
      maskedInput = document.createElement('div');
      render(html`${maskInput('00000', '', '12')}`, maskedInput);
    });

    it('directive element present check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
    });

    it('directive masked value', async () => {
      const maskedValue = maskedInput.querySelector('.input-mask');
      expect(maskedValue.textContent).to.be.equal('  000', 'directive has correct mask value');
    });
  });

  describe('mask with separator 00-000', async () => {
    let maskedInput;
    before(async () => {
      maskedInput = document.createElement('div');
      render(html`${maskInput('00-000', '-', '')}`, maskedInput);
    });

    it('directive element present check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
    });

    it('directive masked value', async () => {
      const maskedValue = maskedInput.querySelector('.input-mask');
      expect(maskedValue.textContent).to.be.equal('00-000', 'directive has correct mask value');
    });
  });

  describe('mask with separator & value 00-000', async () => {
    let maskedInput;
    before(async () => {
      maskedInput = document.createElement('div');
      render(html`${maskInput('00-000', '-', '12')}`, maskedInput);
    });

    it('directive element present check', async () => {
      expect(maskedInput).to.be.not.null; // eslint-disable-line no-unused-expressions
    });

    it('directive masked value', async () => {
      const maskedValue = maskedInput.querySelector('.input-mask');
      expect(maskedValue.textContent).to.be.equal('   000', 'directive has correct mask value');
    });
  });
});
