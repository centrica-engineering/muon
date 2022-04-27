/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Inputter } from '@muons/library/components/inputter';
import { defaultChecks, fillIn } from '../../helpers';
import sinon from 'sinon';

const tagName = defineCE(Inputter);
const tag = unsafeStatic(tagName);

describe('Inputter', () => {
  it('standard default', async () => {
    const inputter = await fixture(html`<${tag}></${tag}>`);

    await defaultChecks(inputter);

    expect(inputter.type).to.equal('standard', 'default type is set');
    expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
  });

  describe('helper', async () => {
    it('text', async () => {
      const inputter = await fixture(html`
          <${tag} helper="What is this?">
            <label slot="label">input label</label>
            <input type="text" value=""/>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      expect(shadowRoot.querySelector('inputter-detail')).to.be.null; // eslint-disable-line no-unused-expressions

      const helper = shadowRoot.querySelector('.helper');
      expect(helper.textContent).to.equal('What is this?', 'helper text has correct value'); // eslint-disable-line no-unused-expressions
      expect(getComputedStyle(helper).color).to.equal('rgb(64, 64, 64)', 'helper has correct color');
    });

    it('detail', async () => {
      const inputter = await fixture(html`
          <${tag} helper="What is this?">
            <label slot="label">input label</label>
            <input type="text" value=""/>
            <p slot="tip-details">More info about the input</p>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      const inputterDetail = shadowRoot.querySelector('inputter-detail');
      expect(inputterDetail).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.open).to.be.false; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.querySelector('[slot="heading"]').textContent).to.equal('What is this?', 'helper text has correct value');
      expect(inputterDetail.querySelector('[name="tip-details"]').assignedNodes()[0].textContent)
        .to.equal('More info about the input', 'tip details has correct value');

      const detailShadowRoot = inputterDetail.shadowRoot;
      const detailsElement = detailShadowRoot.querySelector('.details');
      expect(getComputedStyle(detailsElement).color).to.equal('rgb(64, 64, 64)', 'helper has correct color');

      const content = detailShadowRoot.querySelector('.content');
      expect(getComputedStyle(content).borderInlineStartColor).to.equal('rgb(201, 201, 201)', 'helper detail has correct border start colour');
    });

    it('detail open', async () => {
      const inputter = await fixture(html`
        <${tag} helper="What is this?" isHelperOpen>
          <label slot="label">input label</label>
          <input type="text" value=""/>
          <p slot="tip-details">More info about the input</p>
        </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      const inputterDetail = shadowRoot.querySelector('inputter-detail');
      expect(inputterDetail).to.be.not.null; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.open).to.be.true; // eslint-disable-line no-unused-expressions
      expect(inputterDetail.querySelector('[slot="heading"]').textContent).to.equal('What is this?', 'helper text has correct value');
      expect(inputterDetail.querySelector('[name="tip-details"]').assignedNodes()[0].textContent)
        .to.equal('More info about the input', 'tip details has correct value');
    });
  });

  describe('text', async () => {
    it('disabled', async () => {
      const inputter = await fixture(html`
        <${tag}>
          <label slot="label">input label</label>
          <input type="text" value="" disabled/>
        </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      const mask = shadowRoot.querySelector('.has-mask');
      expect(mask).to.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.has-disabled')).to.not.be.null; // eslint-disable-line no-unused-expressions

      const inputElement = inputter.querySelector('input');
      expect(getComputedStyle(inputElement).color).to.equal('rgb(176, 176, 176)', 'disabled input has correct colour');
      expect(getComputedStyle(inputElement).backgroundColor).to.equal('rgb(226, 226, 226)', 'disabled input has correct background colour');
      expect(getComputedStyle(inputElement).borderTopColor).to.equal('rgb(176, 176, 176)', 'disabled input has correct border top colour');
      expect(getComputedStyle(inputElement).borderBottomColor).to.equal('rgb(176, 176, 176)', 'disabled input has correct border bottom colour');
      expect(getComputedStyle(inputElement).borderLeftColor).to.equal('rgb(176, 176, 176)', 'disabled input has correct border left colour');
      expect(getComputedStyle(inputElement).borderRightColor).to.equal('rgb(176, 176, 176)', 'disabled input has correct border right colour');
    });

    it('mask text', async () => {
      const inputter = await fixture(html`
        <${tag} mask="0000">
          <label slot="label">input label</label>
          <input type="text" value=""/>
        </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      const mask = shadowRoot.querySelector('.has-mask');
      expect(mask).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.has-disabled')).to.be.null; // eslint-disable-line no-unused-expressions

      const inputMask = shadowRoot.querySelector('.input-mask');
      expect(inputMask).to.not.be.null; // eslint-disable-line no-unused-expressions

      expect(getComputedStyle(inputMask).fontFamily).contains('Courier, monospace', 'mask has correct font family');
      expect(getComputedStyle(inputMask).color).to.equal('rgb(118, 118, 118)', 'mask has correct color');
    });

    it('validation on input', async () => {
      const inputter = await fixture(html`
          <${tag} validation=["isRequired","isBetween(8,20)"]>
            <label slot="label">input label</label>
            <input type="text" value=""/>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      const changeEventSpy = sinon.spy();
      inputter.addEventListener('change', changeEventSpy);

      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      const inputElement = inputter.querySelector('input');
      await fillIn(inputElement, 'abcd', 'input');

      await inputter.updateComplete;
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('abcd', '`change` event has value `abcd`');
      const validation = shadowRoot.querySelector('.validation');
      expect(validation).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(getComputedStyle(validation).color).to.equal('rgb(227, 102, 14)', 'validation has correct color');

      const validationMessage = shadowRoot.querySelector('.validation .message');
      expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationMessage.textContent.trim()).to.equal('Length must be between 8 and 20 characters.', 'validation message has correct value');

      const validationIcon = shadowRoot.querySelector('.validation .icon');
      expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationIcon.name).to.equal('exclamation-circle', 'validation icon has correct value');
    });

    it('validation on change', async () => {
      const inputter = await fixture(html`
          <${tag} validation=["isRequired","isBetween(8,20)"]>
            <label slot="label">input label</label>
            <input type="text" value=""/>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      const changeEventSpy = sinon.spy();
      inputter.addEventListener('change', changeEventSpy);

      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      const inputElement = inputter.querySelector('input');
      await fillIn(inputElement, 'abcd', 'change');

      await inputter.updateComplete;
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('abcd', '`change` event has value `abcd`');
      const validation = shadowRoot.querySelector('.validation');
      expect(validation).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(getComputedStyle(validation).color).to.equal('rgb(227, 102, 14)', 'validation has correct color');

      const validationMessage = shadowRoot.querySelector('.validation .message');
      expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationMessage.textContent.trim()).to.equal('Length must be between 8 and 20 characters.', 'validation message has correct value');

      const validationIcon = shadowRoot.querySelector('.validation .icon');
      expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationIcon.name).to.equal('exclamation-circle', 'validation icon has correct value');
    });

    it('mask & validation', async () => {
      const inputter = await fixture(html`
          <${tag} mask="0000" validation=["isRequired"]>
            <label slot="label">input label</label>
            <input type="text" value=""/>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      inputter.value = '12';
      const changeEventSpy = sinon.spy();
      inputter.addEventListener('change', changeEventSpy);

      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      const mask = shadowRoot.querySelector('.has-mask');
      expect(mask).to.not.be.null; // eslint-disable-line no-unused-expressions

      let inputMask = shadowRoot.querySelector('.input-mask');
      expect(inputMask).to.not.be.null; // eslint-disable-line no-unused-expressions

      const inputElement = inputter.querySelector('input');
      await fillIn(inputElement, '', 'change');

      await inputter.updateComplete;
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('', '`change` event has value ``');
      let validation = shadowRoot.querySelector('.validation');
      expect(validation).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(getComputedStyle(validation).color).to.equal('rgb(227, 102, 14)', 'validation has correct color');

      const validationMessage = shadowRoot.querySelector('.validation .message');
      expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

      const validationIcon = shadowRoot.querySelector('.validation .icon');
      expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationIcon.name).to.equal('exclamation-circle', 'validation icon has correct value');

      await fillIn(inputElement, '123', 'input');
      await inputter.updateComplete;
      expect(changeEventSpy.callCount).to.equal(2, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('123', '`change` event has value `123`');
      validation = shadowRoot.querySelector('.validation');
      expect(validation).to.be.null; // eslint-disable-line no-unused-expressions

      inputMask = shadowRoot.querySelector('.input-mask');
      expect(inputMask.textContent).to.be.equal('   0', '`input-mask` has correct value');
    });
  });

  describe('radio', async () => {
    it('standard radio', async () => {
      const inputter = await fixture(html`
          <${tag} heading="What is your heating source?">
            <input type="radio" id="question-gas" name="question" value="gas"></input>
            <label for="question-gas">Gas</label>
            <input type="radio" id="question-electricity" name="question" value="electricity"></input>
            <label for="question-electricity">Electricity</label>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-heading')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
    });

    it('radio mask', async () => {
      const inputter = await fixture(html`
          <${tag} mask="xxx" heading="What is your heating source?">
            <input type="radio" id="question-gas" name="question" value="gas" checked></input>
            <label for="question-gas">Gas</label>
            <input type="radio" id="question-electricity" name="question" value="electricity"></input>
            <label for="question-electricity">Electricity</label>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-heading')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions

      const changeEventSpy = sinon.spy();
      inputter.addEventListener('change', changeEventSpy);
      const inputElement = inputter.querySelectorAll('input');

      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[0].checked).to.true;

      inputElement[1].click();
      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[0].checked).to.false;
      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[1].checked).to.true;
      expect(inputter.value).to.equal('electricity', '`value` property has value `electricity`');
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
    });

    it('radio mask validation', async () => {
      const inputter = await fixture(html`
          <${tag} mask="xxx" heading="What is your heating source?" validation=["isRequired"]>
            <input type="radio" id="question-gas" name="question" value="gas"></input>
            <label for="question-gas">Gas</label>
            <input type="radio" id="question-electricity" name="question" value="electricity"></input>
            <label for="question-electricity">Electricity</label>
          </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-heading')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions

      const changeEventSpy = sinon.spy();
      inputter.addEventListener('change', changeEventSpy);
      const inputElement = inputter.querySelectorAll('input');

      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[0].checked).to.false;
      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[1].checked).to.false;

      await inputElement[1].focus();
      await inputElement[1].blur();

      await inputter.updateComplete;
      let validation = shadowRoot.querySelector('.validation');
      expect(validation).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(getComputedStyle(validation).color).to.equal('rgb(227, 102, 14)', 'validation has correct color');

      const validationMessage = shadowRoot.querySelector('.validation .message');
      expect(validationMessage).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationMessage.textContent.trim()).to.equal('This field is required.', 'validation message has correct value');

      const validationIcon = shadowRoot.querySelector('.validation .icon');
      expect(validationIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(validationIcon.name).to.equal('exclamation-circle', 'validation icon has correct value');
      inputElement[1].click();

      await inputter.updateComplete;
      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[0].checked).to.false;
      // eslint-disable-next-line no-unused-expressions
      expect(inputElement[1].checked).to.true;
      expect(inputter.value).to.equal('electricity', '`value` property has value `electricity`');
      expect(changeEventSpy.callCount).to.equal(1, '`change` event fired');
      expect(changeEventSpy.lastCall.args[0].detail.value).to.equal('electricity', '`change` event has value `electricity`');
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
      validation = shadowRoot.querySelector('.validation');
      expect(validation).to.be.null; // eslint-disable-line no-unused-expressions
    });
  });

  describe('select', async () => {
    it('standard select', async () => {
      const inputter = await fixture(html`
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
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      expect(shadowRoot.querySelector('.select')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('inputter-icon[name="chevron-circle-down"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
    });
  });

  describe('search', async () => {
    it('standard search', async () => {
      const inputter = await fixture(html`
        <${tag}>
          <label slot="label">Search</label>
          <input type="search">
        </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      expect(shadowRoot.querySelector('.search')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('inputter-icon[name="search"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
    });
  });

  describe('date', async () => {
    it('standard date', async () => {
      const inputter = await fixture(html`
        <${tag}>
          <label slot="label">Date</label>
          <input type="date">
        </${tag}>`);
      const shadowRoot = inputter.shadowRoot;

      await defaultChecks(inputter);
      expect(inputter.type).to.equal('standard', 'default type is set');
      expect(inputter.id).to.not.be.null; // eslint-disable-line no-unused-expressions

      expect(shadowRoot.querySelector('.date')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('inputter-icon[name="calendar"]')).to.not.be.null; // eslint-disable-line no-unused-expressions
      expect(shadowRoot.querySelector('.input-mask')).to.be.null; // eslint-disable-line no-unused-expressions
    });
  });
});
