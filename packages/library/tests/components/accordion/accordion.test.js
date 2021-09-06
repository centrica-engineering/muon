/* eslint-disable no-undef */
import { expect, fixture, html, defineCE, unsafeStatic } from '@open-wc/testing';
import { Accordion } from '@muon/library/components/accordion';

const tagName = defineCE(Accordion);
const tag = unsafeStatic(tagName);

describe('accordion', () => {
  it('implements standard self', async () => {
    const el = await fixture(html`<${tag}></${tag}>`);

    expect(el).shadowDom.to.equal('<slot name="heading"></slot><slot></slot>', 'has correct shadow DOM structure');
    expect(el.type).to.equal('standard');

    await expect(el).to.be.accessible();
  });

  it('implements DOM structure', async () => {
    const el = await fixture(html`<${tag}><h1 slot="heading">Hello World</h1></${tag}>`);

    expect(el).dom.to.equal('<test-0><h1 slot="heading">Hello World</h1></test-0>', 'has correct DOM structure');
    expect(el).lightDom.to.equal('<h1 slot="heading">Hello World</h1>', 'has correct light DOM structure');
    expect(el).shadowDom.to.equal('<slot name="heading"></slot><slot></slot>', 'has correct shadow DOM structure');

    await expect(el).to.be.accessible();
  });
});
