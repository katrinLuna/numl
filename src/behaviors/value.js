import WidgetBehavior from './widget';
import { isEqual, query, queryById } from '../helpers';

export default class ValueBehavior extends WidgetBehavior {
  static get params() {
    return {
      provideValue: false,
      contextValue: false,
    };
  }

  init() {
    super.init();

    this.linkContext('typedValue', (value) => {
      if (value === undefined) return;

      this.setValue(value);
    }, 'parentValue');

    if (!this.value) {
      this.setValue(null);
    }
  }

  setValue(value) {
    if (isEqual(this.value, value)) return;

    this.value = value;

    this.apply();
  }

  fromHostValue(value) {
    super.fromHostValue(value);

    this.apply();
  }

  apply() {
    let { list, value } = this;

    if (list != null) {
      const listEl = list ? queryById(this.host, list) : query(this.host, '[nu-listbox]');

      if (listEl && listEl.nuListBox && listEl.nuListBox.options.length) {
        const listbox = listEl.nuListBox;
        const option = listbox.getOptionByValue(this.value);

        if (option) {
          this.host.innerHTML = option.host.innerHTML;

          this.setMod('empty', false);

          return;
        }
      } else {
        setTimeout(() => {
          if (this.list != null) {
            this.apply();
          }
        });
      }
    }

    const hasValue = value != null;

    if (value == null) {
      value = '&nbsp;';
    } else if (value instanceof Date) {
      value = `<nu-datetime value="${String(value)}" date></nu-datetime>`;
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      value = `
        <nu-flex gap>
          <nu-datetime value="${String(value[0])}" date></nu-datetime>
          <nu-el>–</nu-el>
          <nu-datetime value="${String(value[1])}" date></nu-datetime>
        </nu-flex>
      `;
    } else if (typeof value === 'boolean') {
      value = value ? '<nu-icon name="check"></nu-icon>' : '<nu-icon name="minus"></nu-icon>';
    } else if (typeof value === 'object') {
      value = `<pre>${JSON.stringify(value, null, 2)}</pre>`;
    }

    this.host.innerHTML = (hasValue ? value : this.placeholder) || '&nbsp;';

    this.setMod('empty', !hasValue);
  }
}
