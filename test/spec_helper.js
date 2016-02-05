var chai           = require('chai')
  , chaiAsPromised = require('chai-as-promised')
  , sinonChai      = require('sinon-chai')
  , db             = require('./util/test_db')

// Setup db
before(db.connect)
afterEach(db.teardown)

// Set globals
global.expect    = chai.expect
global.Factory   = require('./factories/factory')
global.Q         = require('q')
global.Immutable = require('immutable')
global.bcrypt    = require('bcrypt')
global.include   = require('include')
global.sinon     = require('sinon')
global._         = require('lodash')
chai.should()
chai.use(sinonChai)
chai.use(chaiAsPromised)
