/* const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
		console.log('​errorMessage', errorMessage)
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
}); */

const request = require('request');

request({
    url: `https://api.darksky.net/forecast/3329c0272adb630b11906b4b61744bfa/39.9396284,-75.18663959999999`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const temperature = body.currently.temperature;
        console.log(`Current weater is: ${temperature}`)
    } else {
        console.log('Unable to fetch weather.')
    }    
})

//3329c0272adb630b11906b4b61744bfa