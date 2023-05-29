let AssemblyLines = [];

class AssemblyLine extends HTMLElement {
    
    static interval = 6000;
    static speed = 20000;

    constructor() {
        super();
        this.open = true;
    }

    connectedCallback() {
        this.render();
    }

    render(){
        let assemblyLine = document.createElement('div');
        assemblyLine.className = 'AssemblyLine';
        
        let gearContainer = document.createElement('div');
        gearContainer.className = 'gearContainer';

        assemblyLine.appendChild(gearContainer);

        for(let i = 0; i < 4; i++){
            let gear = document.createElement('img');
            gear.src = 'Assets/gear.png';
            gear.className = 'gear';
            gearContainer.appendChild(gear);
        }
        let packageContainer = document.createElement('div');
        packageContainer.className = 'packageContainer';
        assemblyLine.appendChild(packageContainer);

        let truckContainer = document.createElement('div');
        truckContainer.className = 'TruckContainer';
        
        this.appendChild(assemblyLine);
        this.appendChild(truckContainer);

    }
}

customElements.define("assembly-line", AssemblyLine);


//functions

function AddRandomPackageToAssemblyLine(id) {
    let assemblyline = document.getElementsByClassName('AssemblyLine')[id];
    let packageContainer = assemblyline.children[1];
    let package = new Package(getRandomShape(), getRandomColor(), getRandomRotation());

    //TODO hier maak in de animatie aan, misschien kan dat beter op een andere plek
    const animation = package.animate(
        [
            // keyframes
            { transform: `translateX(0px)` },
            { transform: `translateX(${screen.width/2 - 50}px)` },
        ],
        {
            // timing options
            duration: AssemblyLine.speed,
            iterations: 1,
            fill: "forwards"
        }
    );

    animation.addEventListener('finish', () => { package.remove() });
    packageContainer.appendChild(package);
}

function addPackages() {
    let id = 0;
    AssemblyLines.forEach(element => {
        AddRandomPackageToAssemblyLine(id);   
        id++;
    });
}

function timeout() {
    setTimeout(() => {
        addPackages();
        timeout();
    }, AssemblyLine.interval);
};


