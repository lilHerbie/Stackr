let Trucks = [];
let TrucksThatCantLeave = [];

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
        this.interval = interval * 1000;
        this.space = new Array(length).fill().map(() => new Array(width).fill(0));
        this.available = true;
        this.truckId = truckcount++;
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {   
        this.replaceChildren();
    }

    render() {
        this.style.gridTemplateColumns = `repeat(${this.width}, 1fr);`
        this.style.gridTemplateRows = `repeat(${this.length}, 1fr);`


        let truckGrid = document.createElement('div');
        truckGrid.className = 'truckGrid';

        for (let i = 0; i < this.space.length; i++) {
            for (let j = 0; j < this.space[i].length; j++) {
                let gridElement = document.createElement('span');
                gridElement.style.gridRowStart = i + 1;
                gridElement.style.gridRowEnd = i + 1;
                gridElement.style.gridColumnStart = j + 1;
                gridElement.style.gridColumnEnd = j + 1;
                gridElement.style.border = 'black solid 1px';
                gridElement.id = 'truck-' + this.truckId + ':' + j + ':' + i;
                truckGrid.appendChild(gridElement);
            }
        }

        this.id = this.truckId;
        this.className = 'truckDiv';
        this.style.height = '250px';
        this.style.width = '250px';

        truckGrid.ondrop = drop;
        truckGrid.ondragover = allowDrop;

        let leaveButton = document.createElement('button');
        leaveButton.innerHTML = 'Go';
        leaveButton.style.height = '25px';
        leaveButton.style.width = '50px';

        leaveButton.addEventListener('click', () => this.canLeave());

        let image = document.createElement('img');
        image.src = 'Assets/truck3.png';
        image.style.height = '250px';

        let icon = document.createElement('i');

        switch(this.transportType){
            case 'Cold transport':
                icon.className = 'fa-solid';
                icon.className = 'fa-snowflake';
                break;
            case 'Fragile transport':
                icon.className = 'fa-solid fa-square-fragile';
                break;
            case 'General transport':
                icon.className = '<fa-solid fa-truck';
                break;
            case 'Pallets':
                icon.className = 'fa-solid fa-pallet';
                break;
            case 'Fast transport':
                icon.className = 'fa-solid fa-truck-fast';
                break;
            default:
                icon.className = '<fa-solid fa-truck';
                break;
        }


        this.appendChild(truckGrid);
        this.appendChild(image);
        this.appendChild(leaveButton);
        this.appendChild(icon);

    }

    show() {
        console.table(this.space);
    }

    place(posx, posy, arr, color) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if ((posx + i < 0 || posy + j < 0 || posx + i >= this.space.length || posy + j >= this.space[0].length) && arr[i][j] === 1) {
                    return false;
                } else if ((posx + i >= 0 && posy + j >= 0 && posx + i < this.space.length && posy + j < this.space[0].length) && this.space[posx + i][posy + j] === 1 && arr[i][j] === 1) {
                    return false;
                }
            }
        }

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j] == 1) {
                    document.getElementById('truck-' + this.truckId + ':' + (posy + j) + ':' + (posx + i)).style.backgroundColor = color;
                    this.space[posx + i][posy + j] = arr[i][j];
                }
            }
        }

        if (this.isFull()) {
            this.canLeave();
        }
        return true;
    }

    canLeave() {
        getWeer().then((apiweer) => {
            let canLeave = false;
            switch (this.transportType) {
                case TransportTypes.ColdTransport:
                    if (apiweer.tempratuur < 35) {
                        canLeave = true;
                    }
                    break;
                case TransportTypes.FragileTransport:
                    if(!['regen','sneeuw','halfbewolkt_regen'].includes(apiweer.weer)){
                        canLeave = true;
                    }
                    break;
                case TransportTypes.Pallets:
                    if (apiweer.windKracht < 7){
                        canLeave = true;
                    }
                    break;
                default:
                    canLeave = true;
                    break;
            }

            if (!canLeave) {
                this.goToHall();
            }
            this.leave();
        });
        
    }
    
    leave() {
        //TODO animatie
        
        this.remove();
    }

    goToHall(){
        TrucksThatCantLeave.push(this);
        this.replaceChildren();
    }
    
    isFull() {
        for (let i = 0; i < this.space.length; i++) {
            for (let j = 0; j < this.space[i].length; j++) {
                if (!this.space[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}

let truckcount = 0;

customElements.define("truck-element", Truck);