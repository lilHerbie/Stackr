class Package extends HTMLElement {

    constructor(shape, color, rotation) {
        super();
        this.shape = shape;
        this.color = color;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    let gridElement = document.createElement('span');
                    gridElement.style.gridRowStart = i + 1;
                    gridElement.style.gridRowEnd = i + 1;
                    gridElement.style.gridColumnStart = j + 1;
                    gridElement.style.gridColumnEnd = j + 1;
                    gridElement.style.backgroundColor = this.color;
                    gridElement.addEventListener('mousedown', this.packageDragged)
                    gridElement.id = j + ':' + i;
                    this.appendChild(gridElement);
                }
            }
        }
        this.draggable = true;
        this.ondragstart = drag;
    }

    packageDragged(event) {
        packagedragged = event.target;
    }
}

let packagedragged;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if (packagedragged == null) {
        event.preventDefault();
    }
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    if (packagedragged == null) {
        return;
    }
    event.preventDefault();

    let elementpos = packagedragged.id.split(":");
    let targetpos = event.target.id.split(":");

    let coordinatex = targetpos[2] - elementpos[1];
    let coordinatey = targetpos[1] - elementpos[0];
    let truck = event.target.parentNode.parentNode;
    if (truck.place(coordinatex, coordinatey, packagedragged.parentNode.shape, packagedragged.parentNode.color)) {
        packagedragged.parentNode.remove();
        packagedragged = null;
    }
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function getRandomShape() {
    const randomIndex = Math.floor(Math.random() * tetrominoShapes.length);
    return tetrominoShapes[randomIndex];
}

customElements.define("package-element", Package);
