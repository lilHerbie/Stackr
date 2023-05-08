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

//functions

function showForm(form){
    formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
    truckForm.style.display = 'none';
    assemblyForm.style.display = 'none';
    locationForm.style.display = 'none';
    form.style.display = 'flex';
}


function addAssemblyLine(){
    //TODO build functionality
}


//eventlisteners

addTruckButton.addEventListener('click', function() {
    showForm(truckForm);
});

assmblylineSettingsButton.addEventListener('click', function() {
    showForm(assemblyForm);
});

changeLocationButton.addEventListener('click', function() {
    showForm(locationForm);
});

//forms

let truckFormButton = document.getElementById('SubmitTruck');

let Trucks = [];

class Truck{
    constructor(transportType, length, width, interval){
        this.transportType = transportType;
        this.length = length;
        this.width = width;
        this.interval = interval;
    }
}

const TransportTypes = {
    ColdTransport : "Cold tranport",
    FragileTransport : "Fragile transport",
    GeneralTransport : "General transport",
    Pallets : "Pallets",
    FastTransport : "Fast transport"
}

function submitForm(){
    //TODO add form functionality
    truckFormButton.innerHTML = "verstuurd";
}

truckFormButton.addEventListener('click', submitForm);
