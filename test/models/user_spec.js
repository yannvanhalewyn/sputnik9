require('../spec_helper');
var User          = include('/src/models/user')
  , userFixture   = Immutable.fromJS(require('../fixtures/user'))
  , userFixtureFB = Immutable.fromJS(require('../fixtures/user_fb'));

describe('User', function() {

  describe('creation', function() {

    it("works with valid fields", function() {
      var promise = User.create(userFixture.toJS())
      return expect(promise).to.be.fulfilled;
    });

    it("validates the presence of the first_name", function() {
      var promise = User.create(userFixture.delete("first_name").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the first_name", function() {
      var promise = User.create(userFixture.set("first_name", "ab").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the last_name", function() {
      var promise = User.create(userFixture.delete("last_name").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the length of the last_name", function() {
      var promise = User.create(userFixture.set("last_name", "12").toJS())
      return expect(promise).to.be.rejected;
    });

    it("validates the presence of the email", function() {
      var promise = User.create(userFixture.delete("email").toJS());
      return expect(promise).to.be.rejected;
    });

    it("validates the email address", function() {
      var promise = User.create(userFixture.set("email", "not@email").toJS())
      return expect(promise).to.be.rejected;
    });

    it("stores the password digest in the local_data object", function() {
      return User.create(userFixture.toJS()).then(user => {
        user.local_data.password_digest.should.not.to.be.undefined;
        user.local_data.password_digest.should.satisfy(hash => {
          return bcrypt.compareSync(userFixture.get('password'), hash)
        })
      })
    });

    it.skip("checks for a unique email address", function() {
      var promise = User.create(userFixture.toJS())
        .then(() => User.create(userFixture.toJS()))
      return expect(promise).to.be.rejected;
    });

    it("creates a random 48 chars hex token for email confirmation with expiration date", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        var token = user.local_data.confirmation_token;
        var expiration = Date.now() + 24 * 3600 * 1000;
        expect(token).not.to.be.undefined;
        expect(token).to.match(/^[0-9a-f]{48}$/)
        expect(user.local_data.token_expiration).to.be.within(expiration - 1000, expiration + 1000);
      });
    });

    it("sets the verified flag to false", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        expect(user.local_data.verified).to.be.falsey;
      })
    });

    it("sets the premium flag to false", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.premium).to.be.falsey;
      })
    });

    it("defaults to a non admin user" , function() {
      return User.create(userFixture.toJS()).then(function(user) {
        expect(user.admin).to.be.false;
      })
    })

    it('defaults to be notified by email', function() {
      return User.create(userFixture.toJS()).then((user) => {
        expect(user.receive_emails).to.be.true;
      })
    });
  }); // End of describe 'creation'

  describe('verification', function() {
    context("with a valid authentication token", function() {

      context("when token is not expired", function() {
        var USER;
        beforeEach(done => {
          return Factory('user').then(user => {
            return User.verify(user.local_data.confirmation_token).then(function(user) {
              USER = user;
              done();
            });
          }).catch(done);
        });

        it("sets the verified flag to true", function() {
          expect(USER.local_data.verified).to.be.true;
        });

        it("destroys the old token and expiration", function() {
          expect(USER.local_data.confirmation_token).to.be.null;
          expect(USER.local_data.token_expiration).to.be.null;
        });
      }); // End of context 'when token is not expired'

      context("when token is expired", () => {
        it("returns a rejected promise", () => {
          return Factory('user').then(user => {
            user.local_data.token_expiration = Date.now() - 2000;
            return user.save().then(user => {
              var promise = User.verify(user.local_data.confirmation_token);
              return expect(promise).to.be.rejectedWith(
                `Geen gebruiker gevonden met token ${user.local_data.confirmation_token}`
              );
            })
          });
        });
      }); // End of context 'when token is expired'
    }); // End of context 'with a valid authentication token'

    context("with an invalid token", () => {
      it("returns a rejected promise", () => {
        var promise = User.verify("WRONG");
        return expect(promise).to.be.rejectedWith('Geen gebruiker gevonden met token WRONG');
      });
    }); // End of context 'with an invalid token'

    context('with no token', () => {
      it('returns a rejected promise', () => {
        return expect(User.verify()).to.eventually
          .be.rejectedWith('Geen token gegeven.')
      });
    }); // End of context 'with no token'
  }); // End of describe 'verification'

  describe('facebook_creation', function() {
    it("works", function() {
      expect(User.create(userFixtureFB.toJS())).to.be.fulfilled;
    });

    it("stores the provider name and provider_data", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.provider).to.eql('facebook');
        expect(user.fb_data.id).to.eql('123');
        expect(user.fb_data.accessToken).to.eql('theaccesstoken');
      })
    })

    it("Defaults the premium flag to false", function() {
      return User.create(userFixtureFB.toJS()).then(function(user) {
        expect(user.premium).to.be.falsey;
      })
    });

    describe('findOrCreate', function() {
      context("when user does't exist with that facebook id", function() {
        it("persists a new user with that data", function() {
          return User.findOrCreateByFacebookId('123', userFixtureFB.toJS())
          .then(function(user) {
            return User.findById(user._id).then(function(u) {
              expect(u.fb_data.id).to.eql('123')
              expect(u.fb_data.accessToken).to.eql('theaccesstoken')
            })
          })
        });
      }); // End of context 'when user does't exist with that facebook id'
    }); // End of describe 'findOrCreate'

    context("when a user is found with said facebook id", function() {
      var found_user;
      beforeEach(function() {
        return User.findOrCreateByFacebookId('123', userFixtureFB.toJS())
        .then(function (user1) {
          return User.findOrCreateByFacebookId('123', userFixtureFB.toJS())
          .then(function(user2) {
            found_user = user2;
          })
        })
      });

      it("doesn't persist a new user", function() {
        return User.find().then(function(allUsers) {
          expect(allUsers.length).to.eql(1)
        })
      });

      it("finds and returns the correct user", function() {
        expect(found_user.fb_data.id).to.eql('123')
      });
    }); // End of context 'when a user is found with said facebook id'
  }); // End of describe 'facebook_creation'

  describe('addPayment', function() {
    it("adds the payment to that user's payments array", function() {
      return User.create(userFixture.toJS()).then(function(user) {
        return user.addPayment({_id: "012345678901234567891234"}).then(function(user) {
          expect(user.payments.length).to.eq(1);
          expect(user.payments[0].toString()).to.equal("012345678901234567891234")
        })
      })
    });
  }); // End of describe 'addPayment'

  describe('regenerate_verification_token', function() {
    context("when user is unverified", function() {
      var OLD_USER, prev_token, prev_expiration, NEW_USER;
      beforeEach(function() {
        return User.create(userFixture.toJS()).then(function(user) {
          OLD_USER = user;
          prev_token = user.local_data.confirmation_token;
          prev_expiration = user.local_data.token_expiration;
          return user.resetConfirmationToken().then(function(user) {
            NEW_USER = user;
          })
        })
      });

      it("resets the confirmation token", function() {
        return User.findById(OLD_USER._id).then(function(user) {
          expect(user.local_data.confirmation_token).not.to.eql(prev_token)
          expect(user.local_data.token_expiration).not.to.eql(prev_expiration)
          var tomorrow = Date.now() + 1000 * 3600 * 24;
          expect(user.local_data.confirmation_token).to.match(/^[0-9a-f]{48}$/)
          expect(user.local_data.token_expiration.getTime())
            .to.be.within(tomorrow - 1000, tomorrow + 1000)
        })
      });
    }); // End of context 'when in user is unverified'

    context("When user is already verified", function() {
      it("Throws a NotApplicable exception", function() {
        return Factory('user', { local_data: { verified: true }}).then(user => {
          return user.resetConfirmationToken().should.be
            .rejectedWith('Deze gebruiker heeft geen bevestiging nodig.')
        });
      });
    }); // End of context 'When user is already verified'

    context('When user is not authenticated locally', () => {
      it('throws a NotApplicable exception', () => {
        return Factory('user', { provider: 'facebook' }).then(user => {
          return user.resetConfirmationToken().should.be
            .rejectedWith('Deze gebruiker heeft geen bevestiging nodig.')
        })
      });
    }); // End of context 'When user is already verified'
  }); // End of describe 'regenerate_verification_token'

  describe('#resetPassword', () => {
    var digest, user;
    beforeEach(() => {
      return Factory('user', 'with_password_reset_token')
      .then(u => u.resetPassword('new_password')).then(u => {
        digest = u.local_data.password_digest
        user = u;
      })
    });

    it('rehashes the password to a bcrypt verifiable hash', () => {
      digest.should.not.be.undefined
      digest.should.satisfy(hash => bcrypt.compareSync('new_password', hash))
    });

    it('removes the password reset token and expiration', () => {
      expect(user.local_data.password_reset_token).to.be.null
      expect(user.local_data.password_reset_expiration).to.be.null
    });
  }); // End of describe '#resetPassword'

  describe('.notifiable', () => {

    beforeEach(() => {
      return Q.all([
        Factory('user', { email: 'user1@example.com', receive_emails: true }),
        Factory('user', { email: 'user2@example.com', receive_emails: false }),
        Factory('user', { email: 'user3@example.com', receive_emails: true }),
      ])
    });

    it('returns an array of all users that want to receive email notifications', function() {
      return User.notifiable().then((users) => {
        expect(users.length).to.eql(2)
        users.map(u => u.email).should.include('user1@example.com')
        users.map(u => u.email).should.include('user3@example.com')
      })
    });
  }); // End of describe '.notifiable'
}); // End of describe 'User'
