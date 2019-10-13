const credentials = require('./credentials');
const request = require('request');

const getLatLon = function(city, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?access_token=" + credentials.MAPBOX_TOKEN;

    request({url, json: true}, function(err, response){
        if(err) {
            callback(err, undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if(!response.body['features'][0]) {
            callback('City not found', undefined);
        } else {
            const data = response.body;
            const center = data['features'][0]['center'];
            callback(undefined, center);
        }
    });
}

const getWeather = function(center, callback) {
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + center[1] + ',' + center[0] + '?units=si';

    request({url, json: true}, function(err, response) {
        if (err){
            callback(err, undefined);
        } else if(response.body['error']) {
            callback(response.body['error'], undefined)
        } else {
            data = response.body['currently'];
            var output = data['summary'] + '. ' + 'Currently at ' + Math.round(data['temperature']) + '°C. There is ' + data['precipProbability'] * 100 + '% precipitation probability.';
            if (data['temperature'] <= 10) {
                output += "\nIt's cold out, you should wear a sweater!";
            } else if (data['temperature'] >= 20) {
                output += "\nIt's warm out, stay hydrated!";
            }
            callback(err, output);
        }
    });
}

getLatLon('Madrid', function(MapboxError, center) {
    if (MapboxError) {
        console.log(MapboxError);
    } else {
        getWeather(center, function (DarkskyError, output) {
            if(DarkskyError) {
                console.log(DarkskyError);
            } else {
                console.log(output);
            }
        });
    }
});