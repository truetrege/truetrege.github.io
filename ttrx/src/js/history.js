//JSON.parse(localStorage.getItem("top10"));
//
//localStorage.setItem("top10", JSON.stringify(mass));

class History {
  //TODO: (OPTOINS) && .....
  constructor(name, size) {
    this.name = name || 'defName';
    this.stateCount = size || 2;
    //TODO: TOP10 ВЫНЕСТИ ЗА STATEGAME!!! ИЛИ ОЧИЩАТЬ КАК ТО ИНАЧЕ?!
  }

  static getValue(name) {

    let value = localStorage.getItem(name);
    if (value) {

      value = JSON.parse(value);
    }
    return value;
  }

  static setValue(name, value) {
    localStorage.setItem(name, value);
  }

  clearState() {
    History.setValue(this.name, 'null');
  }

  saveState(stateGame) {

    let prevState = History.getValue(this.name);
    if (!prevState) {
      prevState = [];
      prevState.push(stateGame);
    } else {
      if (prevState.length >= this.stateCount) {
        prevState.shift();
      }
      prevState.push(stateGame);
    }
    History.setValue(this.name, JSON.stringify(prevState));
  }

  returnPrevState() {
    const state = History.getValue(this.name);
    return state.shift();
  }

  returnState() {
    const state = History.getValue(this.name);
    return state ? state.pop() : false;
  }

}

export default History;