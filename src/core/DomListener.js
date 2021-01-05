import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root');
    }
    this.$root = $root;
    this.listeners = listeners;
    this.bindedListerners = [];
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`This ${method} is not implemented`);
      }
      const bindListener = this[method].bind(this);
      this.bindedListerners.push({listener, bindListener});
      this.$root.on(listener, bindListener);
    });
  }

  removeDOMListeners() {
    this.bindedListerners.forEach(({listener, bindListener}) => {
      this.$root.off(listener, bindListener);
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}