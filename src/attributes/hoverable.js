import { hasNoMod, parseAttr } from '../helpers';

export default function hoverableAttr(val) {
  const { values, mods, color } = parseAttr(val, 1);

  const size = values[0] || '0';

  const styles = [{
    '--nu-local-hover-shadow': `0 0 0 0 transparent, 0 0 0 9999rem transparent inset`,
  }];

  const hoverColor = color || 'var(--nu-local-hover-color, var(--nu-hover-color))';

  if (!hasNoMod(mods)) {
    styles[0].$suffix = ':not(:hover)';
    styles.push({
      $suffix: ':hover',
      '--nu-local-hover-shadow': `0 0 0 ${size} ${hoverColor}, 0 0 0 9999rem ${hoverColor} inset`,
    });
  }

  return styles;
};
