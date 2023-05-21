class AssemblyLine extends HTMLElement {
    constructor() {
        super();
        this.open = true;
    }

    connectedCallback() {
        this.innerHTML =
            `   <div class="AssemblyLine">
                <img class="assemblyImg" src="Assets/AssemblyLine.png" >
                <div class="packageContainer"></div>
            </div>
            <div class="TruckContainer">

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
            { transform: `translateX(${assemblyline.clientWidth - 60}px)` },
        ],
        {
            // timing options
            duration: 30000,
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

window.setInterval(addPackages, 10000);