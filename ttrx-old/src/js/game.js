import Template from './template';
import GameField from './gameField';
import History from './history';
import Figure from './figure';
import Score from './score';
import Top from './top';
import Button from './button';
import GameMatrix from './gameMatrix';
import Theme from './theme';
import {maxLengthElements} from './elements';

class Game {

    constructor(options) {
        this.stateGame = 0;
        this.nextStateGame = 0;
        this.STATE = {
            TICK: 0,
            UPDATE: 1,
            NEWCOORDS: 2,
            NEW: 3,
            END: 4,
            BACK: 5,
            NEXT: 7,
            COLLAPSE: 8,
        };

        this.gameMatrix = new GameMatrix({
            ROW: options && options.ROW ? options.ROW : 10,
            COL: options && options.COL ? options.COL : 9,
        });

        this.MOUSE_DOWN = false;
        this.RENDER = false;
        this.coords = {x: null, y: null};
        this.selectedBox = [];
        //TODO: new Top
        this.score = new Score();
        this.template = new Template();
        this.history = new History('stateGame');
        this.top = new Top();

        this.field = new GameField();
        this.figures = [
            new Figure(),
            new Figure()];

        this.theme = new Theme({
            field: this.field,
            figures: this.figures,
            template: this.template,
        });

        this.buttons = [];
        this.buttons ['newGame'] = new Button('Новая игра','new');
        this.buttons ['back'] = new Button('Назад','back');

        for (let i in this.buttons) {
            if (this.buttons.hasOwnProperty(i)) {
                this.buttons[i].htmlElement.addEventListener('click',
                    (e) => this.clickButton(e, i),
                    false);
            }
        }
        const self = this;
        this.theme.htmlElement.addEventListener('change',
            function (e) {
                self.changeTheme(e, this);
            }, false);

        this.field.htmlElement.addEventListener('mousedown',
            (e) => this.downMouse(e, this), false);
        this.field.htmlElement.addEventListener('touchstart',
            (e) => this.downMouse(e, this), false);
        this.field.htmlElement.addEventListener('touchend',
            (e) => this.upMouse(e, this), false);
        this.field.htmlElement.addEventListener('touchmove',
            (e) => this.moveMouse(e, this), false);


        this.field.htmlElement.addEventListener('mouseup',
            (e) => this.upMouse(e, this), false);
        this.field.htmlElement.addEventListener('mousemove',
            (e) => this.moveMouse(e, this), false);
        this.field.htmlElement.addEventListener('mouseover',
            (e) => this.overMouse(e, this), false);
        window.addEventListener('resize',
            (e) => this.resizeWindow(e, this), false);
    }

    changeTheme(e, select) {
        this.theme.set(select.value);
        this.theme.change();
        this.saveGame();
        this.init();
        this.RENDER = true;
    }

    resizeWindow() {
        this.init();
    }

    downMouse(e) {
        if (e.touches && e.touches[0]) {
            this.MOUSE_DOWN = true;
            this.coords.x = e.touches[0].pageX;
            this.coords.y = e.touches[0].pageY;
            this.stateGame = this.STATE.UPDATE;
        } else {
            this.MOUSE_DOWN = true;
            this.coords.x = e.x;
            this.coords.y = e.y;
            this.stateGame = this.STATE.UPDATE;
        }
        e.preventDefault();

    }

    upMouse() {
        this.MOUSE_DOWN = false;
    }

    overMouse() {
        this.MOUSE_DOWN = false;
    }

    moveMouse(e) {
        if (this.MOUSE_DOWN) {
            if (e.touches && e.touches[0]) {
                this.coords.x = e.touches[0].pageX;
                this.coords.y = e.touches[0].pageY;
            } else {
                this.coords.x = e.x;
                this.coords.y = e.y;
            }
            this.stateGame = this.STATE.UPDATE;
        }
        e.preventDefault();
    }

    clickButton(e, name) {
        switch (name) {
            case 'newGame':
                this.stateGame = this.STATE.NEW;
                break;
            case 'back':
                this.stateGame = this.STATE.BACK;
                break;
            default:
                break;
        }
    }

    checkBox(x, y) {

        const plot = this.field.getPlot(x, y);

        if ((plot.col < this.gameMatrix.COL && plot.col >= 0) &&
            (plot.row < this.gameMatrix.ROW && plot.row >= 0)) {

            let notConic = this.gameMatrix.get(plot.row, plot.col) !== 0;

            if (!notConic) {
                this.selectedBox.push({col: plot.col, row: plot.row});
                if (this.selectedBox.length > maxLengthElements) {
                    this.selectedBox.shift();
                }
                return true;
            }
            return false;
        } else return false;
    }

