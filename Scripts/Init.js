function Start(){
    AssemblyLines.push(document.getElementsByTagName("assembly-line")[0]);
    addPackages();
    timeout();
}

Start();