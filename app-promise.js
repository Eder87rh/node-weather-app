const yargs = require('yargs');
const axios = require('axios');
const apiKey =require('./apiKey');


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

const encodeURIAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIAddress}&key=${apiKey}`;

axios.get(geocodeUrl).then((response) => {
    if ( response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }

    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/3329c0272adb630b11906b4b61744bfa/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
})
.then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
})
.catch((error) => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(error.message);
    }
});