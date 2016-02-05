require('../spec_helper')
var login = include("src/helpers/login_user")

describe('login_user helper', function() {

  var req;

  beforeEach(function() {
    req = reqres.req();
  });

  it("stores the user_id in the session", function() {
    login({_id: 1234}, req);
    expect(req.session.user_id).to.eql(1234)
  });
}); // End of describe 'login_user helper'
