require('../spec_helper')
var findEntry = include('/src/middlewares/find_song')

describe('find_song middleware', () => {
  var req, res, next;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  context('when song exists', () => {
    var song
    beforeEach(() => {
      return Factory('song').then(e => {
        song = e
        req.params.song_id = song.id
        return findEntry(req, res, next)
      })
    })

    it('calls next', () => {
      expect(next).to.have.been.called;
    });

    it('stores the song', () => {
      expect(req.song._id).to.eql(song._id)
    });
  }); // End of context 'when song exists'

  context('when song does not exist', () => {
    var nullId = '123456789012345678901234'
    beforeEach(() => {
      req.params.song_id = nullId
      return findEntry(req, res, next)
    })

    it('calls next with an error', () => {
      expect(next).to.have.been.calledWith(`Could not find song ${nullId}`)
    });
  }); // End of context 'when song does not exist'

  context('when song-id is invalid', () => {
    var invalidId = 'invalid'
    beforeEach(() => {
      req.params.song_id = invalidId
      return findEntry(req, res, next)
    })

    it('calls next with an error', () => {
      expect(next).to.have.been.calledWith(`${invalidId} is not a valid song ID`)
    });
  }); // End of context 'when song does not exist'
}); // End of describe 'find_song middleware'
