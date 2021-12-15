import { expect } from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';

export const defaultChecks = async (el) => {
  if (executeServerCommand('run-snapshots')?.run === true) {
    expect(el).shadowDom.to.equalSnapshot();
  }

  await expect(el).to.be.accessible();
};

const fireChangeEvent = async (element) => {
  const event = new CustomEvent('change', { bubbles: true });
  await element.dispatchEvent(event);
};

export const fillIn = async (element, content) => {
  element.value = content;
  await fireChangeEvent(element);
};

export const selectEvent = async (element, value) => {
  element.value = value;
  await fireChangeEvent(element);
};
