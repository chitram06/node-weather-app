const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weather.gov/points/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  const options = {
    url, //shorthand
    json: true, //automatically parse as object
    headers: {
      "User-Agent": "chikrishnan@gmail.com",
    },
  };

  //destructuring the response object to get only what we want - body object
  //request(options, (error, response) => {
  request(options, (error, { body }) => {
    if (error) {
      callback("Unable to connect location services!");
    } else if (body.detail) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        message: body.geometry,
      });
    }
  });
};

module.exports = forecast;
