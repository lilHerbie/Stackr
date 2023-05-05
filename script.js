class Truck{
    constructor(transportType, length, width, interval){
        this.transportType = transportType;
        this.length = length;
        this.width = width;
        this.interval = interval;
    }
}

let Trucks = [];

const TransportTypes = {
    ColdTransport : "Cold tranport",
    FragileTransport : "Fragile transport",
    GeneralTransport : "General transport",
    Pallets : "Pallets",
    FastTransport : "Fast transport"
}

let truckFormButton = document.querySelector('button');

truckFormButton.addEventListener('click', submitForm);


function submitForm(){
    let length = document.getElementById('length');
    let width = document.getElementById('width');
    let transportType = document.getElementById('transportSelect');
    let interval = document.getElementById('interval');
    let truck = new Truck(transportType, length, width, interval)

    Trucks.push(truck);
    addTruck(truck);

    truckFormButton.innerHTML = "verstuurd";

}

let truckContainer = document.getElementById('TruckContainer');

function addTruck(truck){
    let truckElement = document.createElement("div");
    truckElement.className = "Truck";
    truckElement.width = truck.width;
    truckElement.length = truck.length;
    let img = document.createElement('img');
    img.src = 'Assets/truck.png';
    img.width = truck.width;
    img.length = truck.length;

    truckElement.appendChild(img);
    truckContainer.appendChild(truckElement);
}

