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
    let truckForm = document.forms.truck;
    let length = Number(truckForm.elements[0].value);
    let width = Number(truckForm.elements[1].value);
    let transportType = truckForm.elements[2].value;
    let interval = Number(truckForm.elements[3].value);

    if(length === 0){
        alert("De lengte mag niet nul zijn");
        return false;
    }
    if(width === 0){
        alert("De breedte mag niet nul zijn");
        return false;
    }
    if(transportType === null || transportType === ""){
        alert("Het transporttype mag niet nul zijn");
        return false;
    }
    if(interval === 0){
        alert("Het interval mag niet nul zijn");
        return false;
    }

    let truck = new Truck(transportType, length, width, interval);
    Trucks.push(truck);
    dock(truck);
}

//assemblylinesetting form
function submitAssemblyForm() {
    let assemblyForm = document.forms.assemblySettings;
    let intervalLocal = Number(assemblyForm.elements[0].value);
    let speedLocal = Number(assemblyForm.elements[1].value);

    if(intervalLocal === 0){
        alert("Het interval mag niet nul zijn");
        return false;
    }
    if(speedLocal === 0){
        alert("De snelheid mag niet nul zijn");
        return false;
    }

    AssemblyLine.interval = intervalLocal * 1000;
    AssemblyLine.speed = speedLocal * 1000;
    
}

function submitLocationForm(){
    
}
