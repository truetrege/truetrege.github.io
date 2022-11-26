import History from './history';

class Top {
  constructor() {
    this.htmlElement = document.createElement('ol');
    this.history = new History('TOP', 10);
  }

  update(score) {
    let topList = History.getValue(this.history.name);
    if (!topList || topList.length < this.history.stateCount &&
        !topList.some((el) => el === score)) {
      this.history.saveState(score);
      return;
    }
    topList.sort((a, b) => b - a);

    if (score > topList.pop() && !topList.some((el) => el === score)) {
      this.history.saveState(score);
    }
  }

  render() {

    let topList = History.getValue(this.history.name);
    if (!topList) {
      return;
    }
    topList.sort((a, b) => b - a);
    this.htmlElement.innerHTML = '';

    topList.forEach((li) => {
      let liHtml = document.createElement('li');
      liHtml.innerHTML = li;
      this.htmlElement.appendChild(liHtml);
    });
  }
}

export default Top;