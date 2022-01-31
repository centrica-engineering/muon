import { MuonElement, css, unsafeCSS } from '@muons/library';
import { DetailMixin } from '@muons/library/mixins/detail-mixin';
import styles from './styles.css';
import {
  DETAIL_TOGGLE_OPEN,
  DETAIL_TOGGLE_CLOSE,
  DETAIL_TOGGLE_POSITION
} from '@muons/library/build/tokens/es6/muon-tokens';

/**
 * A component to show and hide content related to a heading.
 *
 * @element detail
 */
export class Detail extends DetailMixin(MuonElement) {

  constructor() {
    super();
    this._toggleOpen = DETAIL_TOGGLE_OPEN;
    this._toggleClose = DETAIL_TOGGLE_CLOSE;
    this._togglePosition = DETAIL_TOGGLE_POSITION;
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }
}
