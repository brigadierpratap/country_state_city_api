const express = require("express");
const app = express();
const fs = require("fs");
const data = require("./assets/csc.json");
/* const data = require("./assets/data");
 */ const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/countries", (req, res) => {
  const countries = data.map(c => {
    const d = {
      id: c.id,
      name: c.name,
      iso3: c.iso3,
      iso2: c.iso2,
      phone_code: c.phone_code,
      capital: c.capital,
      currency: c.currency,
      currency_symbol: c.currency_symbol,
      native: c.native,
      region: c.region,
      subregion: c.subregion,
      latitude: c.latitude,
      longitude: c.longitude,
      emoji: c.emoji,
      emojiU: c.emojiU,
    };
    return d;
  });
  res.json({ status: 1, message: countries });
});
app.get("/states", (req, res) => {
  const a = req.query.country;
  if (!Boolean(a)) res.json({ status: -1, message: "Bad Request" });
  else {
    const country = data.filter(c => c.name === a)[0];
    if (!country.name) {
      res.json({ status: -1, message: "Not Found" });
    } else {
      const states = country.states.map(s => {
        const d = {
          id: s.id,
          name: s.name,
          state_code: s.state_code,
          latitude: s.latitude,
          longitude: s.longitude,
        };
        return d;
      });
      res.json({ status: 1, message: states });
    }
  }
});
app.get("/cities", (req, res) => {
  const country = req.query.country;
  const state = req.query.state;
  if (!Boolean(country) || !Boolean(state))
    res.json({ status: -1, message: "Bad Request" });
  else {
    const countryData = data.filter(c => c.name === country)[0];
    if (!countryData.name) {
      res.json({ status: -1, message: "Not Found" });
    } else {
      const stateData = countryData.states.filter(s => s.name === state)[0];
      if (!stateData.name) {
        res.json({ status: -1, message: "Not Found" });
      } else {
        const cities = stateData.cities.map(c => {
          const d = {
            id: c.id,
            name: c.name,
            latitude: c.latitude,
            longitude: c.longitude,
          };
          return d;
        });
        res.json({ status: 1, message: cities });
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
