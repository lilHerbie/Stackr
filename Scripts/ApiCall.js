const apiKey = 'e1d4681ba6';
const stad = 'Amsterdam'; 

function getWeer(){
    let apiUrl = `https://weerlive.nl/api/json-data-10min.php?key=${apiKey}&locatie=${stad}`;
    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            return {'tempratuur' : data.liveweer[0].temp, 'weer' : data.liveweer[0].d0weer, 'windKracht' : data.liveweer[0].winds};
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            return false;
    });
}