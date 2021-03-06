import NuBlock from './block';
import { SIZES } from '../attributes/size';
import { devMode, warn } from '../helpers';

const LEVELS = [1, 2, 3, 4, 5, 6];

export default class NuHeading extends NuBlock {
  static get nuTag() {
    return 'nu-heading';
  }

  static get nuRole() {
    return 'heading';
  }

  static get nuGenerators() {
    return {
      level(val) {
        if (!val || !LEVELS.includes(Number(val))) val = 1;

        const fontSize = `${SIZES[`h${val}`][0]}rem`;
        const lineHeight = `${SIZES[`h${val}`][1]}rem`;

        return [{
          $suffix: ':not([size])',
          'font-size': fontSize,
          'line-height': lineHeight,
          '--nu-font-size': fontSize,
          '--nu-line-height': lineHeight,
        }];
      },
    };
  }

  static get nuAttrs() {
    return {
      level: 2,
    };
  }

  static get nuStyles() {
    return {
      level: this.nuAttrs.level,
      color: 'text-soft',
      text: 'heading',
    };
  }

  nuChanged(name, oldValue, value) {
    super.nuChanged(name, oldValue, value);

    switch (name) {
      case 'level':
        if (!value) value = this.constructor.nuAttrs.level;

        if (devMode && !LEVELS.includes(Number(value))) {
          return warn('invalid heading level', value);
        }

        this.nuSetAria('level', value);
        break;
    }
  }

  nuConnected() {
    super.nuConnected();

    const region = this.closest('[nu-region]');

    if (region && !region.nuHasAria('labelledby') && !region.hasAttribute('labelledby')) {
      region.nuSetAria('labelledby', this.nuUniqId);
    }

    const previous = this.previousElementSibling;

    if (!this.hasAttribute('padding') && previous && !previous.nuDefinition) {
      this.setAttribute('padding', '1em top');
    }
  }
}
