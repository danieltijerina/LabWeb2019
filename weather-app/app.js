const credentials = require('./credentials');
const request = require('request');

const getLatLon = function(city) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?access_token=" + credentials.MAPBOX_TOKEN;

    request({url, json: true}, function(err, response){
        const data = response.body;
        const center = data['features'][0]['center'];
        getWeather(center);
    });
}

const getWeather = function(center) {
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + center[0] + ',' + center[1] + '?units=si';

    request({url, json: true}, function(err, response) {
        data = response.body['currently'];
        console.log(data['summary'] + '. ' + 'Currently at ' + Math.round(data['temperature']) + '°C. There is ' + data['precipProbability']*100 + '% precipitation probability.');
    });
}

getLatLon('Madrid');