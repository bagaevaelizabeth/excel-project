import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const type = event.target.dataset.resize;
    let value;

    console.log($parent)
    document.onmousemove = e => {
      if (type === 'col') {
        console.log($resizer)
        const delta = e.pageX - coords.right;
        value = (coords.width + delta) + 'px';
        $resizer.css({
          opacity: 1,
          bottom: '-5000px',
          right: -delta + 'px'
        });
      }
      if (type === 'row') {
        const delta = e.pageY - coords.bottom;
        value = (coords.height + delta) + 'px';
        console.log('row' + value);
        $resizer.css({
          opacity: 1,
          right: '-5000px',
          bottom: -delta + 'px'
        });
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === 'col') {
          $parent.css({width: value})
          this.$root.getAll(`[data-col="${$parent.data.col}"]`).forEach(el => {
            $(el).css({width: value})
          });
          $resizer.css({
            opacity: 0,
            right: 0,
            bottom: 0
          });
        } if (type === 'row') {
          $parent.css({height: value});
          $resizer.css({
            opacity: 0,
            right: 0,
            bottom: 0
          });
        }
      }
    }
  }
}
