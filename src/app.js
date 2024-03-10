const path = require("path");
const express = require("express"); //express library returns a single function unlike others npm libraries
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//create a new express application
const app = express();

//to customize the server to serve up the public folder
//Everything inside the public folder including css, html, javascript, and images.
//are made available via the webserver to the browser.
const publicDirectoryPath = path.join(__dirname, "../public");
//to give a differnt name(templates) for the views folder
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup
//to setup a view engine like express to render dynamic contents using templating
//hbs - handle bars to render dynamic contents
//tell express to use the hbs view engine.
app.set("view engine", "hbs");
//tell express to use the viewspath
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//index.html gets served on localhost:3000 by default.
//files inside js folder is also served to the client automatically.
app.use(express.static(publicDirectoryPath));

//route to render index.hbs //default home page
// res.render() allows to render views
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chitra",
  });
});

//route to render about.hbs
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Chitra",
  });
});

//route to render help.hbs
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help page",
    name: "Chitra",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastdata = {}) => {
      ///forecast(-75.7088, 44.1545, (error, forecastdata) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        Data: forecastdata,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//looking for a datapage that does not exists http://localhost:3000/help/data,
//will get you 'help article not found'
//we will render 404.hbs with a differnt errormessage
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Chitra",
    errorMessage: "Help article not found",
  });
});

//this get method has to come at the last
//* - match anything that has not been matched so far. Throw 404 error if no match for a route
//has been found so far.
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chitra",
    errorMessage: "Page not found",
  });
});

//starts the server and listens at port 3000
app.listen(3000, () => {
  console.log("Server is up on port 3000");
}); //development port.
