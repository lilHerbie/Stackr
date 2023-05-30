function Start() {
    AssemblyLines.push(document.getElementsByTagName("assembly-line")[0]);
    truckHallContainer.style.display = 'none';
    addPackages();
    timeout();
}

Start();