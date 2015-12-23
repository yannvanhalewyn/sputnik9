var config = {

  "production": {
    host: "www.sputnik9.nl",
    app_secret: process.env["PRODUCTION_SECRET"],
    mongo_url: "mongodb://localhost:27017/sputnik9",
    facebook: {
      ID: process.env["FB_PRODUCTION_ID"],
      secret: process.env["FB_PRODUCTION_SECRET"]
    }
  },

  "development": {
    host: "localhost:3000",
    app_secret: process.env["DEVELOPMENT_SECRET"],
    mongo_url: "mongodb://localhost:27017/sputnik9",
    facebook: {
      ID: process.env["FB_DEVELOPMENT_ID"],
      secret: process.env["FB_DEVELOPMENT_SECRET"]
    }
  }

}

module.exports = config[process.env["NODE_ENV"]] || config["development"]