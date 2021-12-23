import { expect } from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';

export const defaultChecks = async (el) => {
  if (executeServerCommand('run-snapshots')?.run === true) {
    expect(el).shadowDom.to.equalSnapshot();
  }

  await expect(el).to.be.accessible();
};

export const fireEvent = async (element, event) => {
  const customEvent = new CustomEvent(event, { bubbles: true });
  await element.dispatchEvent(customEvent);
};

const fireChangeEvent = async (element) => {
  await fireEvent(element, 'change');
};

export const fillIn = async (element, content, event = 'change') => {
  element.value = content;
  await fireEvent(element, event);
};

export const selectEvent = async (element, value) => {
  element.value = value;
  await fireChangeEvent(element);
};
