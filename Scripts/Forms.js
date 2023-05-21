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
