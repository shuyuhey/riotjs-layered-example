import riot from 'riot';
const coverObservable = riot.observable();

let nextId = 0;
let ids = [];

const CoverEvent = {
  OPEN_MODAL: Symbol('OPEN_MODAL'),
  CLOSE_MODAL: Symbol('CLOSE_MODAL')
};


export default class CoverMixin {
  init() {
    this.coverId = ++nextId;
    ids.push(this.coverId);
    this.isDark = true;

    this.on('mount', () => {
      coverObservable.trigger(CoverEvent.OPEN_MODAL);
      coverObservable.on(CoverEvent.OPEN_MODAL, this.onOtherCoverOpen);
      coverObservable.on(CoverEvent.CLOSE_MODAL, this.onOtherCoverClose);
    });

    this.on('unmount', () => {
      _.remove(ids, (item) => { return item === this.coverId });
      coverObservable.off(CoverEvent.OPEN_MODAL, this.onOtherCoverOpen);
      coverObservable.off(CoverEvent.CLOSE_MODAL, this.onOtherCoverClose);
      coverObservable.trigger(CoverEvent.CLOSE_MODAL);
    });
  }

  onOtherCoverOpen() {
    this.toggle();
  }

  onOtherCoverClose() {
    this.toggle();
  }

  toggle() {
    if (_.last(ids) === this.coverId) {
      this.toDarken();
    } else {
      this.toLighten();
    }
  }

  toDarken() {
    this.isDark = true;
    this.update();
  }

  toLighten() {
    this.isDark = false;
    this.update();
  }
}