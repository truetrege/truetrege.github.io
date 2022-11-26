class GameMatrix {
  constructor(options) {

    this.ROW = options && options.ROW ? options.ROW : 10;
    this.COL = options && options.COL ? options.COL : 9;
    this.matrix = [];
  }

  init(array) {
    if (array && array instanceof Array && this.checkMatrixSize(array)) {
      this.matrix = array;
    } else {
      this.new();
    }
  }

  update() {
    const deletedIndexes = {row: [], col: []};
    deletedIndexes.row = this.getIndexDeletedRows(this.matrix);
    deletedIndexes.col = this.getIndexDeletedRows(this.reverseMatrix());

    if (deletedIndexes.row.length === 0 && deletedIndexes.col.length === 0) {

    } else {

      this.collapseMatrix(deletedIndexes);
    }

  }

  get(row, col) {
    if (col || col === 0 && row || row === 0) {
      return this.matrix[row][col];
    } else if (!col && row) {
      return this.matrix[row];
    } else
      return this.matrix;
  }

  set(row, col, value) {
    this.matrix[row][col] = value;
  }

  clear() {
    for (let i = 0; i < this.ROW; i++) {
      for (let j = 0; j < this.COL; j++) {
        this.matrix[i][j] = this.matrix[i][j] === 1 ?
            0 :
            this.matrix[i][j];
      }
    }
  }

  getCountDeletedBox() {
    /**
     * TODO: ДУБЛИРУЕТСЯ В UPDATE ПОДУМАТЬ КАК ИСПРАВИТЬ!
     * */
    const deletedIndexes = {row: [], col: []};
    deletedIndexes.row = this.getIndexDeletedRows(this.matrix);
    deletedIndexes.col = this.getIndexDeletedRows(this.reverseMatrix());

    if (deletedIndexes.row.length === 0 && deletedIndexes.col.length === 0) {
      return 0;
    } else {
      return this.getScoreDeletedBox(deletedIndexes);
    }
  }

  getIndexDeletedRows(matrix) {
    let rows = [];
    matrix.forEach((row, index) => {
      if (row.every((col) => col === 2)) {
        rows.push(index);
      }
    });
    return rows;
  }

  getScoreDeletedBox(deletedIndexes) {
    let score = 0;
    score += deletedIndexes.row.length * this.ROW;
    score += deletedIndexes.col.length * this.COL;
    return score;
  }

  collapseRow(listRows, countCol, countRow) {
    listRows.sort((a, b) => b - a);
    listRows.forEach((row) => this.matrix.splice(row, 1));
    listRows.forEach((row) => {
      let newRow = [];
      for (let i = 0; i < countCol; i++) {
        newRow.push(0);
      }
      if (row <= countRow / 2) {
        this.matrix.unshift(newRow);
      } else {
        this.matrix.push(newRow);
      }
    });

  }

  collapseMatrix(deletedIndexes) {

    this.collapseRow(deletedIndexes.row, this.COL, this.ROW);
    this.matrix = this.reverseMatrix();
    this.collapseRow(deletedIndexes.col, this.ROW, this.COL);
    this.matrix = this.reverseMatrix();
  }

  new() {
    this.matrix = [];
    for (let i = 0; i < this.ROW; i++) {
      this.matrix.push([]);
      for (let j = 0; j < this.COL; j++) {
        this.matrix[i].push(0);
      }
    }
  }

  checkMatrixSize(array) {
    return array.length === this.ROW && array[0].length === this.COL;
  }

  reverseMatrix() {
    const newArray = [];
    if (this.matrix.every(el => el instanceof Array)) {

      for (let i = 0; i < this.matrix[0].length; i++) {
        newArray.push([]);
        for (let j = 0; j < this.matrix.length; j++) {
          newArray[i].push(this.matrix[j][i]);
        }
      }
    } else {

    }
    return newArray;
  }

}

export default GameMatrix;