    update() {
        if (this.stateGame === this.STATE.BACK) {
            this.backGame();
            this.RENDER = true;
        }

        if (this.stateGame === this.STATE.UPDATE) {
            if (this.checkBox(this.coords.x, this.coords.y)) {
                this.stateGame = this.STATE.NEWCOORDS;
            }
        }
        if (this.stateGame === this.STATE.NEW) {
            this.newGame();
            this.RENDER = true;
        }
        if (this.stateGame === this.STATE.END) {
            this.endGame();
            this.newGame();
            this.RENDER = true;
        }

        if (this.stateGame === this.STATE.NEWCOORDS) {
            if (this.checkFigures()) {
                this.selectedBox.forEach(
                    (el) => this.gameMatrix.set(el.row, el.col, 2));
                this.score.update(this.gameMatrix.getCountDeletedBox());
                this.score.update(4);

                this.stateGame = this.STATE.NEXT;
                this.nextStateGame = this.STATE.COLLAPSE;

                this.selectedBox = [];

                //this.saveGame();
                this.MOUSE_DOWN = false;

            } else {
                this.selectedBox.forEach((o) => (this.gameMatrix.set(o.row, o.col, 1)));
            }
            this.RENDER = true;

        }
        if (this.stateGame === this.STATE.COLLAPSE) {
            this.gameMatrix.update();
            if (this.checkEndGame()) {

                this.gameMatrix.update();
                this.stateGame = this.STATE.NEXT;
                this.nextStateGame = this.STATE.END;
            }
            this.saveGame();
            this.RENDER = true;

        }
        if (this.stateGame === this.STATE.NEXT) {
            this.stateGame = this.nextStateGame;
            this.nextStateGame = this.STATE.TICK;
            this.RENDER = true;
            return;
        }

        this.stateGame = this.STATE.TICK;
    }

    render() {
        if (this.RENDER) {

            this.field.render(this.gameMatrix.get());
            this.template.render({
                figures: this.figures,
                score: this.score,
                top: this.top,
            });
        }
        this.RENDER = false;
    }

    init() {

        let historyState = this.history.returnState();
        if (historyState) {
            this.gameMatrix.init(historyState.field);
            this.figures.forEach(
                (figure, index) => figure.numElement = historyState.figures[index]);
            this.score.set(historyState.score);
            this.theme.init(historyState.theme);
        } else {
            this.gameMatrix.init();
            this.saveGame();
            this.theme.init();
        }
        if (window.screen.width < 640) {
            this.template.mobile = true;
            this.theme.mobile = true;
        }else{
            this.template.mobile = false;
            this.theme.mobile = false;
        }
        this.theme.change();

        this.field.init(this.gameMatrix.ROW, this.gameMatrix.COL);

        this.template.init({
            field: this.field.htmlElement,
            themes: this.theme.htmlElement,
            figures: this.figures,
            score: this.score,
            buttons: this.buttons,
            top: this.top,
        });

        this.checkEndGame();
        this.RENDER = true;
    }

    newGame() {

        this.gameMatrix.init();
        this.score.set(0);
        this.figures.forEach((figure) => figure.newElement());
        this.history.clearState();
        this.saveGame();
    }

    endGame() {
        this.top.update(this.score.get());
        alert('ИГРА ЗАКОНЧЕНА, ВАШ СЧЕТ:' + this.score.get());
    }

    backGame() {
        const prevStateGame = this.history.returnPrevState();

        if (prevStateGame) {
            this.gameMatrix.init(prevStateGame.field);
            this.score.set(prevStateGame.score);
            this.figures.forEach(
                (figure, index) => figure.numElement = prevStateGame.figures[index]);
            this.saveGame();
        }
        this.selectedBox = [];
    }

    checkEndGame() {
        let flagEndGame;
        flagEndGame = this.figures.some(
            (figure) => figure.checkInscribeFigure(this.gameMatrix.get().concat()));
        return !flagEndGame;
    }

    checkFigures() {
        this.gameMatrix.clear();
        // TODO: ПОДУМАТЬ КАК ВЫНЕСТИ ЛОГИКУ ИЗ IF'а
        let newIndex = false;
        let figureCoincidence = this.figures.some(
            (figure, index) => {
                newIndex = index;
                return figure.checkElement(this.selectedBox.concat());
            });
        if (figureCoincidence) {
            this.figures[newIndex].newElement();
        }
        return figureCoincidence;
    }

    saveGame() {
        let figures = [];
        this.figures.forEach((figure) => figures.push(figure.numElement));
        this.history.saveState({
            field: this.gameMatrix.get(),
            score: this.score.get(),
            theme: this.theme.get(),
            figures: figures,
        });
    }

}

export default Game;