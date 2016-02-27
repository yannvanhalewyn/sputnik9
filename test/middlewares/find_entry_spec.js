require('../spec_helper')
var findEntry = include('/src/middlewares/find_entry')

describe('find_entry middleware', () => {
  var req, res, next;

  beforeEach(function() {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();
  });

  context('when entry exists', () => {
    var entry
    beforeEach(() => {
      return Factory('entry').then(e => {
        entry = e
        req.params.entry_id = entry.id
        return findEntry(req, res, next)
      })
    })

    it('calls next', () => {
      expect(next).to.have.been.called;
    });

    it('stores the entry', () => {
      expect(req.entry._id).to.eql(entry._id)
    });
  }); // End of context 'when entry exists'

  context('when entry does not exist', () => {
    var nullId = '123456789012345678901234'
    beforeEach(() => {
      req.params.entry_id = nullId
      return findEntry(req, res, next)
    })

    it('calls next with an error', () => {
      expect(next).to.have.been.calledWith(`Could not find entry ${nullId}`)
    });
  }); // End of context 'when entry does not exist'

  context('when entry-id is invalid', () => {
    var invalidId = 'invalid'
    beforeEach(() => {
      req.params.entry_id = invalidId
      return findEntry(req, res, next)
    })

    it('calls next with an error', () => {
      expect(next).to.have.been.calledWith(`${invalidId} is not a valid entry ID`)
    });
  }); // End of context 'when entry does not exist'
}); // End of describe 'find_entry middleware'
