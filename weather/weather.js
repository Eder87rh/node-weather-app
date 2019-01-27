const request = require('request');

let getWeather = ( lat, lng, callback ) => {
    request({
        url: `https://api.darksky.net/forecast/3329c0272adb630b11906b4b61744bfa/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const temperature = body.currently.temperature;
            const apparentTemperature = body.currently.apparentTemperature;
            callback(undefined, {
                temperature,
                apparentTemperature
            })
        } else {
            callback('Unable to fetch weather.')
        }    
    })
};

module.exports.getWeather = getWeather;



