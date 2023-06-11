
const apiKey = 'e1d4681ba6';
let city = 'Amsterdam';

function getWeer() {
    let apiUrl = `https://weerlive.nl/api/json-data-10min.php?key=${apiKey}&locatie=${city}`;
    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            return {
                'tempratuur': data.liveweer[0].temp,
                'weer': data.liveweer[0].d0weer, 
                'windKracht': data.liveweer[0].winds, 
                'stad': data.liveweer[0].plaats
            };
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            return false;
        });
}