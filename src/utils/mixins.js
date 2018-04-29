export const intervalMixin = Base =>
  class extends Base {
    interval = 1000 * 25; // 25 sec
    intervalID = null;

    componentWillUnmount() {
      this.resetInterval();
    }

    resetInterval() {
      this.intervalID && clearInterval(this.intervalID);
    }
  };
