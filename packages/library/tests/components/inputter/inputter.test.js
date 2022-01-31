/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Inputter } from '@muons/library/components/inputter';
import { defaultChecks, fillIn } from '../../helpers';

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

  describe('text', async () => {
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
        const validationMessage = shadowRoot.querySelector('.validation .message');
        expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

        const validationIcon = shadowRoot.querySelector('.validation .icon');
        expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(validationIcon.name).to.equal('exclamation-circle', 'validation icon has correct value');
      });
    });
  });

  describe('radio', async () => {
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

  describe('select', async () => {
    describe('standard select', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag}>
            <label slot="label">Select</label>
            <select name="select">
              <option value="">Please select</option>
              <option value="value-01">Value one</option>
              <option value="value-02">Value two</option>
              <option value="value-03">Value three</option>
              <option value="value-04">Value four</option>
            </select>
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });

      it('default checks', async () => {
        await defaultChecks(inputter);
      });

      it('default properties', async () => {
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.select')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('inputter-icon[name="chevron-circle-down"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('search', async () => {
    describe('standard search', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag}>
            <label slot="label">Search</label>
            <input type="search">
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });

      it('default checks', async () => {
        await defaultChecks(inputter);
      });

      it('default properties', async () => {
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.search')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('inputter-icon[name="search"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });

  describe('date', async () => {
    describe('standard date', async () => {
      let inputter;
      let shadowRoot;
      before(async () => {
        inputter = await fixture(html`
          <${tag}>
            <label slot="label">Date</label>
            <input type="date">
          </${tag}>`);
        shadowRoot = inputter.shadowRoot;
      });

      it('default checks', async () => {
        await defaultChecks(inputter);
      });

      it('default properties', async () => {
        expect(inputter.type).to.equal('standard', 'default type is set');
        expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.date')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('inputter-icon[name="calendar"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
        expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
      });
    });
  });
});
