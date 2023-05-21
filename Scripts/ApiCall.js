const apiKey = 'e1d4681ba6';

function getWeer(stat){
    let apiUrl = `https://weerlive.nl/api/json-data-10min.php?key=${apiKey}&locatie=${stat}`;
    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            return {'tempratuur' : data.liveweer[0].temp, 'weer' : data.liveweer[0].samenv, 'windKracht' : data.liveweer[0].winds};
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
    });
}

// getWeer("Amsterdam").then((weer) => {
//     console.log(weer);
//     // doe hier iets met de weerdata
// });


// t = new Truck("Cold tranport", 10,10,5);
// t.show();
// t.place(2,1,[['bezet','bezet','bezet','bezet'],['plaats','plaats','plaats','plaats'],['plaats','plaats','plaats','plaats'],['plaats','plaats','plaats','plaats']]);
// t.show();
// t.place(3,1,[['bezet','plaats','plaats','plaats'],['bezet','plaats','plaats','plaats'],['bezet','plaats','plaats','plaats'],['bezet','plaats','plaats','plaats']]);

// t.show();

