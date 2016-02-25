require('../spec_helper')
var middleware = include('src/middlewares/get_user_by_password_reset_token');

describe('get user by reset password middleware', () => {
  var req, res, next

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy()
  });

  context('when user exists with valid reset token', () => {
    var user;
    beforeEach(() => {
      return Factory('user', 'with_password_reset_token').then(u => {
        user = u
        req.params = { token: u.local_data.password_reset_token }
        return middleware(req, res, next)
      })
    })

    it('calls next', () => {
      next.should.have.been.called;
    });

    it('finds the user and stores it in the request object', () => {
      expect(req.user).not.to.be.undefined
      req.user._id.should.eql(user._id)
    });
  }); // End of context 'when user exists with valid reset token'

  context('when user reset token was not found', () => {
    beforeEach(() => {
      req.params = { token: 'notfound' }
      return middleware(req, res, next)
    });

    it('doesnt call next', () => {
      next.should.not.have.been.called;
    });

    it('redirects with a flash', () => {
      req.session.flash.should.eql({
        type: 'success',
        message: 'Deze wachtwoord reset pagina bestaat niet of is expired'
      })
      res.redirect.should.have.been.calledWith('/');
    });
  }); // End of context 'when user reset token was not found'

  context('when the token is expired', () => {
    var user;
    beforeEach(() => {
      return Factory('user', 'with_expired_password_reset_token').then(u => {
        user = u
        req.params = { token: u.local_data.password_reset_token }
        return middleware(req, res, next)
      })
    })

    it('doesnt call next', () => {
      next.should.not.have.been.called;
    });

    it('redirects with a flash', () => {
      req.session.flash.should.eql({
        type: 'success',
        message: 'Deze wachtwoord reset pagina bestaat niet of is expired'
      })
      res.redirect.should.have.been.calledWith('/');
    });
  }); // End of context 'when the token is expired'
}); // End of describe 'get user by reset password middleware'
