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

class Package extends HTMLElement {

    constructor(length, width, color){
        this.space = new Array(length).fill().map(() => new Array(width).fill("plaats"));
        this.color = color;
    }

    connectedCallback(){

    }

}

function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  

class AssemblyLine extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML =
        `<div class="AssemblyLineContainer">
            <div class="AssemblyLine">
                <p>pakketjes</p>
                <img src="Assets/AssemblyLine.png" >
            </div>
            <div class="TruckContainer">

            </div>
        </div>`
    }
}

customElements.define("assembly-line", AssemblyLine);

//functions

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
