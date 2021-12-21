/* eslint-disable no-undef */
import { expect } from '@open-wc/testing';
import { MaskSeparatorController } from '@muons/library/controllers/mask-separator-controller';

describe('mask', async () => {
  describe('mask 00000', async () => {
    const host = {
      mask: '00000'
    };
    const maskController = new MaskSeparatorController(host);

    it('controller setup mask', async () => {
      expect(maskController.mask).to.be.equal('00000', 'controller has correct mask value');
    });

    it('controller setup seprator', async () => {
      expect(maskController.separator).to.be.equal(undefined);
    });

    it('update mask', async () => {
      expect(maskController.updateMaskValue('12')).to.be.equal('  000', 'mask value updated to correct');
    });
  });

  describe('mask `xxxxx-`', async () => {
    const host = {
      mask: 'xxxxx-'
    };
    const maskController = new MaskSeparatorController(host);

    it('controller setup mask', async () => {
      expect(maskController.mask).to.be.equal('xxxxx-', 'controller has correct mask value');
    });

    it('controller setup seprator', async () => {
      expect(maskController.separator).to.be.equal(undefined);
    });

    it('update mask', async () => {
      expect(maskController.updateMaskValue('quv')).to.be.equal('   xx-', 'mask value updated to correct');
    });
  });
});

describe('mask-separator', async () => {
  describe('mask `  -  -  `, separator `-`', async () => {
    const host = {
      mask: '00-00-00',
      separator: '-'
    };
    const maskController = new MaskSeparatorController(host);

    it('controller setup mask', async () => {
      expect(maskController.mask).to.be.equal('00-00-00', 'controller has correct mask value');
    });

    it('controller setup seprator', async () => {
      expect(maskController.separator).to.be.equal('-', 'controller has correct separator value');
    });

    it('update mask', async () => {
      expect(maskController.updateMaskValue('1')).to.be.equal(' 0-00-00', 'mask value updated to correct');
    });

    it('update value', async () => {
      expect(maskController.formatWithMaskAndSeparator('1')).to.be.equal('1', 'processed value has correct value');
    });

    it('update mask without separator', async () => {
      expect(maskController.updateMaskValue('12')).to.be.equal('   00-00', 'mask value updated to correct');
    });

    it('update value without separator', async () => {
      expect(maskController.formatWithMaskAndSeparator('12')).to.be.equal('12-', 'processed value has correct value');
    });

    it('update value with separator', async () => {
      expect(maskController.formatWithMaskAndSeparator('1-23')).to.be.equal('12-3', 'processed value has correct value');
    });

    it('update mask with separator', async () => {
      expect(maskController.updateMaskValue('1-23')).to.be.equal('    0-00', 'mask value updated to correct');
    });
  });
});
