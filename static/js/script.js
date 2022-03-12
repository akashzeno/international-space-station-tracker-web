const map = document.querySelector('.map');
const iss = document.querySelector('.iss');
const startBtn = document.querySelector('.startBtn');
const stopBtn = document.querySelector('.stopBtn');
const iss_current_location_api = 'https://api.wheretheiss.at/v1/satellites/25544';
let trackingLoop;

async function getLocationDataAndPlaceISS(){
    try {
    // We are retrieving coordinates of ISS
    const response = await fetch(iss_current_location_api);
    const data = await response.json();
    const latitude = data.latitude;
    const longitude = data.longitude;
    // Converting the coordinate into pixels according to width and height of the map
    // Placing the ISS on the map by setting the bottom and left position properties
    iss.style.bottom = `${(latitude*map.clientHeight)/180}px`;
    iss.style.left = `${(longitude*map.clientWidth)/360}px`;
    } catch (error) {

    }
}

startBtn.addEventListener("click", ()=>{
    trackingLoop = setInterval(() => {
        getLocationDataAndPlaceISS();
    }, 2000);
    setTimeout(() => {
        iss.hidden = false;
    }, 3000);
    startBtn.hidden = true;
    stopBtn.hidden = false;
});

stopBtn.addEventListener("click", ()=>{
    iss.hidden = true;
    stopBtn.hidden = true;
    startBtn.hidden = false;
    clearInterval(trackingLoop);
});
