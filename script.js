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

let truckFormButton = document.querySelector('button');

truckFormButton.addEventListener('click', submitForm);


function submitForm(){
    // let height = document.getElementById('height');
    // let width = document.getElementById('width');
    // let transportType = document.getElementById('transportSelect');
    // let interval = document.getElementById('interval');
    truckFormButton.innerHTML = "verstuurd";

}