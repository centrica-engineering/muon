import { MuonElement, css, unsafeCSS } from '@muons/library';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import styles from './detail-styles.css';
import {
  DETAIL_ICON_OPEN,
  DETAIL_ICON_CLOSE,
  DETAIL_ICON_POSITION
} from '@muons/library/build/tokens/es6/muon-tokens';

/**
 * A component to show and hide content related to a heading.
 *
 * @element detail
 */
export class Detail extends DetailMixin(MuonElement) {

  constructor() {
    super();
    this._toggleOpen = DETAIL_ICON_OPEN;
    this._toggleClose = DETAIL_ICON_CLOSE;
    this._togglePosition = DETAIL_ICON_POSITION;
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }
}
