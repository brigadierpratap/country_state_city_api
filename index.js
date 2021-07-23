const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./assets/csc.json");
/* const data = require("./assets/data");
 */ const port = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/countries", (req, res) => {
  try {
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
  } catch (error) {
    res.json({ status: -1, message: "Unexpected Error" });
  }
});
app.get("/states", (req, res) => {
  try {
    const a = req.query.country;
    if (!Boolean(a)) res.json({ status: -1, message: "Bad Request" });
    else {
      const country = data.filter(c => c.name === a);
      if (country.length === 0) {
        res.json({ status: -1, message: "Not Found" });
      } else {
        const states = country[0].states.map(s => {
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
  } catch (error) {
    res.json({ status: -1, message: "Unexpected Error" });
  }
});
app.get("/cities", (req, res) => {
  try {
    const country = req.query.country;
    const state = req.query.state;
    if (!Boolean(country) || !Boolean(state))
      res.json({ status: -1, message: "Bad Request" });
    else {
      const countryData = data.filter(c => c.name === country);
      if (countryData.length === 0) {
        res.json({ status: -1, message: "Not Found" });
      } else {
        const stateData = countryData[0].states.filter(s => s.name === state);
        if (stateData.length === 0) {
          res.json({ status: -1, message: "Not Found" });
        } else {
          const cities = stateData[0].cities.map(c => {
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
  } catch (error) {
    res.json({ status: -1, message: "Unexpected Error" });
  }
});

app.get("/country", (req, res) => {
  try {
    const countryName = req.query.country;
    if (!countryName) {
      res.json({ status: -1, message: "Not Found" });
    } else {
      const result = data.filter(c => c.name === countryName);
      if (result.length > 0) {
        res.json({
          status: 1,
          message: {
            id: result[0].id,
            name: result[0].name,
            iso3: result[0].iso3,
            iso2: result[0].iso2,
            phone_code: result[0].phone_code,
            capital: result[0].capital,
            currency: result[0].currency,
            currency_symbol: result[0].currency_symbol,
            native: result[0].native,
            region: result[0].region,
            subregion: result[0].subregion,
            latitude: result[0].latitude,
            longitude: result[0].longitude,
            emoji: result[0].emoji,
            emojiU: result[0].emojiU,
          },
        });
      } else {
        res.json({ status: -1, message: "Not Found" });
      }
    }
  } catch (e) {
    res.json({ status: -1, message: "Unexpected Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
