let Trucks = [];
let TrucksThatCantLeave = [];

const TransportTypes = {
    ColdTransport: "ColdTransport",
    FragileTransport: "FragileTransport",
    GeneralTransport: "GeneralTransport",
    Pallets: "Pallets",
    FastTransport: "FastTransport"
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
        this.renderd = false;
        this.aankomt = true;
    }

    connectedCallback() {
        if (!this.renderd) {
            this.render();
            this.renderd = true;
        }
    }

    disconnectedCallback() {
        //do nothing
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
                gridElement.style.border = 'gray solid 1px';
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

        let image = document.createElement('img');
        image.src = 'Assets/truck3.png';
        image.style.height = '250px';
        image.addEventListener('mouseover', () => {
            image.style.cursor = 'pointer';

        })

        image.addEventListener('click', () => this.canLeave());

        let icon = document.createElement('i');

        switch (this.transportType) {
            case 'ColdTransport':
                icon.className = 'fa-solid fa-snowflake';
                break;
            case 'FragileTransport':
                icon.className = 'fa-solid fa-wine-glass-empty';
                break;
            case 'GeneralTransport':
                icon.className = 'fa-solid fa-truck';
                break;
            case 'Pallets':
                icon.className = 'fa-solid fa-pallet';
                break;
            case 'FastTransport':
                icon.className = 'fa-solid fa-truck-fast';
                break;
            default:
                icon.className = 'fa-solid fa-truck';
                break;
        }

        if (this.aankomt) {

            const animation = this.animate(
                [
                    { transform: `translateX(500px)` },
                    { transform: `translateX(0px)` },
                ],
                {
                    duration: 2000,
                    iterations: 1,
                    fill: "forwards"
                }
            )
        }

        this.aankomt = false;

        this.appendChild(truckGrid);
        this.appendChild(icon);
        this.appendChild(image);
    }

    show() {
        console.table(this.space);
    }

    place(posx, posy, arr, color) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if ((posx + i < 0 || posy + j < 0 || posx + i >= this.space.length || posy + j >= this.space[0].length) && arr[i][j] === 1) {
                    return false;
                } else if ((posx + i >= 0 && posy + j >= 0 && posx + i < this.space.length && posy + j < this.space[0].length) && this.space[posx + i][posy + j] != 0 && arr[i][j] === 1) {
                    return false;
                }
            }
        }

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[0].length; j++) {
                if (arr[i][j] === 1) {
                    let element = document.getElementById('truck-' + this.truckId + ':' + (posy + j) + ':' + (posx + i));
                    element.style.backgroundColor = color;
                    element.style.border = 'black solid 1px';
                    arr[i][j] = color;
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
            if (!this.truckTypesCanLeave(apiweer)) {
                this.goToHall();
            }
            this.leave();
        });
    }

    truckTypesCanLeave(apiweer) {
        let canLeave = false;
        switch (this.transportType) {
            case TransportTypes.ColdTransport:
                if (apiweer.tempratuur < 35) {
                    canLeave = true;
                }
                break;
            case TransportTypes.FragileTransport:
                if (!['regen', 'sneeuw', 'halfbewolkt_regen'].includes(apiweer.weer)) {
                    canLeave = true;
                }
                break;
            case TransportTypes.Pallets:
                if (apiweer.windKracht < 7) {
                    canLeave = true;
                }
                break;
            default:
                canLeave = true;
                break;
        }
    }

    leave() {
        const animation = this.animate(
            [
                { transform: `translateX(0px)` },
                { transform: `translateX(500px)` },
            ],
            {
                duration: 1000,
                iterations: 1,
                fill: "forwards"
            }
        );
        animation.addEventListener('finish', () => {
            this.remove();
        });
    }

    goToHall() {
        console.log(this.childNodes[0]);
        TrucksThatCantLeave.push(this);
        parent = this.parentElement;
        parent.childNodes[0].remove();
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