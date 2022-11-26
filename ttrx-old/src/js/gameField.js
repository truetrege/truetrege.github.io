class GameField {

    constructor() {

        this.htmlElement = document.createElement('canvas');
        this.context = this.htmlElement.getContext('2d');
        //TODO: МБ ВЫНЕСТИ ЧАСТЬ ЛОГИКИ В КЛАСС BOX????

        this.margin = 1;
        this.boxWidth = 70;
        this.boxHeight = 70;
        this.boxColors = [
            '#3e3e3e',
            '#2979FF',
            '#4DD0E1',
        ];
    }

    render(array) {
        this.context.clearRect(0, 0, parseInt(this.htmlElement.width),
            parseInt(this.htmlElement.height));
        let positionX, positionY;

        for (let i = 0; i < array.length; i++) {
            positionX = i * (this.boxHeight + this.margin);
            for (let j = 0; j < array[i].length; j++) {
                positionY = j * (this.boxWidth + this.margin);
                this.context.fillStyle = this.boxColors[array[i][j]];
                this.context.fillRect(positionY, positionX, this.boxWidth,
                    this.boxHeight);
                this.context.fill();

            }
        }
    }

    init(ROW, COL) {
        this.htmlElement.width = (this.boxWidth + this.margin) * COL - this.margin;
        this.htmlElement.height = (this.boxHeight + this.margin) * ROW -
            this.margin;
    }

    getPlot(x, y) {

        const plot = this.calculatePlotsHtmlElement();
        let scale = {width:1,height:1};
        if (this.htmlElement.width !== this.htmlElement.clientWidth){
            scale.width = this.htmlElement.width/this.htmlElement.clientWidth;
        }
        if (this.htmlElement.height !== this.htmlElement.clientHeight){
            scale.height = this.htmlElement.height/this.htmlElement.clientHeight;
        }

        return {
            row: this.getNumBox(y, plot.y, this.boxHeight/scale.height, this.margin),
            col: this.getNumBox(x, plot.x, this.boxWidth/scale.width, this.margin),
        };
    }

    getNumBox(plot, marginContainer, sizeBox, margin) {

        let i = 0, num;
        while (i < plot) {
            if ((plot - marginContainer > (i * sizeBox + i * margin)) &&
                (plot - marginContainer <=
                    (i * sizeBox + i * margin + sizeBox))) {
                num = i;
                break;
            }
            if ((plot - marginContainer > (i * sizeBox + (i - 1) * margin)) &&
                (plot - marginContainer <= (i * sizeBox + i * margin))) {
                num = -1;
                break;
            }
            i++;
        }
        return num;
    }

    calculatePlotsHtmlElement() {

        const box = this.htmlElement.getBoundingClientRect();
        const body = document.body;
        const docEl = document.documentElement;
        // const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        // const scrollLeft = window.pageXOffset || docEl.scrollLeft ||
        //     body.scrollLeft;
        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;

        const y = box.top + /*scrollTop*/ -clientTop;
        const x = box.left + /*scrollLeft*/ -clientLeft;

        return {x, y};
    }

}

export default GameField;