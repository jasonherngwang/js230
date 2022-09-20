class Constructor {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindUpdateTime(this.onUpdateTime.bind(this));
    this.view.bindStartStop(this.onStart.bind(this), this.onStop.bind(this));
    this.view.bindReset(this.onReset.bind(this));
  }

  onUpdateTime(timeObj) {
    this.view.updateTimeDisplay(timeObj);
  }

  onStart() {
    this.model.start();
  }

  onStop() {
    this.model.stop();
  }

  onReset() {
    this.model.reset();
  }
}

class Model {
  constructor() {
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.intervalObj = null;
  }

  start() {
    this.intervalObj = setInterval(() => {
      this.centiseconds += 1;

      if (this.centiseconds > 99) {
        this.seconds += 1;
        this.centiseconds = 0;
      }

      if (this.seconds > 59) {
        this.minutes += 1;
        this.seconds = 0;
      }

      if (this.minutes > 59) {
        this.hours += 1;
        this.minutes = 0;
      }

      if (this.hours > 99) {
        this.stop();
      }

      this.updateTime({
        centiseconds: this.centiseconds,
        seconds: this.seconds,
        minutes: this.minutes,
        hours: this.hours,
      });
    }, 10);
  }

  stop() {
    clearInterval(this.intervalObj);
  }

  reset() {
    this.stop();

    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;

    this.updateTime({
      centiseconds: this.centiseconds,
      seconds: this.seconds,
      minutes: this.minutes,
      hours: this.hours,
    });
  }

  bindUpdateTime(callback) {
    this.updateTime = callback;
  }
}

class View {
  constructor() {
    this.$centiseconds = $('#centiseconds');
    this.$seconds = $('#seconds');
    this.$minutes = $('#minutes');
    this.$hours = $('#hours');
    this.$startStopButton = $('#start_stop');
    this.$resetButton = $('#reset');
  }

  updateTimeDisplay(timeObj) {
    this.$centiseconds.text(this.numToString(timeObj.centiseconds));
    this.$seconds.text(this.numToString(timeObj.seconds));
    this.$minutes.text(this.numToString(timeObj.minutes));
    this.$hours.text(this.numToString(timeObj.hours));
  }

  numToString(num) {
    return String(num).padStart(2, '0');
  }

  bindStartStop(startHandler, stopHandler) {
    this.$startStopButton.on('click', (e) => {
      e.preventDefault();

      if (this.$startStopButton.text() === 'Start') {
        this.$startStopButton.text('Stop');
        startHandler();
      } else {
        this.$startStopButton.text('Start');
        stopHandler();
      }
    });
  }

  bindReset(resetCallback) {
    this.$resetButton.on('click', (e) => {
      e.preventDefault();
      this.$startStopButton.text('Start');
      resetCallback();
    });
  }
}

$(() => {
  const app = new Constructor(new Model(), new View());
});
