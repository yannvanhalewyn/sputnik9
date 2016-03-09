var config = {

  "production": {
    host: "www.sputnik9.nl",
    app_secret: process.env["PRODUCTION_SECRET"],
    mongo_url: "mongodb://localhost:27017/sputnik9",
    facebook: {
      ID: process.env["FB_PRODUCTION_ID"],
      secret: process.env["FB_PRODUCTION_SECRET"]
    },
    mollie_api_key: process.env["MOLLIE_API_KEY"],
    cloudinary_api_key: process.env['CLOUDINARY_API_KEY'],
    cloudinary_api_secret: process.env['CLOUDINARY_API_SECRET'],
    mailchimp_api_key: process.env['MAILCHIMP_API_KEY'],
    mailchimp_list_name: 'Sputnik 9 Notifications'
  },

  "development": {
    host: "localhost:3000",
    app_secret: process.env["DEVELOPMENT_SECRET"],
    mongo_url: "mongodb://localhost:27017/sputnik9",
    facebook: {
      ID: process.env["FB_DEVELOPMENT_ID"],
      secret: process.env["FB_DEVELOPMENT_SECRET"]
    },
    mollie_api_key: process.env["MOLLIE_TEST_API_KEY"],
    cloudinary_api_key: process.env['CLOUDINARY_API_KEY'],
    cloudinary_api_secret: process.env['CLOUDINARY_API_SECRET'],
    mailchimp_api_key: process.env['MAILCHIMP_API_KEY'],
    mailchimp_list_name: 'Test List'
  }

}

module.exports = config[process.env["NODE_ENV"]] || config["development"]
