var mongoose = require('mongoose');

/*
 * ======
 * SCHEMA
 * ======
 */
var SentEmailSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  descriptor: String,
  sent_at: { type: Date, default: Date.now }
})

var SentEmail = mongoose.model('SentEmail', SentEmailSchema)

SentEmail.create = (params) => new SentEmail(params).save()

module.exports = SentEmail
