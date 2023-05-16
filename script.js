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

class Truck extends HTMLElement{
    constructor(transportType, length, width, interval) {
        super();
        this.transportType = transportType;
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.space = new Array(length).fill().map(() => new Array(width).fill("plaats")); //plaats en bezet|| false en true
    }
    connectedCallback() {
        this.innerHTML = 
        `<div class="Truck">
            <img src="Assets/truck.png">
        </div>`
    }
    show() {
        console.table(this.space);
    }

    place(posx, posy, arr){
        if (posx > this.length || posx < 0 || posy > this.width || posy < 0){
            return false;
        }

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (this.space[posx + i][posy + j] === "bezet" && arr[i][j] === "bezet")
                {
                    return false;
                }
            }
        }
        
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                this.space[posx + i][posy + j] = arr[i][j];
            }
        }

    }
}

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
        let gridContainer = document.createElement('div');
        gridContainer.className = 'packageContainer';

        for (var i = 0; i < this.shape.length; i++) {
            for (var j = 0; j < this.shape[i].length; j++) {
                if(this.shape[i][j] === 1){
                    let gridElement = document.createElement('span');
                    gridElement.style.gridRowStart = i;
                    gridElement.style.gridRowEnd = i;
                    gridElement.style.gridColumnStart = j
                    gridElement.style.gridColumnEnd = j
                    gridElement.style.backgroundColor = this.color;
                    gridContainer.appendChild(gridElement);
                }
            }
        }

        //TODO
        gridContainer.rotation = this.rotation;

        this.appendChild(gridContainer);
      }

}
customElements.define("package-element", Package);

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

function getRandomShape(){
    const randomIndex = Math.floor(Math.random() * tetrominoShapes.length);
    return tetrominoShapes[randomIndex];
}

function getRandomRotation(){
    const randomIndex = Math.floor(Math.random()) * 3;
    return randomIndex * 90;
}
  

class AssemblyLine extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
        `<div class="AssemblyLineContainer">
            <div class="AssemblyLine">
                <img src="Assets/AssemblyLine.png" >
            </div>
            <div class="TruckContainer">

            </div>
        </div>`;
    }
}

customElements.define("assembly-line", AssemblyLine);

//functions

function AddRandomPackageToAssemblyLine(id){
    let assemblyline = document.getElementsByClassName('AssemblyLine')[id];
    let package = new Package(getRandomShape(), getRandomColor(), getRandomRotation());

    //hier maak in de animatie aan, misschien kan dat beter op een andere plek
    package.animate(
        [
          // keyframes
          { transform: `translateX(0px)` },
          { transform: `translateX(${assemblyline.clientWidth}px)` },
        ],
        {
          // timing options
          duration: 5000,
          iterations: 1,
          fill: "forwards"
        
        }
      );

      package.addEventListener('animationend', ()=>{package.remove()}); 


    assemblyline.appendChild(package);
    
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


window.setInterval(() => {
    let hall = document.getElementById('HallContainer');
    let id = 0;
    Array.from(hall.children).forEach(element => {
        AddRandomPackageToAssemblyLine(id);
        id++;
    });
}, 6000);


   
