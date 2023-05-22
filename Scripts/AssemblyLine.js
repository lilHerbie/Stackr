let AssemblyLines = [];

class AssemblyLine extends HTMLElement {
    
    static interval = 6000;
    static speed = 20000;

    constructor() {
        super();
        this.open = true;
    }

    connectedCallback() {
        this.innerHTML =
            `<div id="AssemblyLine" class="AssemblyLine">
                <img class="assemblyImg" src="Assets/AssemblyLine.png" >
                <div class="packageContainer"></div>
            </div>
            <div id="TruckContainer" class="TruckContainer">

            </div>
        `;
    }
}

customElements.define("assembly-line", AssemblyLine);

//functions

function AddRandomPackageToAssemblyLine(id) {
    let assemblyline = document.getElementsByClassName('AssemblyLine')[id];
    let packageContainer = assemblyline.children[1];
    let package = new Package(getRandomShape(), getRandomColor(), getRandomRotation());

    package.style.left = '0';

    //TODO hier maak in de animatie aan, misschien kan dat beter op een andere plek
    const animation = package.animate(
        [
            // keyframes
            { transform: `translateX(0px)` },
            { transform: `translateX(${assemblyline.clientWidth - 50}px)` },
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
