import NuBtn from './btn';

export default class NuCardBtn extends NuBtn {
  static get nuTag() {
    return 'nu-cardbtn';
  }

  static get nuName() {
    return 'card';
  }

  static get nuStyles() {
    return {
      display: 'block',
      padding: '1.5x 2x',
      border: '1bw :clear[hidden] :hover[1bw] :clear:hover[color(mark)]',
      flow: 'column',
      text: 'wrap :special[w5 wrap]',
      transition: 'theme, radius',
      shadow: '0 :clear[1.5]',
    }
  }
}
