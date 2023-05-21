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
let truckForm = document.forms.truck
let assemblyForm = document.getElementById('AssemblyForm')
let locationForm = document.getElementById('LocationForm')

//lists
let Trucks = [];
let AssemblyLines = [];

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
        this.available = true;
        this.space = new Array(length).fill().map(() => new Array(width).fill("plaats")); //plaats en bezet|| false en true
    }

    connectedCallback() {
        this.render();
    }    

    disconnectedCallback(){
        this.replaceChildren();
        this.remove();

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
              gridElement.style.gridRowStart =  i + 1;
              gridElement.style.gridRowEnd =  i + 1;
              gridElement.style.gridColumnStart = j + 1;
              gridElement.style.gridColumnEnd = j + 1;
              gridElement.style.border = 'black solid 1px';
              truckGrid.appendChild(gridElement);
            }
          }

        this.className = 'truckDiv';
        //   this.style.width = `${this.width * 55.56}px`;
        // this.style.height = `${this.height * 155.56}px`;
        this.style.height = '250px';
        this.style.width = '250px';

        let leaveButton = document.createElement('button');
        leaveButton.innerHTML = 'Go';
        leaveButton.style.height = '25px';
        leaveButton.style.width = '50px';
        leaveButton.addEventListener('click', () => leave(this.parentElement.parentElement, this));

        let image = document.createElement('img');
        image.src = 'Assets/truck3.png';
        image.style.height = '250px';
        
        this.appendChild(truckGrid);
        this.appendChild(image);
        this.appendChild(leaveButton);
        
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

function dock(truck){
    truck.available = true;
    let id = 0;
    AssemblyLines.forEach(assemblyline => {
        if(assemblyline.open){
            addTruckToAssemblyLine(assemblyline, truck);
        }
        id ++;
    });
};

function leave(assemblyLine, truck){

    truck.available = false;
    removeTruckFromAssemblyLine(assemblyLine, truck);

    
    Trucks.forEach((truckElement) =>{
        if(truckElement.available){
            dock(truckElement);
            
        }
    });
    //TODO change static interval to truck.interval
    window.setInterval(dock, 10000, truck);
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
                if(this.shape[i][j] === 1){
                    let gridElement = document.createElement('span');
                    gridElement.style.gridRowStart = i + 1;
                    gridElement.style.gridRowEnd = i + 1;
                    gridElement.style.gridColumnStart = j + 1;
                    gridElement.style.gridColumnEnd = j + 1;
                    gridElement.style.backgroundColor = this.color;
                    this.appendChild(gridElement);
                }
            }
        }
        //TODO
        // gridContainer.rotation = this.rotation;
        this.draggable = true;
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
    const randomIndex = Math.floor(Math.random()) * 4;
    return randomIndex * 90;
}
  

class AssemblyLine extends HTMLElement {
    constructor() {
        super();
        this.open = true;
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

function AddRandomPackageToAssemblyLine(id){
    let assemblyline = document.getElementsByClassName('AssemblyLine')[id];
    let packageContainer = assemblyline.children[1];
    let package = new Package(getRandomShape(), getRandomColor(), getRandomRotation());

    package.style.left = '0';

    //TODO hier maak ik de animatie aan, misschien kan dat beter op een andere plek
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
    
    animation.addEventListener('finish', ()=>{package.remove()}); 
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
    AssemblyLines.push(assemblyline);
    hallContainer.appendChild(assemblyline);
}

function addTruckToAssemblyLine(assemblyLine, truck){
    let truckContainer = assemblyLine.children[1];
    assemblyLine.open = false;
    truckContainer.appendChild(truck);
}

function removeTruckFromAssemblyLine(assemblyLine, truck){
    let truckContainer = assemblyLine.children[1];
    assemblyLine.open = true;
    truckContainer.removeChild(truckContainer.children[0]);
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

//truck form
function submitTruckForm() {
    let truckForm = document.forms.truck
    let transportType = truckForm.elements[2].value;
    let length = Number(truckForm.elements[0].value);
    let width = Number(truckForm.elements[1].value);
    let interval = Number(truckForm.elements[3].value);
    let truck = new Truck(transportType, length, width, interval);
    Trucks.push(truck);
    dock(truck);
}

//functionality
function addPackages() {
    let id = 0;
    AssemblyLines.forEach(element => {
        AddRandomPackageToAssemblyLine(id);
        id++;
    });
}

window.setInterval(addPackages, 10000);

function Start(){
    AssemblyLines.push( document.getElementsByTagName("assembly-line")[0]);
    addPackages();
}

Start();