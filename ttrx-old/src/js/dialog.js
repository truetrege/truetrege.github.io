class Dialog {
    constructor(options) {
        this.container = document.createElement('div');
        this.container.style.display = 'none';
        this.container.className = 'dialog';

        this.container.appendChild(options.cloneNode(false));
        document.appendChild(this.container);
    }

    open() {
        this.container.className = 'dialog open';
    }

    close() {
        this.container.className = 'dialog';
    }
}

export default Dialog;