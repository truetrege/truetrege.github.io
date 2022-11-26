import {elements, sizeElements,maxLengthElements} from './elements';
import GameField from './gameField';

class Figure {
  constructor(options) {
    this.numElement = this.randomElement();
    this.fieldFigure = new GameField(options);
  }

  render() {
    let arr = elements[this.numElement].concat();

    arr.forEach((el, index, array) => array[index] = el.split(''));
    this.fieldFigure.init(arr.length, arr[0].length);
    this.fieldFigure.render(arr);
  }

  randomElement() {
    let num = Math.round(Math.random() * 100);
    if (num > elements.length - 1) {
      num = this.randomElement(num);
    }
    return num;
  }

  newElement() {
    this.numElement = this.randomElement();
  }

  checkElement(arrayPlots) {
    //проверка массива из selectedBox на совпадение с текущей фигурой
    if (arrayPlots.length <= maxLengthElements) {
      //4to to strashnoe tvoritsya?!
      arrayPlots.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
      let maxRow = -1, maxCol = -1, minRow = 99, minCol = 99;

      arrayPlots.forEach((element) => {
        maxRow = element.row > maxRow ? element.row : maxRow;
        maxCol = element.col > maxCol ? element.col : maxCol;
        minRow = element.row < minRow ? element.row : minRow;
        minCol = element.col < minCol ? element.col : minCol;
      });

      const ROW = maxRow - minRow + 1;

      const COL = maxCol - minCol + 1;
      let sizeFlag = sizeElements.some((o) => (o.h === ROW && o.w === COL));

      if (sizeFlag) {
        let matrixFigure = [];
        for (let i = 0; i < ROW; i++) {
          matrixFigure[i] = [];
          for (let j = 0; j < COL; j++) {
            matrixFigure[i][j] = 0;
          }
        }
        arrayPlots.forEach((element) => {
          matrixFigure[element.row - minRow][element.col - minCol] = 1;
        });

        matrixFigure.forEach(
            (row, index, array) => array[index] = row.join(''));

        let hitFlag = true;
        for (let i = 0; i < elements[this.numElement].length; i++) {
          hitFlag = elements[this.numElement][i] === matrixFigure[i];
          if (!hitFlag) break;
        }
        return hitFlag;
      }

    }

    return false;
  }

  checkInscribeFigure(matrix) {
    /*
    * NEW !!
    * */
    let widthMatrix = matrix[0].length;
    let figure = elements[this.numElement].concat();
    let widthFigure = figure[0].length;

    matrix.forEach((el, ind, array) => array[ind] = el.join(''));
    matrix = matrix.join('|');
    figure.forEach((el, ind, array) => array[ind] = el.replace(/0/g, '.').
        replace(/1/g, '0'));

    let regularSearchString = figure.join(
        '.{' + (widthMatrix - widthFigure + 1) + '}');
    let indexSearchFigure = matrix.search(regularSearchString);

    return indexSearchFigure >= 0;
  };

}

export default Figure;