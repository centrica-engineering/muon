import { css, html, LitElement, unsafeCSS, classMap, ScopedElementsMixin } from '@muon/library';
import { Icon } from '@muon/library/components/icon';
import {
  CALENDAR_TYPE
} from '@muon/library/build/tokens/es6/muon-tokens';

import styles from './styles.css';

/**
 * Calendar
 *
 * @element calendar
 *
 */

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export class Calendar extends ScopedElementsMixin(LitElement) {

  static get scopedElements() {
    return {
      'calendar-icon': Icon
    };
  }

  static get properties() {
    return {
      type: { type: String },
      month: { type: Number },
      year: { type: Number },
      disabledDates: { type: Array, attribute: 'disabled-dates' },
      enabledDates: { type: Array, attribute: 'enabled-dates' },
      minDate: { type: String, attribute: 'min-date' },
      maxDate: { type: String, attribute: 'max-date' },
      selectOnFocus: { type: Boolean, attribute: 'select-on-focus' },
      initDate: { type: String, attribute: 'init-date' },
      focusDate: { type: String, attribute: 'focus-date' },
      isoSelectedDate: { type: String, attribute: 'iso-selected-date' },
      _selected: { type: String, state: true }
    };
  }

  static get styles() {
    return css`${unsafeCSS(styles)}`;
  }

  constructor() {
    super();
    const today = new Date();

    this.type = CALENDAR_TYPE;
    this.today = this.dateFormat(today);
    this.month = today.getMonth() + 1;
    this.year = this.today.year;
    this._selected = this.today.date;

    this.disabledDates = [];
  }

  dateFormat(date) {
    date.setHours(4); // Force it to be on the right date
    const dateFormat = new Intl.DateTimeFormat('en-GB').format(date);
    const formatParts = new Intl.DateTimeFormat('en-GB', dateOpts).formatToParts(date);

    const obj = {
      date: dateFormat,
      isoDate: date.toISOString().split('T')[0]
    };

    for (let i = 0; formatParts.length > i; i++) {
      obj[formatParts[i].type] = formatParts[i].value;
    }

    return obj;
  }

  get formattedMonth() {
    const date = new Date(this.year, this.month - 1);

    return this.dateFormat(date);
  }

  get canGoToPrev() {
    const prevMonth = new Date(this.year, this.month - 2, 31);
    const prevFormat = this.dateFormat(prevMonth);

    return this.minDate ? this.minDate.replace(/-/g, '') < prevFormat.isoDate.replace(/-/g, '') : true;
  }

  get canGoToNext() {
    const nextMonth = new Date(this.year, this.month, 31);
    const nextFormat = this.dateFormat(nextMonth);

    return this.maxDate ? this.maxDate.replace(/-/g, '') > nextFormat.isoDate.replace(/-/g, '') : true;
  }

  get addNavigation() {
    return html`
      <nav class="navigation">
        <button @click=${() => this.month -= 1} title="Previous Month" .disabled=${!this.canGoToPrev}>
          <calendar-icon name="chevron-left"></calendar-icon>
        </button>
        <button @click=${() => this.month += 1} title="Next Month" .disabled=${!this.canGoToNext}>
          <calendar-icon name="chevron-right"></calendar-icon>
        </button>
      </nav>
    `;
  }

  checkDateEnabled(date) {
    const min = this.minDate ? this.minDate.replace(/-/g, '') : undefined;
    const max = this.maxDate ? this.maxDate.replace(/-/g, '') : undefined;
    const formatDate = date.replace(/-/g, '');
    let isEnabled = true;

    if (min) {
      isEnabled = min < formatDate;
    }

    if (isEnabled && max) {
      isEnabled = max > formatDate;
    }

    return isEnabled;
  }

  get addMonthTable() {
    const amountOfDays = new Date(this.year, this.month, 0).getDate();
    const firstDay = new Date(this.year, this.month - 1, 1);
    const firstDayFormat = this.dateFormat(firstDay);
    const amountOfRows = Math.ceil(parseInt(amountOfDays + daysOfWeek.indexOf(firstDayFormat.weekday)) / 7);
    const arrRows = Array.from(Array(amountOfRows));
    let daysAdded = 0;

    return html`
      <table role="grid">
        <caption>${this.formattedMonth.month} ${this.formattedMonth.year}</caption>
        <thead>
          <tr>
            ${daysOfWeek.map((day) => html`<th aria-label="${day}">${day[0]}</th>`)}
          </tr>
        </thead>

        <tbody>
          ${arrRows.map(() => html`
            <tr>
              ${daysOfWeek.map((day) => {/* eslint-disable indent */

                const date = new Date(this.year, this.month - 1, daysAdded + 1);
                const dateDetails = this.dateFormat(date);

                if (
                  dateDetails.weekday === day &&
                  dateDetails.month === this.formattedMonth.month &&
                  daysAdded <= amountOfDays
                ) {
                  const isToday = dateDetails.date === this.today.date;
                  const isSelected = dateDetails.date === this.selected;
                  const isDisabled = this.disabledDates?.includes(dateDetails.date);
                  const isEnabled = this.checkDateEnabled(dateDetails.isoDate);
                  const isClickable = isEnabled && !isDisabled;
                  const tabindex = isClickable ? -1 : 0;
                  const classes = {
                    date: true,
                    disabled: isDisabled,
                    enabled: isEnabled,
                    today: isToday,
                    selected: isSelected
                  };

                  daysAdded += 1;

                  const setSelected = () => {
                    this._selected = isClickable && dateDetails.date || this.selected;
                    this.isoSelectedDate = isClickable && dateDetails.isoDate || this.isoSelectedDate;
                    this.dispatchEvent(new CustomEvent('change'));
                  };

                  const keyPressed = (event, date) => {
                    const [year, month, day] = date.split('-');
                    let movement = 0;

                    // calculate how many days need moving based on key press
                    switch (event.key) {
                      case 'Enter':
                        setSelected();
                        event.preventDefault();

                        return;
                      case 'ArrowRight':
                        movement = 1;
                        break;
                      case 'ArrowLeft':
                        movement = -1;
                        break;
                      case 'ArrowDown':
                        movement = 7;
                        break;
                      case 'ArrowUp':
                        movement = -7;

                        break;
                      default: return;
                    }

                    const nextDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + movement);
                    const nextDateDetails = this.dateFormat(nextDate);
                    const [newYear, newMonth] = nextDateDetails.isoDate.split('-');
                    let changed = true;

                    if (newMonth !== month) {
                      if ((movement > 0 && this.canGoToNext) || (movement < 0 && this.canGoToPrev)) {
                        this.month = parseInt(`${newYear}${newMonth}`) < parseInt(`${year}${month}`) ? this.month - 1 : this.month + 1;
                      } else {
                        changed = false;
                      }
                    }

                    if (changed) {
                      this.updateComplete.then(() => {
                        this.shadowRoot.querySelector(`time[datetime="${nextDateDetails.isoDate}"]`).parentElement.focus();
                      });
                    }
                  };

                  return html`
                    <td @keydown=${(event) => keyPressed(event, dateDetails.isoDate)} @click=${setSelected} role="gridcell" tabindex="${tabindex}" class="${classMap(classes)}">
                      <time datetime="${dateDetails.isoDate}">${dateDetails.day}</time>
                    </td>`;
                }

                return html`<td class="empty"></td>`;
              /* eslint-enable indent */})}
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  get standardTemplate() {
    const classes = {
    };

    return html`
      <div class="${classMap(classes)}">
        ${this.addNavigation}
        ${this.addMonthTable}
      </div>
    `;
  }

  updated(changedProperties) {
    console.log('changed', changedProperties);
  }

  render() {
    return html`${this[`${this.type}Template`]}`;
  }
}
