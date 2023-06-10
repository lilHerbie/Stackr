//navigation

//nav buttons
let addTruckButton = document.getElementById('AddTruckButton');
let addAssemblylineButton = document.getElementById('AddAssemblylineButton');
let assmblylineSettingsButton = document.getElementById('AssmblylineSettingsButton');
let changeLocationButton = document.getElementById('ChangeLocationButton');
let changeHallButton = document.getElementById('ChangeHallButton');

//containers
let formContainer = document.getElementById('FormContainer');
let hallContainer = document.getElementById("HallContainer");
let truckHallContainer = document.getElementById("TruckHallContainer");

//forms
let truckForm = document.forms.truck
let assemblyForm = document.getElementById('AssemblyForm');
let locationForm = document.getElementById('LocationForm');

//form button
let truckSubmitButton = document.getElementById('TruckSubmit');
let assemblySubmitButton = document.getElementById('AssemblySubmit');
let locationSubmitButton = document.getElementById('LocationSubmit');

function showForm(form) {
    formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
    truckForm.style.display = 'none';
    assemblyForm.style.display = 'none';
    locationForm.style.display = 'none';
    form.style.display = 'flex';
}

function switchHall() {
    if (truckHallContainer.style.display === 'none') {
        truckHallContainer.style.display = 'flex';
        loadTruckHall();
        hallContainer.style.display = 'none';

    }
    else if (truckHallContainer.style.display === 'flex') {
        truckHallContainer.style.display = 'none';
        hallContainer.style.display = 'flex';
    }
}

function loadTruckHall() {
    let truckHallContainerLocal = document.getElementById("TruckHallContainer");
    TrucksThatCantLeave.forEach(truck => {
        truckHallContainerLocal.appendChild(truck);
    });
}

function addAssemblyLine() {
    let assemblyline = new AssemblyLine();
    AssemblyLines.push(assemblyline);
    hallContainer.appendChild(assemblyline);
}

//forms

//truck form
function addTruck() {
    let truckForm = document.forms.truck;
    let length = Number(truckForm.elements[0].value);
    let width = Number(truckForm.elements[1].value);
    let transportType = truckForm.elements[2].value;
    let interval = Number(truckForm.elements[3].value);

    if ((length < 4 || length > 20) || length === 'null') {
        alert("De lengte an de vrachtwagen mag niet kleiner zijn dan 4 en niet groter zijn dan 20");
        return false;
    }
    if ((width < 4 || width > 20) || length === 'null') {
        alert("De breedte van de vrachtwagen mag niet kleiner zijn dan 4 en niet groter zijn dan 20");
        return false;
    }
    if (transportType === null || transportType === "") {
        alert("Het transporttype mag niet nul zijn");
        return false;
    }
    if ((interval < 1 || interval > 1000) || interval === 'null') {
        alert("Het interval moet groter zijn dan 3 en kleiner dan 1000");
        return false;
    }

    let containers = document.getElementsByClassName('TruckContainer');

    for (let i = 0; i < containers.length; i++) {
        if (!containers[i].hasChildNodes()) {
            let truck = new Truck(transportType, length, width, interval);
            Trucks.push(truck);
            let removeElement = document.createElement('div');
            containers[i].appendChild(removeElement);
            setTimeout(() => {
                containers[i].appendChild(truck);
                removeElement.remove();
            }, interval * 1000);
            break;
        }
    }
}

//assemblylinesetting form
function submitAssemblyForm() {
    let assemblyForm = document.forms.assemblySettings;
    let intervalLocal = Number(assemblyForm.elements[0].value);
    let speedLocal = Number(assemblyForm.elements[1].value);

    if (intervalLocal === 0) {
        alert("Het interval mag niet nul zijn");
        return false;
    }
    if (speedLocal === 0) {
        alert("De snelheid mag niet nul zijn");
        return false;
    }

    AssemblyLine.interval = intervalLocal * 1000;
    AssemblyLine.speed = speedLocal * 1000;

}

function submitApiForm() {
    let apiForm = document.forms.api;
    let city = apiForm.elements[0].value;

    if (city === null || city === "") {
        alert("De plaatsnaam mag niet leeg zijn");
        return false;
    }

    return true;
}

addTruckButton.addEventListener('click', function () { showForm(truckForm); });

addAssemblylineButton.addEventListener('click', function () { addAssemblyLine(); });

assmblylineSettingsButton.addEventListener('click', function () { showForm(assemblyForm); });

changeLocationButton.addEventListener('click', function () { showForm(locationForm); });

changeHallButton.addEventListener('click', function () { switchHall() });

truckSubmitButton.addEventListener('click', function () { addTruck() });

assemblySubmitButton.addEventListener('click', function () { submitAssemblyForm() });

locationSubmitButton.addEventListener('click', function () { submitApiForm() });