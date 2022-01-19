/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Inputter } from '@muons/library/components/inputter';
import { defaultChecks } from '../../helpers';

const tagName = defineCE(Inputter);
const tag = unsafeStatic(tagName);

describe('Inputter', () => {
  describe('standard default', async () => {
    let inputter;
    before(async () => {
      inputter = await fixture(html`
        <${tag}>
        </${tag}>`);
    });

    it('default checks', async () => {
      await defaultChecks(inputter);
    });

    it('default properties', async () => {
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
    });
  });
  describe('text input', async () => {
    describe('mask text', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag} mask="0000">
            <label slot="label">input label</label>
            <input type="text" value=""/>
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });

      it('default checks', async () => {
        await defaultChecks(inputter);
      });

      it('default properties', async () => {
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.has-mask')).to.not.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('radio input', async () => {
    describe('standard radio', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag} heading="What is your heating source?">
            <input type="radio" id="question-gas" name="question" value="gas"></input>
            <label for="question-gas">Gas</label>
            <input type="radio" id="question-electricity" name="question" value="electricity"></input>
            <label for="question-electricity">Electricity</label>
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });

      it('default checks', async () => {
        await defaultChecks(inputter);
      });

      it('default properties', async () => {
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.input-heading')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });
});
