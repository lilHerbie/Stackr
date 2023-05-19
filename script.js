//navigation

//nav buttons
let addTruckButton = document.getElementById('AddTruckButton');
let addAssemblylineButton = document.getElementById('AddAssemblylineButton');
let assmblylineSettingsButton = document.getElementById('AssmblylineSettingsButton');
let changeLocationButton = document.getElementById('ChangeLocationButton');
let changeHallButton = document.getElementById('ChangeHallButton');

//containers
let formContainer = document.getElementById('FormContainer')
let hallContainer = document.getElementById("HallContainer")

//forms
let truckForm = document.getElementById('TruckForm')
let assemblyForm = document.getElementById('AssemblyForm')
let locationForm = document.getElementById('LocationForm')

//costum elements

const TransportTypes = {
    ColdTransport: "Cold tranport",
    FragileTransport: "Fragile transport",
    GeneralTransport: "General transport",
    Pallets: "Pallets",
    FastTransport: "Fast transport"
}

class Truck extends HTMLElement {
    constructor(transportType, length, width, interval) {
        super();
        this.transportType = transportType;
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.space = new Array(length).fill().map(() => new Array(width).fill(0)); //plaats en bezet|| false en true
    }
    connectedCallback() {
        this.render();
    }

    render() {
        this.style.gridTemplateColumns = `repeat(${this.width}, 1fr);`
        this.style.gridTemplateRows = `repeat(${this.length}, 1fr);`


        let truckGrid = document.createElement('div');
        truckGrid.className = 'truckGrid';

        //TODO temp
        for (let i = 0; i < this.space.length; i++) {
            for (let j = 0; j < this.space[i].length; j++) {
                let gridElement = document.createElement('span');
                gridElement.style.gridRowStart = i + 1;
                gridElement.style.gridRowEnd = i + 1;
                gridElement.style.gridColumnStart = j + 1;
                gridElement.style.gridColumnEnd = j + 1;
                gridElement.style.border = 'black solid 1px';
                gridElement.id = 'truck:' + j + ':' + i;
                truckGrid.appendChild(gridElement);
            }
        }

        this.ondrop = drop;
        this.ondragover = allowDrop;
        this.className = 'truckDiv';
        //   this.style.width = `${this.width * 55.56}px`;
        // this.style.height = `${this.height * 155.56}px`;
        this.style.height = '250px';
        this.style.width = '250px';

        this.appendChild(truckGrid);
    }

    show() {
        console.table(this.space);
    }

    place(posx, posy, arr, color) {
        console.log(posx, posy, arr);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if ((posx + i < 0 || posx + j < 0 || posx + i > this.space.length || posx + j > this.space.length) && arr[i][j] === 1) {
                    return false;
                }
                if (this.space[posx + i][posy + j] === 1 && arr[i][j] === 1) {
                    return false;
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j] == 1) {
                    document.getElementById('truck:' + (posy + j) + ':' + (posx + i)).style.backgroundColor = 'blue';
                }
                this.space[posx + i][posy + j] = arr[i][j];
            }
        }
        return true;

    }
}

customElements.define("truck-element", Truck);


const tetrominoShapes = [

    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0]
    ]
];

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray"];

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
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();

    let elementpos = elementdragged.id.split(":");
    let targetpos = event.target.id.split(":");

    let coordinatex = targetpos[2] - elementpos[1];
    let coordinatey = targetpos[1] - elementpos[0];
    console.log(targetpos);
    console.log(elementpos);
    console.log(coordinatex, coordinatey);
    let truck = event.target.parentNode.parentNode;
    console.log(truck.place(coordinatex, coordinatey, elementdragged.parentNode.shape));
}

customElements.define("package-element", Package);

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


class AssemblyLine extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
            `   <div class="AssemblyLine">
                <img class="assemblyImg" src="Assets/AssemblyLine.png" >
                <div class="packageContainer"></div>
            </div>
            <div class="TruckContainer">

            </div>
        `;
    }
}

customElements.define("assembly-line", AssemblyLine);

//functions

function AddRandomPackageToAssemblyLine(id) {
    let assemblyline = document.getElementsByClassName('AssemblyLine')[id];
    let packageContainer = assemblyline.children[1];
    let package = new Package(getRandomShape(), getRandomColor(), getRandomRotation());

    package.style.left = '0';

    //TODO hier maak in de animatie aan, misschien kan dat beter op een andere plek
    const animation = package.animate(
        [
            // keyframes
            { transform: `translateX(0px)` },
            { transform: `translateX(${assemblyline.clientWidth - 60}px)` },
        ],
        {
            // timing options
            duration: 30000,
            iterations: 1,
            fill: "forwards"

        }
    );

    animation.addEventListener('finish', () => { package.remove() });
    packageContainer.appendChild(package);
}

function showForm(form) {
    formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
    truckForm.style.display = 'none';
    assemblyForm.style.display = 'none';
    locationForm.style.display = 'none';
    form.style.display = 'flex';
}

function addAssemblyLine() {
    let assemblyline = new AssemblyLine();
    hallContainer.appendChild(assemblyline);
}

function addTruckToAssemblyLine() {
    let truckContainer = document.getElementsByClassName('TruckContainer')[0];
    let truck = new Truck(TransportTypes.ColdTransport, 8, 8, 10);
    truckContainer.appendChild(truck);
}

//eventlisteners

addTruckButton.addEventListener('click', function () {
    showForm(truckForm);
});

addAssemblylineButton.addEventListener('click', addAssemblyLine);

assmblylineSettingsButton.addEventListener('click', function () {
    showForm(assemblyForm);
});

changeLocationButton.addEventListener('click', function () {
    showForm(locationForm);
});

//forms

let truckFormButton = document.getElementById('SubmitTruck');

let Trucks = [];


function submitForm() {
    //TODO add form functionality
    truckFormButton.innerHTML = "verstuurd";
}

truckFormButton.addEventListener('click', submitForm);

function executeCodeBlock() {
    let hall = document.getElementById('HallContainer');
    let id = 0;
    Array.from(hall.children).forEach(element => {
        AddRandomPackageToAssemblyLine(id);
        id++;
    });
}

executeCodeBlock(); // Execute the code block immediately

window.setInterval(executeCodeBlock, 10000); // Execute the code block every 10 seconds

addTruckToAssemblyLine();