import {themes} from './themes';

class Theme {
  constructor(options) {
    this.field = options.field;
    this.figures = options.figures;
    this.template = options.template;
    this.mobile = false;

    this.htmlElement = document.createElement('select');
    this.htmlElement.className = 'themeSelect';

  }

  init(theme) {
    this.name = theme || 'default';
    this.htmlElement.innerHTML = '';
    for (let i in themes) {
      if (themes.hasOwnProperty(i)) {
        let option = document.createElement('option');

        option.innerHTML = themes[i].name || i;
        option.value = i;
        if (theme === i) option.selected = true;
        this.htmlElement.appendChild(option);
      }
    }
    this.change();
  }

  change() {
    this.field.margin = themes[this.name].box.margin;
    this.field.boxWidth = themes[this.name].box.width;
    this.field.boxHeight = themes[this.name].box.height;
    this.field.boxColors = themes[this.name].colors;

    this.figures.forEach((figure) => {
      figure.fieldFigure.margin = themes[this.name].preview.margin;
      figure.fieldFigure.boxWidth = themes[this.name].preview.width;
      figure.fieldFigure.boxHeight = themes[this.name].preview.height;
      figure.fieldFigure.boxColors = themes[this.name].preview.colors ||
          themes[this.name].colors;
    });
    this.template.game.className = 'game ' + themes[this.name].background;

    if(this.mobile){
     // this.field.boxWidth = 10*window.screen.width/100;
     //
     //  this.field.boxHeight = 10*window.screen.width/100;
     //  this.figures.forEach((figure) => {
     //    figure.fieldFigure.boxWidth = 6*window.screen.width/100;
     //    figure.fieldFigure.boxHeight = 6*window.screen.width/100;
     //  });

    }

  }

  set(name) {
    this.name = name;
  }

  get() {
    return this.name;
  }

}

export default Theme;