"use strict";

var requireAdmin = require('../../middlewares/require_admin')
  , Entry = require('../../models/entry')

var AdminEntriesController = {
  middlewares: {
    index: [requireAdmin],
    edit: [requireAdmin],
    update: [requireAdmin]
  },

  index: (req, res) => {
    res.send('index')
  },

  edit: (req, res) => {
    res.send('edit')
  },

  update: (req, res) => {
    res.send('update')
  }
}

module.exports = AdminEntriesController;
