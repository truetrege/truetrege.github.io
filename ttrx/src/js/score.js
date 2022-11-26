class Score {
  constructor() {
    this.htmlElement = document.createElement('div');
    this.score = 0;
  }

  update(plus){
    this.score += plus;

  }
  get() {
    return this.score;
  }

  set(value) {
    this.score = value;
  }

  render() {
    this.htmlElement.innerHTML = this.get();
  }
}

export default Score;