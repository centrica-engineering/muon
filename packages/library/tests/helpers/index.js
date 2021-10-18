import { expect } from '@open-wc/testing';

export const defaultChecks = async (el) => {
  await expect(el).shadowDom.to.equalSnapshot();
  await expect(el).to.be.accessible();
};
