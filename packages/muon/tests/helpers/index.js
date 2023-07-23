import { expect } from '@open-wc/testing';
import { executeServerCommand } from '@web/test-runner-commands';

export const defaultChecks = async (el, options = {}) => {
  const { ignoredRules, ignoredTags } = options || {};
  const ignoredAttributes = options.ignoredAttributes || [];
  const snapshotOptions = await executeServerCommand('run-snapshots');
  if (snapshotOptions?.run === true) {
    await expect(el).shadowDom.to.equalSnapshot({
      ignoreAttributes: [...ignoredAttributes, 'style'] // @TODO: until we can work out why Chromium is weird
    });
  }

  const accessibilityOptions = {
    ignoredRules,
    ignoredTags
  };
  if (options.checkNotAccessible) {
    await expect(el).to.not.be.accessible(accessibilityOptions);
  } else {
    await expect(el).to.be.accessible(accessibilityOptions);
  }
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
