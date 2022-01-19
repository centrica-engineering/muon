/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Inputter } from '@muons/library/components/inputter';
import { defaultChecks, fillIn } from '../../helpers';

const tagName = defineCE(Inputter);
const tag = unsafeStatic(tagName);

describe('Inputter', () => {
  describe('helper', async () => {
    let inputter;
    let shadowRoot;
    before(async () => {
      inputter = await fixture(html`
        <${tag} helper="What is this?">
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
    });
    it('verify helper', async () => {
      expect(shadowRoot.querySelector('inputter-detail')).to.be.null; // eslint-disable-line no-unused-expressions

      const helper = shadowRoot.querySelector('.helper');
      expect(helper.textContent).to.equal('What is this?', 'helper text has correct value'); // eslint-disable-line no-unused-expressions
    });
  });

  describe('helper detail', async () => {
    let inputter;
    let shadowRoot;
    before(async () => {
      inputter = await fixture(html`
        <${tag} helper="What is this?">
          <label slot="label">input label</label>
          <input type="text" value=""/>
          <p slot="tip-details">More info about the input</p>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
    });
    it('default checks', async () => {
      await defaultChecks(inputter);
    });
    it('default properties', async () => {
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
    });
    it('verify detail', async () => {
      const inputterDetail = shadowRoot.querySelector('inputter-detail');
      expect(inputterDetail).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.open).to.be.false; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.querySelector('[slot="heading"]').textContent).to.equal('What is this?', 'helper text has correct value');
      expect(inputterDetail.querySelector('[name="tip-details"]').assignedNodes()[0].textContent)
        .to.equal('More info about the input', 'tip details has correct value');
    });
  });

  describe('helper detail open', async () => {
    let inputter;
    let shadowRoot;
    before(async () => {
      inputter = await fixture(html`
        <${tag} helper="What is this?" isHelperOpen>
          <label slot="label">input label</label>
          <input type="text" value=""/>
          <p slot="tip-details">More info about the input</p>
        </${tag}>`);
      shadowRoot = inputter.shadowRoot;
    });
    it('default checks', async () => {
      await defaultChecks(inputter);
    });
    it('default properties', async () => {
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
    });
    it('verify detail', async () => {
      const inputterDetail = shadowRoot.querySelector('inputter-detail');
      expect(inputterDetail).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.open).to.be.true; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.querySelector('[slot="heading"]').textContent).to.equal('What is this?', 'helper text has correct value');
      expect(inputterDetail.querySelector('[name="tip-details"]').assignedNodes()[0].textContent)
        .to.equal('More info about the input', 'tip details has correct value');
    });
  });

  describe('text', async() => {
    describe('validation', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag} validation="[&quot;isRequired&quot;]">
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
      });
      it('validate icon and message', async () => {
        const inputElement = inputter.querySelector('input');
        await fillIn(inputElement, '');

        await inputter.updateComplete;
        const validationMessage = shadowRoot.querySelector('.validation-message');
        expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

        const validationIcon = shadowRoot.querySelector('.validation-icon');
        expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationIcon.name).to.equal('exclamation-triangle', 'validation icon has correct value');
      });
    });
  });
  describe('radio', async () => {
    describe('validation', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag} heading="What is your heating source?" validation="[&quot;isRequired&quot;]">
            <input type="radio" id="question-gas" name="question" value="gas"></input>
            <label for="question-gas">Gas</label>
            <input type="radio" id="question-electricity" name="question" value="electricity"></input>
            <label for="question-electricity">Electricity</label>
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });
      it('default checks', async () => {
        await defaultChecks(inputter);
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      });
      it('validate icon and message', async () => {
        const inputElement = inputter.querySelector('input');
        await inputElement.focus();
        await inputElement.blur();

        await inputter.updateComplete;
        console.log(shadowRoot);
        const validationMessage = shadowRoot.querySelector('.validation-message');
        expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

        const validationIcon = shadowRoot.querySelector('.validation-icon');
        expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationIcon.name).to.equal('exclamation-triangle', 'validation icon has correct value');
      });
    });
  });
});
