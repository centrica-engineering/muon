/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic, waitUntil } from '@open-wc/testing';
import { MuonElement } from '@muons/library';
import sinon from 'sinon';
import { defaultChecks } from '../helpers';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';

const MuonDetailElement = class extends DetailMixin(MuonElement) {};

const TestDetailElement = class extends DetailMixin(MuonElement) {
  constructor() {
    super();

    this._openIcon = 'chevron-down';
    this._closeIcon = 'chevron-up';
    this._togglePosition = 'start';
  }
};

const tagName = defineCE(MuonDetailElement);
const tag = unsafeStatic(tagName);

describe('detail', () => {
  it('standard', async () => {
    const detailElement = await fixture(html`<${tag}></${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(false, '`open` property has default value `false`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(false, '`open` attribute has correct value `false`');
  });

  it('standard open', async () => {
    const detailElement = await fixture(html`<${tag} open></${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(true, '`open` property has default value `true`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(true, '`open` property has correct value `true`');
  });

  it('standard slotted content', async () => {
    const detailElement = await fixture(html`
    <${tag}>
      <h3 slot="heading">Can I manage my account online?</h3>
      <p>
        fjkbdkf dfnbkdf udbkfgdkjf
      </p>
    </${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(false, '`open` property has default value `false`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(false, '`open` property has correct value `false`');

    const toggleEventSpy = sinon.spy();
    detailElement.addEventListener('toggle', toggleEventSpy);

    const summary = detail.querySelector('.summary');
    const heading = summary.querySelector('slot[name="heading"]');

    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(heading.assignedElements()[0].textContent).to.equal('Can I manage my account online?', '`heading` slot has value `What is your heating source?`');

    const content = detail.querySelector('.panel > slot');
    expect(content).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(content.assignedElements()[0].textContent.trim()).to.equal('fjkbdkf dfnbkdf udbkfgdkjf', '`heading` slot has value `What is your heating source?`');
  });

  it('standard toggle event true', async () => {
    const detailElement = await fixture(html`
    <${tag}>
      <h3 slot="heading">Can I manage my account online?</h3>
      <p>
        fjkbdkf dfnbkdf udbkfgdkjf
      </p>
    </${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(false, '`open` property has default value `false`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(false, '`open` property has correct value `false`');

    const toggleEventSpy = sinon.spy();
    detailElement.addEventListener('detail-toggle', toggleEventSpy);

    const summary = detail.querySelector('.summary');
    const heading = summary.querySelector('slot[name="heading"]');

    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions

    summary.click();

    await waitUntil(() => detailElement.open);
    expect(detailElement.open).to.equal(true, '`open` property has default value `true`');
    expect(detail.open).to.equal(true, '`open` property has correct value `true`');
    expect(toggleEventSpy.callCount).to.equal(1, '`toggle` event fired');
    expect(toggleEventSpy.lastCall.args[0].detail.open).to.equal(true, '`toggle` event has isOpen `true`');
  });

  it('standard toggle event false', async () => {
    const detailElement = await fixture(html`
    <${tag} open>
      <h3 slot="heading">Can I manage my account online?</h3>
      <p>
        fjkbdkf dfnbkdf udbkfgdkjf
      </p>
    </${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(true, '`open` property has default value `true`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(true, '`open` property has correct value `true`');

    const toggleEventSpy = sinon.spy();
    detailElement.addEventListener('detail-toggle', toggleEventSpy);

    const summary = detail.querySelector('.summary');
    const heading = summary.querySelector('slot[name="heading"]');

    expect(heading).to.not.be.null; // eslint-disable-line no-unused-expressions

    summary.click();

    await waitUntil(() => !detailElement.open);

    expect(detail.open).to.equal(false, '`open` property has correct value `false`');
    expect(toggleEventSpy.callCount).to.equal(1, '`toggle` event fired');
    expect(toggleEventSpy.lastCall.args[0].detail.open).to.equal(false, '`toggle` event has open `false`');
    expect(detailElement.open).to.equal(false, '`open` property has default value `false`');
  });

  it('standard icon', async () => {
    const tagName = defineCE(TestDetailElement);
    const tag = unsafeStatic(tagName);
    const detailElement = await fixture(html`<${tag}></${tag}>`);
    await defaultChecks(detailElement);

    expect(detailElement.type).to.equal('standard', '`type` property has default value `standard`');
    expect(detailElement.open).to.equal(false, '`open` property has default value `false`');
    const shadowRoot = detailElement.shadowRoot;
    const detail = shadowRoot.querySelector('details');

    expect(detail).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(detail.open).to.equal(false, '`open` attribute has correct value `false`');

    const toggleIcon = detail.querySelector('.toggle-icon');
    expect(toggleIcon).to.not.be.null; // eslint-disable-line no-unused-expressions
    expect(toggleIcon.name).to.equal('chevron-down', '`toggleIcon` has correct value `chevron-down`');
    expect(toggleIcon.nextElementSibling.name).to.equal('heading');

    const summary = detail.querySelector('.summary');
    summary.click();

    await waitUntil(() => detailElement.open);
    expect(toggleIcon.name).to.equal('chevron-up', '`toggleIcon` has correct value `chevron-up`');
  });
});
