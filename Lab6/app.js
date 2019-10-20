const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

if(process.env.NODE_ENV == 'production') {
    var mapbox_token = process.env.MAPBOX_TOKEN;
    var darksky_secret_key = process.env.DARK_SKY_SECRET_KEY;
} else {
    const credentials = require('./credentials');
    var mapbox_token = credentials.MAPBOX_TOKEN;
    var darksky_secret_key = credentials.DARK_SKY_SECRET_KEY; 
}

app.get('/weather', function (req, res) {
    if (!req.query.search) {
        res.send({
            error: 'Debe haber un parámetro "search"'
        });
    } else {
        getLatLon(req.query.search, function (MapboxError, center) {
            if (MapboxError) {
                return res.send({
                    error: MapboxError
                });
            } else {
                getWeather(center, function (DarkskyError, output) {
                    if (DarkskyError) {
                        return res.send({
                            error: DarkskyError
                        });
                    } else {
                        return res.send({
                            response: output
                        });
                    }
                });
            }
        });
    }
});

app.get('*', function (req, res) {
    res.send({
        error: 'Ruta no valida'
    });
});

const getLatLon = function (city, callback) {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?access_token=" + mapbox_token;

    request({ url, json: true }, function (err, response) {
        if (err) {
            callback(err, undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (!response.body['features'][0]) {
            callback('City not found', undefined);
        } else {
            const data = response.body;
            const center = data['features'][0]['center'];
            callback(undefined, center);
        }
    });
}

const getWeather = function (center, callback) {
    const url = 'https://api.darksky.net/forecast/' + darksky_secret_key + '/' + center[1] + ',' + center[0] + '?units=si';

    request({ url, json: true }, function (err, response) {
        if (err) {
            callback(err, undefined);
        } else if (response.body['error']) {
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

const search = function (city) {
    getLatLon(city, function (MapboxError, center) {
        if (MapboxError) {
            return MapboxError;
        } else {
            getWeather(center, function (DarkskyError, output) {
                if (DarkskyError) {
                    return DarkskyError;
                } else {
                    console.log(output);
                    return output;
                }
            });
        }
    });
}


app.listen(port, function () {
    console.log('Up and running!')
})