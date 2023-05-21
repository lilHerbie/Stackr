class Package extends HTMLElement {

    constructor(shape, color, rotation) {
        super();
        this.shape = shape;
        this.color = color;
        this.rotation = rotation;
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
                    gridElement.addEventListener('mousedown', this.elementDragged)
                    gridElement.id = j + ':' + i;
                    this.appendChild(gridElement);
                }
            }
        }
        //TODO
        // gridContainer.rotation = this.rotation;
        this.draggable = true;
        this.ondragstart = drag;
    }

    elementDragged(event) {
        elementdragged = event.target;
    }
}

let elementdragged;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if (elementdragged == null) {
        event.preventDefault();
    }
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    if (elementdragged == null) {
        return;
    }
    event.preventDefault();

    let elementpos = elementdragged.id.split(":");
    let targetpos = event.target.id.split(":");

    let coordinatex = targetpos[2] - elementpos[1];
    let coordinatey = targetpos[1] - elementpos[0];
    let truck = event.target.parentNode.parentNode;
    if (truck.place(coordinatex, coordinatey, elementdragged.parentNode.shape, elementdragged.parentNode.color)) {
        elementdragged.parentNode.remove();
        elementdragged = null;
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

function getRandomRotation() {
    const randomIndex = Math.floor(Math.random()) * 4;
    return randomIndex * 90;
}

customElements.define("package-element", Package);
