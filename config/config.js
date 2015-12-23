var config = {

  "production": {
    host: "www.sputnik9.nl",
    facebook: {
      ID: process.env["FB_PRODUCTION_ID"],
      secret: process.env["FB_PRODUCTION_SECRET"]
    }
  },

  "development": {
    host: "localhost:3000",
    facebook: {
      ID: process.env["FB_DEVELOPMENT_ID"],
      secret: process.env["FB_DEVELOPMENT_SECRET"]
    }
  }

}

module.exports = config[process.env["NODE_ENV"]] || config["development"]
