var include = require('include')
  , chai    = require('chai')
  , expect  = chai.expect
  , _       = require('lodash')

var emails = include('/src/helpers/emails');
var userFixture = include('/test/fixtures/user')

describe('emails', function() {
  describe('confirmation email', function() {
    var output;

    beforeEach(() => emails.emailConfirmation(_.merge(
      { local_data: { confirmation_token: 'confirmation_token'} },
      userFixture)).then(out => output = out));

    it('returns an object with the correct values', () => {
      expect(output.to).to.eql("j.d@gmail.com");
      expect(output.subject).to.eql("Sputnik 9 Premium - Bevestig je e-mail adres!");
    });

    describe('contents', () => {
      it("greets the user by it's first name", () => {
        expect(output.html).to.include('Hoi, John!')
      });

      it('links to the correct verification url', () => {
        expect(output.html).to
          .include('https://localhost:3000/users/verify?token=confirmation_token')
      });
    }); // End of describe 'contents'
  }); // End of describe 'confirmation email'

  describe('send unlock code', function() {
    var output;

    beforeEach(() => emails.sendUnlockCode('me@example.com', 'code123')
                           .then(out => output = out));

    it('returns an object with the correct values', () => {
      expect(output.to).to.eql('me@example.com');
      expect(output.subject).to.eql('Sputnik 9 Premium activatiecode');
    });

    describe('contents', () => {
      it('contains the correct code', () => {
        expect(output.html).to.include('code123')
      });

      it('links to the homepage', () => {
        expect(output.html).to.include('https://www.sputnik9.nl/')
      });
    }); // End of describe 'contents'
  }); // End of describe 'confirmation email'

  describe('new content', function() {
    var output;

    beforeEach(() => emails.new_content(_.merge({_id: '12345'}, userFixture), 'entry1')
                           .then(out => output = out));

    it('returns an object with the correct values', () => {
      expect(output.to).to.eql('j.d@gmail.com');
      expect(output.subject).to.eql('Er is nieuwe Sputnik 9 content!');
    });

    describe('contents', () => {
      it("greets the user by it's first name", () => {
        expect(output.html).to.include('Hoi, John!')
      });

      it('tells the user about new content', () => {
        expect(output.html).to.include('Er is zojuist nieuwe content geplaatst')
      });

      it('has a link to unsubscribe from the email notifications', () => {
        expect(output.html).to
          .include('https://localhost:3000/users/unsubscribe?u=12345')
      });
    }); // End of describe 'contents'
  }); // End of describe 'confirmation email'

  describe('payment_confirmed', () => {
    var output;

    beforeEach(() => emails.payment_confirmed(userFixture)
                           .then(out => output = out));

    it('returns an object with the correct values', () => {
      expect(output.to).to.eql('j.d@gmail.com');
      expect(output.subject).to.eql('Betaling ontvangen');
    });

    describe('contents', () => {
      it("greets the user by it's first name", () => {
        expect(output.html).to.include('Hoi, John!')
      });

      it('tells the user his payment was received', () => {
        expect(output.html).to.include('betaling ontvangen')
      });

      it('links to the premium page', () => {
        expect(output.html).to
          .include('https://www.sputnik9.nl/premium')
      });
    }); // End of describe 'contents'
  }); // End of describe 'payment_confirmed'

}); // End of describe 'emails'
