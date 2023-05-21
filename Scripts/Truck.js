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
        this.interval = interval;
        this.space = new Array(length).fill().map(() => new Array(width).fill(0)); //plaats en bezet|| false en true
        this.available = true;

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

        for (let i = 0; i < this.space.length; i++) {
            for (let j = 0; j < this.space[i].length; j++) {
                let gridElement = document.createElement('span');
                gridElement.style.gridRowStart = i + 1;
                gridElement.style.gridRowEnd = i + 1;
                gridElement.style.gridColumnStart = j + 1;
                gridElement.style.gridColumnEnd = j + 1;
                gridElement.style.border = 'black solid 1px';
                gridElement.id = 'truck:' + j + ':' + i;
                truckGrid.appendChild(gridElement);
            }
        }

        this.className = 'truckDiv';
        this.style.height = '250px';
        this.style.width = '250px';

        truckGrid.ondrop = drop;
        truckGrid.ondragover = allowDrop;

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
                    document.getElementById('truck:' + (posy + j) + ':' + (posx + i)).style.backgroundColor = color;
                    this.space[posx + i][posy + j] = arr[i][j];
                }
            }
        }
        return true;
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