class Button {
  constructor(name,...opt) {

    this.htmlElement = document.createElement('input');
    this.htmlElement.type = 'button';
    this.htmlElement.value = name;
    this.htmlElement.id = opt[0];


  }

}

export default Button;