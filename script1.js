const apiKey = 'demo'

function getWeer(stat){
    let apiUrl = `https://weerlive.nl/api/json-data-10min.php?key=${apiKey}&locatie=${stat}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            return data.liveweer[0].temp;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
    });
}
